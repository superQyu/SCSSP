import React from 'react';
import { Form, Input } from 'antd-mobile';
import siteModel, { FormColumnVO } from './modes/form.model';

export default function () {
  const { formColumns, MaterialColumns } = siteModel();
  const initialValues = {
    id: 168,
    projectId: 19,
    enterDate: 1749596400000,
    deliveryMan: '罗光文',
    carNo: null,
    deliveryContact: '15760163600',
    materialMan: '贾之方',
    manufacturer: null,
    supplierDepartment: null,
    purchaserDepartment: '华昕设计集团有限公司',
    enterTheme: null,
    purchaser: null,
    accepter: null,
    putinUser: null,
    recorder: null,
    processInstanceId: 'f7420510-468c-11f0-b993-fa163e4541aa',
    status: '1',
    remark: null,
    materialsDetailsWithInventoryRespVOS: [
      {
        id: 173,
        materialEnterId: 168,
        materialsInventoryId: '26462',
        materialType: null,
        enterNumber: 21,
        acceptNumber: null,
        weighNumber: null,
        attachment: null,
        acceptAttachment: null,
        remark: null,
        status: null,
        carNo: null,
        createTime: null,
        materialName: '预拌混凝土(泵送型)',
        specification: 'C30',
        measuringUnit: 'm3',
        materialCode: '80212105',
      },
      {
        id: 174,
        materialEnterId: 168,
        materialsInventoryId: '26460',
        materialType: null,
        enterNumber: 53,
        acceptNumber: null,
        weighNumber: null,
        attachment: null,
        acceptAttachment: null,
        remark: null,
        status: null,
        carNo: null,
        createTime: null,
        materialName: '预拌混凝土(泵送型)',
        specification: 'C20',
        measuringUnit: 'm3',
        materialCode: '80212103',
      },
    ],
  };

  const initialMaterialValues = [
    {
      id: 173,
      materialEnterId: 168,
      materialsInventoryId: '26462',
      materialType: null,
      enterNumber: 21,
      acceptNumber: null,
      weighNumber: null,
      attachment: null,
      acceptAttachment: null,
      remark: null,
      status: null,
      carNo: null,
      createTime: null,
      materialName: '预拌混凝土(泵送型)',
      specification: 'C30',
      measuringUnit: 'm3',
      materialCode: '80212105',
    },
    {
      id: 174,
      materialEnterId: 168,
      materialsInventoryId: '26460',
      materialType: null,
      enterNumber: 53,
      acceptNumber: null,
      weighNumber: null,
      attachment: null,
      acceptAttachment: null,
      remark: null,
      status: null,
      carNo: null,
      createTime: null,
      materialName: '预拌混凝土(泵送型)',
      specification: 'C20',
      measuringUnit: 'm3',
      materialCode: '80212103',
    },
  ];

  return (
    <div className="bg-#f8f8f8">
      <Form
        layout="horizontal"
        mode="card"
        initialValues={initialValues}
      >
        {formColumns.map((item: FormColumnVO) => {
          return (
            <Form.Item
              label={item.label}
              name={item.key}
              key={item.key}
            >
              <Input disabled={item.disabled} />
            </Form.Item>
          );
        })}
      </Form>

      {initialMaterialValues.map((el, i) => {
        return (
          <Form
            layout="horizontal"
            mode="card"
            initialValues={el}
          >
            {!i ? <Form.Header>物料列表</Form.Header> : ''}
            {MaterialColumns.map((item: FormColumnVO) => {
              return (
                <Form.Item
                  label={item.label}
                  name={item.key}
                  key={item.key}
                >
                  <Input disabled={item.disabled} />
                </Form.Item>
              );
            })}
          </Form>
        );
      })}
    </div>
  );
}
