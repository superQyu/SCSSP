import React, { useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Tag,
  Toast,
} from 'antd-mobile';
import { Flex } from 'antd';
import { AddOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { setToken } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import PickerPopup from '@/pages/phone/components/PickerPopup';
import MaterialBlock from './components/MaterialBlock'; // 引入物料
import styled from 'styled-components';

const CustomForm = styled(Form)(() => ({
  '.adm-form-item-label': {
    // whiteSpace: 'nowrap'
  },
}));

export default function DropdownExample() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { server } = useBasicConfiguration();

  const {
    materialList: M,
    materialEnter,
    vehicle,
    subContractor,
    certificate,
  } = server;
  const detail = searchParams.get('detail')
    ? JSON.parse(searchParams.get('detail'))
    : null;
  const childRef = useRef(null);
  const [mainForm] = Form.useForm();
  const [key, setKey] = useState('');
  const [keyword, setKeyword] = useState('');
  const [carNoOptions, setCarNoOptions] = useState([]);
  const [materialManOptions, setMaterialManOptions] = useState(
    []
  );
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const [enterDateVisible, setEnterDateVisible] =
    useState(false);
  const [columns, setColumns] = useState([]);

  // 用于存储子组件的 ref
  const materialBlockRefs = useRef<Array<any>>([]);
  const [materialBlockCount, setMaterialBlockCount] =
    useState(1);

  // 请求车牌列表
  const queryCarNo = async () => {
    const { list } = await vehicle.vehicleApproveList({
      carNo: keyword,
    });
    const res = list.map((item: any) => ({
      label: item.carNo,
      value: item.carNo,
    }));
    setCarNoOptions([res]);
  };

  // 请求验收人列表
  const queryMaterialMan = async () => {
    const res = await certificate.getPersonInfoList();
    const list = res.map((item: any) => ({
      label: item.name,
      value: item.name,
    }));
    setMaterialManOptions([list]);
  };

  // 请求购买单位列表
  const queryDepartment = async () => {
    const res = await subContractor.getAllSubContractor();
    const list = res.map((item: any) => ({
      label: item.realName,
      value: item.realName,
    }));
    setDepartmentOptions([list]);
  };

  const handleCreate = async () => {
    const mainFormValues = await mainForm.validateFields();
    const materialBlockValues = materialBlockRefs.current
      .filter((ref) => ref)
      .map((ref, index) => {
        if (ref.getFormValues) {
          return ref.getFormValues();
        }
      });
    // console.log('create', {
    //   materialsEnterSaveReqVO: mainFormValues,
    //   materialsEnterDetailsSaveReqVOS: materialBlockValues,
    // });
    // return;
    if (detail) {
      console.log('修改', {
        materialsEnterSaveReqVO: {
          ...mainFormValues,
          enterDate: new Date(
            mainFormValues.enterDate
          ).getTime(),
          id: detail.id,
        },
        materialsEnterDetailsSaveReqVOS: materialBlockValues.map(
          (item, i) => ({
            ...item,
            materialEnterId: detail.id,
          })
        ),
      });
      await materialEnter.updateEnter({
        materialsEnterSaveReqVO: {
          ...mainFormValues,
          enterDate: new Date(
            mainFormValues.enterDate
          ).getTime(),
          id: detail.id,
        },
        materialsEnterDetailsSaveReqVOS: materialBlockValues.map(
          (item, i) => ({
            ...item,
            materialEnterId: detail.id,
          })
        ),
      });
    } else {
      await materialEnter.createEnter({
        materialsEnterSaveReqVO: {
          ...mainFormValues,
          enterDate: new Date(
            mainFormValues.enterDate
          ).getTime(),
        },
        materialsEnterDetailsSaveReqVOS: materialBlockValues,
      });
    }
    Toast.show({
      icon: 'success',
      content: '操作成功',
    });
    setTimeout(() => {
      navigate('/phone/material-enter');
    }, 500);
  };

  const handlePopup = (str: string, form = null) => {
    setKey(str);
    if (str == 'carNo') {
      setColumns(carNoOptions);
    } else if (str == 'materialMan') {
      setColumns(materialManOptions);
    } else if (str == 'purchaserDepartment') {
      setColumns(departmentOptions);
    }
    childRef.current.openModal(true);
  };

  const handleSearch = (str: string) => {
    /* ... */
  };

  // 新增物料块
  const addMaterialBlock = () => {
    setMaterialBlockCount(materialBlockCount + 1);
  };

  // 删除物料块
  const deleteMaterialBlock = (indexToDelete: number) => {
    materialBlockRefs.current.splice(indexToDelete, 1);

    setMaterialBlockCount(materialBlockCount - 1);
  };

  const handleValueSelect = ([value]) => {
    mainForm.setFieldValue(key, value);
  };

  useEffect(() => {
    console.log('detail', detail);
    setToken('PHONETITLE', detail ? '编辑' : '新建');
    setMaterialBlockCount(
      detail?.materialsDetailsWithInventoryRespVOS.length || 1
    );
    queryCarNo();
    queryMaterialMan();
    queryDepartment();
  }, []);

  return (
    <>
      <CustomForm
        form={mainForm}
        initialValues={detail || {}}
        layout="horizontal"
        mode="card"
      >
        <Form.Item
          label="车牌号"
          name="carNo"
          onClick={() => handlePopup('carNo')}
        >
          <Input placeholder="请选择车牌号" />
        </Form.Item>

        <Form.Item
          label="进场时间"
          name="enterDate"
          onClick={() => setEnterDateVisible(true)}
          rules={[
            { required: true, message: '进场时间不能为空' },
          ]}
        >
          <Input placeholder="请选择进场时间" />
        </Form.Item>

        <Form.Item
          label="送货人"
          name="deliveryMan"
          rules={[{ required: true, message: '送货人不能为空' }]}
        >
          <Input placeholder="请输入送货人" />
        </Form.Item>

        <Form.Item
          label="送货人联系方式"
          name="deliveryContact"
          rules={[
            { required: true, message: '联系方式不能为空' },
          ]}
        >
          <Input placeholder="请输入联系方式" />
        </Form.Item>

        <Form.Item
          label="验收人"
          name="materialMan"
          onClick={() => handlePopup('materialMan')}
          rules={[{ required: true, message: '验收人不能为空' }]}
        >
          <Input placeholder="请选择验收人" />
        </Form.Item>
        <Form.Item
          label="验收单位"
          name="purchaserDepartment"
          onClick={() => handlePopup('purchaserDepartment')}
          rules={[
            { required: true, message: '验收单位不能为空' },
          ]}
        >
          <Input placeholder="请选择验收单位" />
        </Form.Item>
      </CustomForm>

      {Array.from({ length: materialBlockCount }, (_, index) => (
        <MaterialBlock
          initialValue={
            detail?.materialsDetailsWithInventoryRespVOS?.[
              index
            ] || {}
          }
          key={index}
          index={index}
          onDelete={deleteMaterialBlock}
          ref={(el) => (materialBlockRefs.current[index] = el)}
        />
      ))}

      <Tag
        color="primary"
        fill="outline"
        className="p-20px"
        round
        style={{
          padding: '5px 10px',
          margin: '0 0 0 10px',
        }}
        onClick={addMaterialBlock}
      >
        <Flex>
          <AddOutline />
          新建物料
        </Flex>
      </Tag>

      <Flex
        align="center"
        justify="space-evenly"
        className="my-60px"
      >
        <Button
          type="submit"
          size="middle"
          onClick={() => navigate(-1)}
        >
          取消
        </Button>
        <Button
          size="middle"
          color="primary"
          onClick={handleCreate}
        >
          提交
        </Button>
      </Flex>

      <DatePicker
        visible={enterDateVisible}
        onClose={() => {
          setEnterDateVisible(false);
        }}
        precision="second"
        onConfirm={(val) => {
          mainForm.setFieldValue(
            'enterDate',
            dayjs(val).format('YYYY-MM-DD hh:mm:ss')
          );
        }}
      />
      <PickerPopup
        columns={columns}
        handleSearch={handleSearch}
        ref={childRef}
        onSelect={handleValueSelect}
      />
    </>
  );
}
