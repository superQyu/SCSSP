import { useState, useEffect } from 'react';

import { FormColumnsTypes, ProUpload, SearchSelect } from 'components';
import { type ProColumns } from '@ant-design/pro-components';
import { Select, DatePicker, Input } from 'antd';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (tableRef: any, editableFormRef: any) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList, file } = server;

  const formColumns: FormColumnsTypes[] = [
    {
      label: '退场时间',
      dataIndex: 'exitDate',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择进场时间' }],
      },
      formItem: <DatePicker showTime placeholder="请选择进场时间" />,
    },
    {
      label: '退料人员',
      dataIndex: 'exitPersonnel',
      colNum: 12,
    },
    {
      label: '见证人员',
      dataIndex: 'witnessPersonnel',
      colNum: 12,
    },
    {
      label: '供应单位',
      dataIndex: 'supplierDepartment',
      colNum: 12,
    },
    {
      label: '生产厂家',
      dataIndex: 'manufacturer',
      colNum: 12,
    },
    {
      label: '购买单位',
      dataIndex: 'purchaserDepartment',
      colNum: 12,
    },
    {
      label: '退场原因',
      dataIndex: 'exitReason',
      colNum: 12,
    },
  ];
  const tableColumns: ProColumns[] = [
    {
      title: '物料清单id',
      dataIndex: 'materialsInventoryId',
      ellipsis: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '物料名称',
      dataIndex: 'materialName',
      ellipsis: true,
      hideInSearch: true,
      renderFormItem: () => {
        return (
          <SearchSelect
            placeholder="请选择物料名称"
            request={async (input) => {
              const res = await materialList.getAllMaterialList({
                materialName: input,
              });
              // console.log('一级类别下拉选项', res);
              const options = res.map((item: any) => {
                return {
                  label: item.materialName,
                  value: item.id,
                };
              });
              return options;
            }}
            onChange={async (select: any) => {
              // console.log('物料名称发生改变', select);
              const res = await materialList.getMaterialDetail({ id: select });
              // 获取当前行 id
              const id = tableRef.current.getCurrentRow();
              // console.log('editableFormRef', id, res);
              editableFormRef.current?.setRowData(id, {
                materialsInventoryId: res.id,
                materialName: res.materialName,
                measuringUnit: res.measuringUnit,
                specification: res.specification,
                materialCode: res.materialCode,
              });
            }}
          />
        );
      },
    },
    {
      title: '型号',
      dataIndex: 'materialType',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '计量单位',
      dataIndex: 'measuringUnit',
      ellipsis: true,
      hideInSearch: true,
      renderFormItem: () => {
        return <Input placeholder="请选择物料" disabled />;
      },
    },
    {
      title: '规格',
      dataIndex: 'specification',
      ellipsis: true,
      hideInSearch: true,
      renderFormItem: () => {
        return <Input placeholder="请选择物料" disabled />;
      },
    },
    {
      title: '物料编号',
      dataIndex: 'materialCode',
      ellipsis: true,
      hideInSearch: true,
      renderFormItem: () => {
        return (
          <SearchSelect
            placeholder="请选择物料编号"
            request={async (input) => {
              const res = await materialList.getAllMaterialList({
                materialCode: input,
              });
              // console.log('一级类别下拉选项', res);
              const options = res.map((item: any) => {
                return {
                  label: item.materialCode,
                  value: item.id,
                };
              });
              return options;
            }}
            onChange={async (select: any) => {
              // console.log('物料编号发生改变', select);
              const res = await materialList.getMaterialDetail({ id: select });
              // 获取当前行 id
              const id = tableRef.current.getCurrentRow();
              // console.log('editableFormRef', id, res);
              editableFormRef.current?.setRowData(id, {
                materialsInventoryId: res.id,
                materialName: res.materialName,
                measuringUnit: res.measuringUnit,
                specification: res.specification,
                materialCode: res.materialCode,
              });
            }}
          />
        );
      },
    },
    {
      title: '退场数量',
      dataIndex: 'exitNumber',
      ellipsis: true,
      hideInSearch: true,
    },
  ];
  return { formColumns, tableColumns };
};
