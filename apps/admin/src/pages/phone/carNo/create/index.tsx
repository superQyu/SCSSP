import React, { useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Tag,
  Toast,
  Selector,
} from 'antd-mobile';
import { Flex } from 'antd';
import { AddOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { setToken } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import PickerPopup from '@/pages/phone/components/PickerPopup';
import UploadImage from '@/pages/phone/components/UploadImage';
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

  // 请求验收人列表
  const queryMaterialMan = async () => {
    const res = await certificate.getPersonInfoList();
    const list = res.map((item: any) => ({
      label: item.name,
      value: item.name,
    }));
    setMaterialManOptions([list]);
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

  const handleValueSelect = ([value]) => {
    mainForm.setFieldValue(key, value);
  };

  useEffect(() => {
    setToken('PHONETITLE', detail ? '编辑' : '新建');
    setMaterialBlockCount(
      detail?.materialsDetailsWithInventoryRespVOS.length || 1
    );

    queryMaterialMan();
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
          rules={[{ required: true, message: '车牌号不能为空' }]}
        >
          <Input placeholder="请输入车牌号" />
        </Form.Item>

        <Form.Item label="是否安装GPS" name="isGps">
          <Selector
            columns={2}
            options={[
              {
                label: '否',
                value: 0,
              },
              {
                label: '是',
                value: 1,
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="车辆类型"
          name="carType"
          rules={[
            { required: true, message: '车辆类型不能为空' },
          ]}
        >
          <Input placeholder="请输入车辆类型" />
        </Form.Item>

        <Form.Item
          label="车载容量"
          name="carStorage"
          rules={[
            { required: true, message: '车载容量不能为空' },
          ]}
        >
          <Input placeholder="请输入车载容量" />
        </Form.Item>

        <Form.Item label="保险保单照片" name="attachment">
          <UploadImage />
        </Form.Item>
      </CustomForm>

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

      <PickerPopup
        columns={columns}
        handleSearch={handleSearch}
        ref={childRef}
        onSelect={handleValueSelect}
      />
    </>
  );
}
