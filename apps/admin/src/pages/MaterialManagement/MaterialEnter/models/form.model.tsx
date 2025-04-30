import { useState, useEffect } from 'react';

import { FormColumnsTypes, SearchSelect } from 'components';
import { type ProColumns } from '@ant-design/pro-components';
import { Select, DatePicker, Input, Button } from 'antd';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (
  tableRef: any,
  editableFormRef: any,
  status: string
) => {
  const commonWidth = 100;
  console.log('status', status);

  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList, certificate, vehicle, subContractor } =
    server;

  // 隶属人员选择下拉
  const [personInfoList, setPersonInfoList] = useState([]);
  // 单位选择下拉
  const [subcontractorList, setSubcontractorList] = useState([]);

  useEffect(() => {
    getSelectOptions();
  }, []);

  // 通过接口获取下拉框的内容
  const getSelectOptions = async () => {
    const res1 = await subContractor.getAllSubContractor();
    // console.log('单位列表', res1);
    const list1 = res1.map((item: any) => {
      // return { label: item.realName, value: `${item.id}` };
      return { label: item.realName, value: item.realName };
    });
    // console.log('单位列表', list1);
    setSubcontractorList(list1);
    const res2 = await certificate.getPersonInfoList();
    // console.log('人员列表', res2);
    const list2 = res2.map((item: any) => {
      // return { label: item.name, value: `${item.id}` };
      return { label: item.name, value: item.name };
    });
    setPersonInfoList(list2);
  };

  const formColumns: FormColumnsTypes[] = [
    {
      label: '车牌号',
      dataIndex: 'carNo',
      colNum: 12,
      disabled: status == '0' ? false : true,
      formItemProps: {
        rules: [{ required: true, message: '请选择车牌号' }],
      },
      formItem: (
        <SearchSelect
          // popupMatchSelectWidth={200}
          disabled={status == '0' ? false : true}
          placeholder="请选择车牌号"
          request={async (input: string) => {
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
      ),
    },
    {
      label: '进场时间',
      dataIndex: 'enterDate',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择进场时间' }],
      },
      formItem: (
        <DatePicker
          disabled={status == '0' ? false : true}
          showTime
          placeholder="请选择进场时间"
        />
      ),
    },
    {
      label: '送货人',
      dataIndex: 'deliveryMan',
      colNum: 12,
      disabled: status == '0' ? false : true,
      formItemProps: {
        rules: [{ required: true, message: '请输入送货人' }],
      },
    },
    {
      label: '送货人联系方式',
      dataIndex: 'deliveryContact',
      colNum: 12,
      disabled: status == '0' ? false : true,
      formItemProps: {
        rules: [
          { required: true, message: '请输入送货人联系方式' },
        ],
      },
    },
    {
      label: '验收人',
      dataIndex: 'materialMan',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择验收人' }],
      },
      formItem: (
        <Select
          mode="multiple"
          allowClear
          disabled={status == '0' ? false : true}
          placeholder="请选择验收人"
          options={personInfoList}
        />
      ),
    },
    // {
    //   label: '供应单位',
    //   dataIndex: 'supplierDepartment',
    //   colNum: 12,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入供应单位' }],
    //   },
    // },
    // {
    //   label: '生产厂家',
    //   dataIndex: 'manufacturer',
    //   colNum: 12,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入生产厂家' }],
    //   },
    // },
    {
      label: '购买单位',
      dataIndex: 'purchaserDepartment',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入购买单位' }],
      },
      formItem: (
        <Select
          disabled={status == '0' ? false : true}
          allowClear
          placeholder="请选择单位"
          options={subcontractorList}
        />
      ),
    },
  ];
  const tableColumns: ProColumns[] = [
    // {
    //   title: '车牌号',
    //   dataIndex: 'carNo',
    //   // ellipsis: true,
    //   hideInSearch: true,
    //   width: 150,
    //   renderFormItem: () => {
    //     return (
    //       <SearchSelect
    //         // popupMatchSelectWidth={200}
    //         placeholder="请选择车牌号"
    //         request={async (input) => {
    //           const res = await vehicle.vehicleApproveList({
    //             carNo: input,
    //           });
    //           // console.log('车牌号下拉选项', res);
    //           const options = res.list.map((item: any) => {
    //             return {
    //               label: item.carNo,
    //               value: item.carNo,
    //             };
    //           });
    //           return options;
    //         }}
    //       />
    //     );
    //   },
    // },
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
              // console.log('物料名称发生改变', select);
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
      title: '型号',
      dataIndex: 'materialType',
      width: 130,
      readonly: status == '0' ? false : true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '计量单位',
      dataIndex: 'measuringUnit',
      ellipsis: true,
      width: 100,
      hideInSearch: true,
      renderFormItem: () => {
        return <Input placeholder="请选择物料" disabled />;
      },
    },
    {
      title: '规格',
      dataIndex: 'specification',
      ellipsis: true,
      width: 100,
      hideInSearch: true,
      renderFormItem: () => {
        return <Input placeholder="请选择物料" disabled />;
      },
    },
    {
      title: '物料编号',
      dataIndex: 'materialCode',
      ellipsis: true,
      width: 130,
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
      title: '进场数量',
      dataIndex: 'enterNumber',
      width: commonWidth,
      ellipsis: true,
      readonly: status == '0' ? false : true,
      hideInSearch: true,
    },
    {
      title: '实际验收数量',
      dataIndex: 'acceptNumber',
      width: commonWidth,
      readonly: status == '0' ? true : false,
      ellipsis: true,
      hideInSearch: true,
    },
  ];
  return { formColumns, tableColumns };
};
