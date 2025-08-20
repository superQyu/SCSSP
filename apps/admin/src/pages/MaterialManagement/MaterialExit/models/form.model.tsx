import { useState, useEffect } from 'react';

import {
  FormColumnsTypes,
  ProUpload,
  SearchSelect,
} from 'components';
import { type ProColumns } from '@ant-design/pro-components';
import { Select, DatePicker, Input } from 'antd';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (
  tableRef: any,
  editableFormRef: any,
  status: string
) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList, subContractor, vehicle } = server;

  // 单位选择下拉
  const [subcontractorList, setSubcontractorList] = useState([]);

  useEffect(() => {
    getSelectOptions();
  }, []);

  // 通过接口获取下拉框的内容
  const getSelectOptions = async () => {
    const res1 = await subContractor.getAllSubContractor();
    const list1 = res1.map((item: any) => {
      // return { label: item.realName, value: `${item.id}` };
      return { label: item.realName, value: item.realName };
    });
    setSubcontractorList(list1);
  };

  const formColumns: FormColumnsTypes[] = [
    {
      label: '退场时间',
      dataIndex: 'exitDate',

      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择退场时间' }],
      },
      formItem: (
        <DatePicker
          showTime
          placeholder="请选择退场时间"
          disabled={status == '0' ? false : true}
        />
      ),
    },
    {
      disabled: status == '0' ? false : true,
      label: '退料人员',
      dataIndex: 'exitPersonnel',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入退料人员' }],
      },
    },
    {
      disabled: status == '0' ? false : true,
      label: '见证人员',
      dataIndex: 'witnessPersonnel',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入见证人员' }],
      },
    },
    {
      disabled: status == '0' ? false : true,
      label: '供应单位',
      dataIndex: 'supplierDepartment',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入供应单位' }],
      },
    },
    {
      disabled: status == '0' ? false : true,
      label: '生产厂家',
      dataIndex: 'manufacturer',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入生产厂家' }],
      },
    },
    {
      label: '购买单位',
      dataIndex: 'purchaserDepartment',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择购买单位' }],
      },
      formItem: (
        <Select
          allowClear
          placeholder="请选择单位"
          options={subcontractorList}
          disabled={status == '0' ? false : true}
        />
      ),
    },
    {
      disabled: status == '0' ? false : true,
      label: '退场原因',
      dataIndex: 'exitReason',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入退场原因' }],
      },
    },
  ];
  const tableColumns: ProColumns[] = [
    {
      title: '车牌号',
      dataIndex: 'carNo',
      ellipsis: true,
      hideInSearch: true,
      renderFormItem: () => {
        return (
          <SearchSelect
            disabled={status == '0' || !status ? false : true}
            // popupMatchSelectWidth={200}
            placeholder="请选择车牌号"
            request={async (input: any) => {
              const res = await vehicle.vehicleApproveList({
                carNo: input,
              });
              // console.log('车牌号下拉选项', res);
              const options = res.list.map((item: any) => {
                return {
                  label: item.carNo,
                  value: item.carNo,
                };
              });
              return options;
            }}
          />
        );
      },
    },
    {
      title: '物料清单id',
      dataIndex: 'materialsInventoryId',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '物料名称',
      dataIndex: 'materialName',
      // ellipsis: true,
      hideInSearch: true,
      width: 220,
      renderFormItem: () => {
        return (
          <SearchSelect
            disabled={status == '0' ? false : true}
            popupMatchSelectWidth={300}
            placeholder="请选择物料名称"
            request={async (input: string) => {
              console.log('input', input);
              const res = await materialList.getAllMaterialList({
                materialName: input,
              });
              // console.log('一级类别下拉选项', res);
              const options = res.map((item: any) => {
                return {
                  label: item.materialName,
                  value: item.id,
                  specification: item.specification,
                };
              });
              return options;
            }}
            optionRender={(option: any) => {
              return (
                <div>
                  <span className="mr-4">
                    {option.data.label}
                  </span>
                  <span>{option.data.specification}</span>
                </div>
              );
            }}
            onChange={async (select: any) => {
              console.log('物料名称发生改变', select);
              const res = await materialList.getMaterialDetail({
                id: select,
              });
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
      readonly: status == '0' ? false : true,
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
            disabled={status == '0' ? false : true}
            popupMatchSelectWidth={100}
            placeholder="请选择物料编号"
            request={async (input: string) => {
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
              const res = await materialList.getMaterialDetail({
                id: select,
              });
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
      readonly: status == '0' ? false : true,
      title: '退场数量',
      dataIndex: 'exitNumber',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '清点数量',
      dataIndex: 'trueExitNumber',
      ellipsis: true,
      hideInSearch: true,
    },
  ];
  return { formColumns, tableColumns };
};
