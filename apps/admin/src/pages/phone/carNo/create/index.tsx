import React, { useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  Tag,
  Toast,
  Selector,
} from 'antd-mobile';
import { Flex } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { setToken } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import PickerPopup from '@/pages/phone/components/PickerPopup';
import UploadImage from '@/pages/phone/components/UploadImage';
import styled from 'styled-components';
import dayjs from 'dayjs';
const typeArr = [
  {
    label: '土方车',
    value: '1',
  },
  {
    label: '其他',
    value: '2',
  },
  {
    label: '罐车',
    value: '3',
  },
];

const CustomForm = styled(Form)(() => ({
  '.adm-form-item-label': {
    // whiteSpace: 'nowrap'
  },
}));

export default function DropdownExample() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { server } = useBasicConfiguration();

  const { materialEnter, vehicle: V } = server;
  const detail = searchParams.get('detail')
    ? JSON.parse(searchParams.get('detail'))
    : null;
  const childRef = useRef(null);
  const [mainForm] = Form.useForm();
  const [key, setKey] = useState('');
  const [keyword, setKeyword] = useState('');
  const [materials, setMaterials] = useState([]);
  // const [carTypeOptions, setCarTypeOptions] = useState(typeArr);

  const [columns, setColumns] = useState([]);

  const queryMaterials = async () => {
    const res = await materialEnter.getEnterList({});
    const options = res.list.map((item: any) => {
      const materials = item.materialsDetailsWithInventoryRespVOS
        .map((el, i) => {
          return `${el.materialName}`;
        })
        .join('和');
      return {
        label: `${dayjs(item.enterDate).format(
          'YYYY-MM-DD HH:mm:ss'
        )} ${materials}`,
        value: item.id,
      };
    });
    setMaterials(options);
  };

  const handleCreate = async () => {
    const mainFormValues = await mainForm.validateFields();
    const params = {
      ...mainFormValues,
      carType: typeArr.find(
        (item) => item.label == mainFormValues.carType
      )?.value,
      isGps: mainFormValues.isGps[0],
      materialEnterId: materials.find(
        (item) => item.label == mainFormValues.materialEnterName
      )?.value,
    };
    if (detail) {
      await V.vehicleApproveUpdate({
        ...params,
        id: detail.id,
      });
    } else {
      await V.vehicleApproveAdd(params);
    }
    Toast.show({
      icon: 'success',
      content: '操作成功',
    });
    setTimeout(() => {
      navigate('/phone/carNo');
    }, 500);
  };

  const handlePopup = (str: string, form = null) => {
    setKey(str);
    if (str == 'carType') {
      setColumns([typeArr]);
    } else if (str == 'materialEnterName') {
      setColumns([materials]);
    }
    childRef.current.openModal(true);
  };

  const handleSearch = (str: string) => {
    /* ... */
  };

  const handleValueSelect = ([value]) => {
    if (key == 'carType') {
      mainForm.setFieldValue(
        'carType',
        typeArr.find((item) => item.value == value)?.label
      );
    } else if (key == 'materialEnterName') {
      mainForm.setFieldValue(
        'materialEnterName',
        materials.find((item) => item.value == value)?.label
      );
    } else {
      mainForm.setFieldValue(key, value);
    }
  };
  useEffect(() => {
    setToken('PHONETITLE', detail ? '编辑' : '新建');
  }, []);

  useEffect(() => {
    queryMaterials();
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
                value: '2',
              },
              {
                label: '是',
                value: '1',
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
          onClick={() => handlePopup('carType')}
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
          <UploadImage initialValue={detail?.attachment} />
        </Form.Item>

        <Form.Item
          label="物料进场记录"
          name="materialEnterName"
          onClick={() => handlePopup('materialEnterName')}
        >
          <Input placeholder="请选择物料进场记录" />
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
