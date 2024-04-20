import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const group: ApiItem[] = [
  {
    key: 'getGroupList',
    url: `${ADMIN_API}/wisdom/group-info/page`,
    type: 'GET',
    name: '班组管理',
    description: '获取班组列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'realName', cn: '班组长名' },
      { key: 'GroupType', cn: '分包单位' },
      { key: 'GroupType', cn: '劳务工种' },
    ],
  },
  {
    key: 'createGroup',
    url: `${ADMIN_API}/wisdom/Group-info/create`,
    type: 'POST',
    name: '班组管理',
    description: '新建班组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'realName', cn: '班组长' },
      { key: 'shortName', cn: '劳务工种' },
      { key: 'GroupType', cn: '班组名称' },
      { key: 'province', cn: '分包单位' },
      { key: 'city', cn: '身份证号' },
      { key: 'district', cn: '联系方式' },
      { key: 'corpType', cn: '进场日期' },
      { key: 'overallMerit', cn: '退场日期' },
      { key: 'isConformity', cn: '进场附件' },
      { key: 'unitAddress', cn: '退场附件' },
    ],
  },
  {
    key: 'updateGroup',
    url: `${ADMIN_API}/wisdom/Group-info/update`,
    type: 'PUT',
    name: '班组管理',
    description: '编辑班组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
      { key: 'realName', cn: '班组名称' },
      { key: 'GroupType', cn: '班组长名' },
      { key: 'corpCode', cn: '身份证号' },
      { key: 'legalRepresentative', cn: '分包单位名称' },
      { key: 'registeredCapital', cn: '劳务工种' },
      { key: 'principalTel', cn: '联系电话' },
    ],
  },
];
export default group;
