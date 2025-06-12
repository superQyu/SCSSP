import { useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Space,
} from 'antd-mobile';
import dayjs from 'dayjs';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import PickerPopup from '../../components/PickerPopup';

export default function DropdownExample() {
  const { server } = useBasicConfiguration();
  const { materialList, certificate, vehicle, subContractor } =
    server;
  const childRef = useRef(null);
  const [form] = Form.useForm();
  const [key, setKey] = useState('');
  const [keyword, setKeyword] = useState('');
  const [carNoOptions, setCarNoOptions] = useState([]);
  const [materialManNoOptions, setMaterialManNoOptions] =
    useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const [enterDateVisible, setEnterDateVisible] =
    useState(false);

  const [columns, setColumns] = useState([]);

  const init = () => {
    queryCarNo(); // 请求车牌列表
    queryMaterialMan(); // 请求验收人列表
    queryDepartment(); //请求购买单位列表
  };

  // 请求车牌列表
  const queryCarNo = async () => {
    const { list } = await vehicle.vehicleApproveList({
      carNo: keyword,
    });
    const res = list.map((item: any) => {
      return {
        label: item.carNo,
        value: item.carNo,
      };
    });
    setCarNoOptions([res]);
  };

  // 请求验收人列表
  const queryMaterialMan = async () => {
    const res = await certificate.getPersonInfoList();
    const list = res.map((item: any) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
    setMaterialManNoOptions([list]);
  };

  // 请求购买单位列表
  const queryDepartment = async () => {
    const res = await subContractor.getAllSubContractor();
    const list = res.map((item: any) => {
      return {
        label: item.realName,
        value: item.realName,
      };
    });
    setDepartmentOptions([list]);
  };

  const handlePopup = (str: string) => {
    setKey(str);
    if (str == 'carNo') {
      setColumns(carNoOptions);
    } else if (str == 'materialMan') {
      setColumns(materialManNoOptions);
    } else if (str == 'purchaseUnit') {
      setColumns(departmentOptions);
    }
    childRef.current.openModal(true);
  };

  const handleSearch = (str: string) => {
    setKeyword(str);
    if (str == 'carNo') {
      queryCarNo();
    } else if (str == 'materialMan') {
      queryMaterialMan();
    } else if (str == 'purchaseUnit') {
      queryDepartment();
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Form form={form} layout="horizontal">
        <Form.Item
          label="物料名称"
          name="materialName"
          onClick={() => handlePopup('materialName')}
        ></Form.Item>
        <Form.Item
          label="型号"
          name="materialType"
          onClick={() => handlePopup('materialName')}
        ></Form.Item>
        <Form.Item
          label="计量单位"
          name="materialType"
          onClick={() => handlePopup('materialName')}
        ></Form.Item>
        <Form.Item
          label="规格"
          name="materialType"
          onClick={() => handlePopup('materialName')}
        ></Form.Item>
        <Form.Item name="enterNumber" label="计划进场数量">
          <Input placeholder="请输入数量" />
        </Form.Item>
        <Form.Item name="acceptNumber" label="实际验收数量">
          <Input placeholder="请输入数量" />
        </Form.Item>
        <Form.Item
          name="deliveryMan"
          label="送货人"
          rules={[{ required: true, message: '请输入送货人' }]}
        >
          <Input placeholder="请输入送货人" />
        </Form.Item>
        <Form.Item
          name="deliveryContact"
          label="送货人联系方式"
          rules={[
            {
              required: true,
              message: '请输入请输入送货人联系方式',
            },
          ]}
        >
          <Input placeholder="请输入送货人联系方式" />
        </Form.Item>
        <Form.Item
          label="验收人"
          name="materialMan"
          onClick={() => handlePopup('materialMan')}
        ></Form.Item>
        <Form.Item
          label="购买单位"
          name="purchaserDepartment"
          onClick={() => handlePopup('purchaseUnit')}
        ></Form.Item>
        <Button type="submit" onClick={() => form.submit()}>
          提交
        </Button>
      </Form>
      <Button>
        <Space>
          {/* <SearchOutline /> */}
          <span>新建物料</span>
        </Space>
      </Button>
      <PickerPopup
        columns={columns}
        handleSearch={handleSearch}
        ref={childRef}
      />
    </>
  );
}
