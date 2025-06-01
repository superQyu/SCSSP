import {
  UserOutlined,
  StarTwoTone,
  StopTwoTone,
} from '@ant-design/icons';
import {
  TableDropdown,
  type ProColumns,
} from '@ant-design/pro-components';
import {
  message,
  Avatar,
  Image,
  Tag,
  Select,
  Button,
  Popconfirm,
} from 'antd';

import { IconSelect, IconShow } from 'ui';
import DictSelect from '@/components/DictSelect';
import DictText from '@/components/DictSelect/DictText';
import { useEffect, useState } from 'react';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export interface ColumnsParamsProps extends objJson {
  id: number;
  name: string;
  ico: string;
  orderNum: number;
  roleKey: number | string;
  isDelete: '0' | '1';
}

export default ({ server }: MenusPropsType) => {
  const { menus: M, subContractor } = server as objJson;

  const [subcontractorList, setSubcontractorList] = useState([]);

  // 通过接口获取下拉框的内容
  const getSelectOptions = async () => {
    const res1 = await subContractor.getAllSubContractor();
    const list1 = res1.map((item: any) => {
      return { label: item.realName, value: `${item.id}` };
    });
    setSubcontractorList(list1);
  };

  useEffect(() => {
    getSelectOptions();
  }, []);

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 60,
      editable: false,
      hideInSearch: true,
      sorter: true,
      fixed: 'left',
    },
    {
      width: 60,
      hideInSearch: true,
      title: '头像',
      editable: false,
      dataIndex: 'passportPhoto',
      render: (_, record) => (
        <Avatar
          icon={<UserOutlined />}
          src={
            record.passportPhoto || (
              <Image
                src={
                  record.jobNo
                    ? `/src/assets/avatar/${record.jobNo}_1.jpg`
                    : `/src/assets/avatar/default.png`
                }
                fallback={`/src/assets/avatar/default.png`}
                onError={() => {
                  return true;
                }}
              />
            )
          }
        />
      ),
      // renderFormItem: () => <IconSelect model="simple" />,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: '是否超龄',
      dataIndex: 'isOverAge',
      hideInTable: true,
      valueEnum: {
        0: {
          text: '否',
        },
        1: {
          text: '是',
        },
      },
    },
    {
      title: '是否有证书',
      dataIndex: 'isCertificated',
      hideInTable: true,
      valueEnum: {
        0: {
          text: '否',
        },
        1: {
          text: '是',
        },
      },
    },
    // {
    //   width: 80,
    //   hideInSearch: true,
    //   title: '民族',
    //   ellipsis: true,
    //   dataIndex: 'nationality',
    //   render: (_, record) => (
    //     <DictText
    //       value={record.nationality}
    //       dictKey={`pm_nationality`}
    //     />
    //   ),
    // },
    // {
    //   hideInSearch: true,
    //   title: '出生日期',
    //   dataIndex: 'birthday',
    // },
    {
      width: 140,
      hideInSearch: true,
      title: '劳务工种',
      dataIndex: 'workTypeName',
      // render: (_, record) => {
      //   if (record.workerType == '1') {
      //     // 建筑工人
      //     return (
      //       <DictText
      //         value={record.nationality}
      //         dictKey={`pm_nationality`}
      //       />
      //     );
      //   } else {
      //     // 管理人员
      //     return (
      //       <DictText
      //         value={record.nationality}
      //         dictKey={`pm_nationality`}
      //       />
      //     );
      //   }
      // },
    },
    {
      width: 140,
      hideInSearch: true,
      valueType: 'date',
      title: '进场日期',
      dataIndex: 'entryDate',
    },
    {
      hideInSearch: true,
      title: '所属单位',
      dataIndex: 'companyName',
      valueType: 'select',
      fieldProps: {
        options: subcontractorList,
      },
    },
    {
      width: 80,
      hideInSearch: true,
      title: '性别',
      dataIndex: 'gender',
      // type='text'
      render: (_, record) => (
        <DictText value={record.gender} dictKey={`pm_gender`} />
      ),
    },
    {
      width: 160,
      hideInSearch: true,
      editable: false,
      title: '身份证号',
      dataIndex: 'identityCard',
    },
    // {
    //   hideInSearch: true,
    //   title: '班组名',
    //   dataIndex: 'teamName',
    // },
    // {
    //   hideInSearch: true,
    //   title: '是否班组长',
    //   dataIndex: 'isTeamLeader',
    //   render: (_, record) => (
    //     <DictText
    //       value={record.isTeamLeader}
    //       dictKey={`pm_is_team_leader`}
    //     />
    //   ),
    // },
    {
      title: '电话号码',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '家庭住址',
      // key: 'address',
      dataIndex: 'address',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      fixed: 'right',
      valueType: 'select',
      valueEnum: {
        2: {
          text: <Tag color="success">考勤正常</Tag>,
          status: 'success',
        },
        444: {
          text: <Tag color="error">考勤异常</Tag>,
          status: 'error',
        },
        222: {
          text: <Tag color="gold">已解除限制</Tag>,
          status: 'gold',
        },
        11: {
          text: <Tag color="processing">审核中</Tag>,
          status: 'processing',
        },
        10: {
          text: <Tag color="warning">驳回</Tag>,
          status: 'warning',
        },
      },
      // hideInSearch: true,
      render: (_, record) => {
        if (record.status == '2') {
          return <Tag color="success">考勤正常</Tag>;
        } else if (
          record.status == '11' ||
          record.status == '0' ||
          !record.status
        ) {
          return <Tag color="processing">审核中</Tag>;
        } else if (record.status == '444') {
          return (
            <Tag color="error">考勤异常(连续三天未考勤)</Tag>
          );
        }  else if (record.status == '222') {
          return <Tag color="gold">已解除限制</Tag>;
        }else {
          // 管理人员
          return <Tag color="warning">驳回</Tag>;
        }
      },
    },
    // {
    //   hideInSearch: true,
    //   title: '计价方式',
    //   dataIndex: 'name',
    // },
    // {
    //   hideInSearch: true,
    //   title: '合同签订日',
    //   dataIndex: 'name',
    // },
    // {
    //   hideInSearch: true,
    //   title: '是否零工',
    //   dataIndex: 'name',
    // },
  ];

  return columns;
};
