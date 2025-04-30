import { useEffect, useState } from 'react';

import { type ProColumns } from '@ant-design/pro-components';
import { Select } from 'antd';

import DictText from '@/components/DictSelect/DictText';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export interface ColumnsParamsProps extends objJson {
  subcontractorType: string;
  realName: string;
  corpCode: string;
  legalRepresentative: string;
  registeredCapital: string;
  unitAddress: string;
  principal: string;
  principalTel: string;
}

export default ({ server }: MenusPropsType) => {
  const columnWidth0 = 189;
  const columnWidth1 = 170;
  const columnWidth2 = 170;

  const { subContractor, certificate } = server as objJson;

  // 单位选择下拉
  const [subcontractorList, setSubcontractorList] = useState([]);
  // 隶属人员选择下拉
  const [personInfoList, setPersonInfoList] = useState([]);

  useEffect(() => {
    getSelectOptions();
  }, []);

  // 通过接口获取下拉框的内容
  const getSelectOptions = async () => {
    const res1 = await subContractor.getAllSubContractor();
    const list1 = res1.map((item: any) => {
      return { label: item.realName, value: item.id };
    });
    setSubcontractorList(list1);
    const res2 = await certificate.getPersonInfoList();
    // console.log('隶属人员列表', res2);
    const list2 = res2.map((item: any) => {
      return { label: item.name, value: item.id };
    });
    setPersonInfoList(list2);
  };

  const columns: Record<string, ProColumns[]> = {
    0: [
      {
        title: '序号',
        valueType: 'indexBorder',
        dataIndex: 'index',
        fixed: 'left',
        width: columnWidth0,
        ellipsis: true,
      },
      {
        title: '单位',
        dataIndex: 'subcontractorId',
        ellipsis: true,
        width: columnWidth0,
        render: (text, record) => {
          return <span>{record.realName}</span>;
        },
        renderFormItem: () => {
          return (
            <Select
              placeholder="请选择单位"
              options={subcontractorList}
            />
          );
        },
      },
      {
        title: '隶属人员',
        dataIndex: 'userId',
        ellipsis: true,
        width: columnWidth0,
        render: (text, record) => {
          return <span>{record.userName}</span>;
        },
        renderFormItem: () => {
          return (
            <Select
              placeholder="请选择隶属人员"
              options={personInfoList}
            />
          );
        },
      },
      {
        title: '人员类型',
        dataIndex: 'workerType',
        ellipsis: true,
        width: columnWidth0,
        hideInSearch: true,
        render: (text, record) => {
          return (
            <DictText
              value={record.workerType}
              dictKey={'pm_worker_type'}
            />
          );
        },
      },
      {
        title: '岗位/职位',
        // 管理人员用 jobCategory, 工人用 workTypeName
        dataIndex: 'jobCategory',
        ellipsis: true,
        width: columnWidth0,
        hideInSearch: true,
        render: (text, record) => {
          return (
            <DictText
              value={record.jobCategory}
              dictKey={'pm_job_category'}
            />
          );
        },
      },
      {
        title: '证书名称',
        dataIndex: 'credentialName',
        ellipsis: true,
        width: columnWidth0,
        hideInSearch: true,
      },
      {
        title: '证书编号',
        dataIndex: 'credentialNumber',
        ellipsis: true,
        width: columnWidth0,
        hideInSearch: true,
      },
      {
        title: '有效日期',
        dataIndex: 'validityEndDate',
        ellipsis: true,
        width: columnWidth0,
        hideInSearch: true,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        ellipsis: true,
        width: columnWidth0,
        hideInSearch: true,
      },
    ],
    1: [
      {
        title: '序号',
        valueType: 'indexBorder',
        dataIndex: 'index',
        fixed: 'left',
        width: columnWidth1,
        ellipsis: true,
      },
      {
        title: '单位',
        dataIndex: 'subcontractorId',
        ellipsis: true,
        width: columnWidth1,
        render: (text, record) => {
          return <span>{record.realName}</span>;
        },
        renderFormItem: () => {
          return (
            <Select
              placeholder="请选择单位"
              options={subcontractorList}
            />
          );
        },
      },
      {
        title: '隶属人员',
        dataIndex: 'userId',
        ellipsis: true,
        width: columnWidth1,
        render: (text, record) => {
          return <span>{record.userName}</span>;
        },
        renderFormItem: () => {
          return (
            <Select
              placeholder="请选择隶属人员"
              options={personInfoList}
            />
          );
        },
      },
      {
        title: '身份证号',
        dataIndex: 'identityCard',
        ellipsis: true,
        width: columnWidth1,
        hideInSearch: true,
      },
      {
        title: '工龄',
        dataIndex: 'workYears',
        ellipsis: true,
        width: columnWidth1,
        hideInSearch: true,
      },
      {
        title: '证书名称',
        dataIndex: 'credentialName',
        ellipsis: true,
        width: columnWidth1,
        hideInSearch: true,
      },
      {
        title: '证书编号',
        dataIndex: 'credentialNumber',
        ellipsis: true,
        width: columnWidth1,
        hideInSearch: true,
      },
      {
        title: '证书认证时间',
        dataIndex: 'certificateDate',
        ellipsis: true,
        width: columnWidth1,
        hideInSearch: true,
      },
      {
        title: '证书发证机关',
        dataIndex: 'issuingAuthority',
        ellipsis: true,
        width: columnWidth1,
        hideInSearch: true,
      },
      {
        title: '有效日期',
        dataIndex: 'validityEndDate',
        ellipsis: true,
        width: columnWidth1,
        hideInSearch: true,
      },
    ],
    2: [
      {
        title: '序号',
        valueType: 'indexBorder',
        dataIndex: 'index',
        fixed: 'left',
        width: columnWidth2,
        ellipsis: true,
      },
      {
        title: '单位',
        dataIndex: 'subcontractorId',
        ellipsis: true,
        width: columnWidth2,
        render: (text, record) => {
          return <span>{record.realName}</span>;
        },
        renderFormItem: () => {
          return (
            <Select
              placeholder="请选择单位"
              options={subcontractorList}
            />
          );
        },
      },
      {
        title: '隶属人员',
        dataIndex: 'userId',
        ellipsis: true,
        width: columnWidth2,
        render: (text, record) => {
          return <span>{record.userName}</span>;
        },
        renderFormItem: () => {
          return (
            <Select
              placeholder="请选择隶属人员"
              options={personInfoList}
            />
          );
        },
      },
      {
        title: '身份证号',
        dataIndex: 'identityCard',
        ellipsis: true,
        width: columnWidth2,
        hideInSearch: true,
      },
      {
        // 实际上就是 岗位/职位
        // 管理人员用 jobCategory, 工人用 workTypeName
        title: '特工证证件类别',
        dataIndex: 'workTypeName',
        ellipsis: true,
        width: columnWidth2,
        hideInSearch: true,
        render: (
          text: any,
          record: any,
          index: number,
          action: any
        ) => {
          if (record.workTypeId)
            return <span>{record.workTypeName}</span>;
          else
            return (
              <DictText
                value={`${record.jobCategory}`}
                dictKey="subcontractor_type"
              />
            );
        },
      },
      {
        title: '证号',
        dataIndex: 'credentialNumber',
        ellipsis: true,
        width: columnWidth2,
        hideInSearch: true,
      },
      {
        title: '开始日期',
        dataIndex: 'validityStartDate',
        valueType: 'date',
        ellipsis: true,
        width: columnWidth2,
        hideInSearch: true,
      },
      {
        title: '终止日期',
        dataIndex: 'validityEndDate',
        valueType: 'date',
        ellipsis: true,
        width: columnWidth2,
        hideInSearch: true,
      },
      {
        title: '复核日期',
        dataIndex: 'reviewDate',
        valueType: 'date',
        ellipsis: true,
        width: columnWidth2,
        hideInSearch: true,
      },
      {
        title: '网络核验日期',
        dataIndex: 'certificateDateSpecialWork',
        valueType: 'date',
        ellipsis: true,
        width: columnWidth2,
        hideInSearch: true,
      },
    ],
  };
  return columns;
};
