import { useState, useEffect } from 'react';

import { FormColumnsTypes, ProUpload, SearchSelect } from 'components';
import { type ProColumns } from '@ant-design/pro-components';
import { Select, DatePicker, Input } from 'antd';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (
  tableRef: any,
  editableFormRef: any,
  entryAttachments: [] = [],
  exitAttachments: [] = []
) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList } = server;

  // 用来初始化图片列表的初始值
  const entryFileList = entryAttachments.map((item: string, index: number) => {
    return {
      uid: `${index}`,
      name: item?.split('/')?.slice(-1)[0],
      url: item,
    };
  });
  const exitFileList = exitAttachments.map((item: string, index: number) => {
    return {
      uid: `${index}`,
      name: item?.split('/')?.slice(-1)[0],
      url: item,
    };
  });

  // 分包单位选择下拉
  const [subcontractorList, setSubcontractorList] = useState([]);
  // 班组长选择下拉
  const [personInfoList, setPersonInfoList] = useState([]);

  useEffect(() => {
    // getSelectOptions();
  }, []);

  // 表单交互相关
  // 选择人员后，带出人员相关信息
  // const getPersonInfo = async (value: string) => {
  //   // console.log('选择项改变', value);
  //   const res = await certificate.getPersonInfoDetail({ id: value });
  //   // console.log('人员信息', res);
  //   subFormRef.current.setFieldsValue({
  //     // 劳务工种
  //     workTypeName: res.personnelInfoRespVO.workTypeName,
  //     // 身份证号
  //     identityCard: res.personnelInfoRespVO.identityCard,
  //     // 联系方式
  //     phone: res.personnelInfoRespVO.phone,
  //     // 进场日期
  //     entryDate: res.entryInfoRespVO.entryDate,
  //     // 退场日期
  //     exitDate: res.entryInfoRespVO.exitDate,
  //   });
  // };

  // 通过接口获取下拉框的内容
  // const getSelectOptions = async () => {
  //   const res1 = await subContractor.getAllSubContractor();
  //   // console.log('分包商列表', res1);
  //   const list1 = res1.map((item: any) => {
  //     return { label: item.realName, value: item.id };
  //   });
  //   // console.log('分包商列表', list1);
  //   setSubcontractorList(list1);
  //   const res2 = await certificate.getPersonInfoList();
  //   // console.log('班组长列表', res2);
  //   const list2 = res2.map((item: any) => {
  //     return { label: item.name, value: item.id };
  //   });
  //   setPersonInfoList(list2);
  // };

  const formColumns: FormColumnsTypes[] = [
    {
      label: '进场时间',
      dataIndex: 'enterDate',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择进场时间' }],
      },
      formItem: <DatePicker showTime placeholder="请选择进场时间" />,
    },
    {
      label: '送货人',
      dataIndex: 'deliveryMan',
      colNum: 12,
    },
    {
      label: '材料员',
      dataIndex: 'materialMan',
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
  ];
  const tableColumns: ProColumns[] = [
    {
      title: '物料清单id',
      dataIndex: 'materialsInventoryId',
      ellipsis: true,
      hideInSearch: true,
      hideInTable: true
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
                materialCode: res.materialCode
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
                materialCode: res.materialCode
              });
            }}
          />
        );
      },
    },
    {
      title: '进场数量',
      dataIndex: 'enterNumber',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '合格证件',
      dataIndex: 'attachment',
      ellipsis: true,
      hideInSearch: true,
    },
  ];
  return { formColumns, tableColumns };
};
