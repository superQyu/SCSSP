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
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
    ],
  },
  {
    key: 'createGroup',
    url: `${ADMIN_API}/wisdom/group-info/create`,
    type: 'POST',
    name: '班组管理',
    description: '新建班组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'userId', cn: '班组长id' },
      { key: 'teamName', cn: '班组名称' },
      { key: 'subcontractorId', cn: '分包单位id' },
      { key: 'workTypeName', cn: '劳务工种' },
      { key: 'identityCard', cn: '身份证号' },
      { key: 'phone', cn: '联系方式' },
      { key: 'entryDate', cn: '进场时间' },
      { key: 'exitDate', cn: '退场时间' },
      { key: 'entryAttachments', cn: '进场附件' },
      { key: 'exitAttachments', cn: '退场附件' },
    ],
  },
  {
    key: 'updateGroup',
    url: `${ADMIN_API}/wisdom/group-info/update`,
    type: 'PUT',
    name: '班组管理',
    description: '编辑班组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
      { key: 'userId', cn: '班组长id' },
      { key: 'teamName', cn: '班组名称' },
      { key: 'subcontractorId', cn: '分包单位id' },
      { key: 'workTypeName', cn: '劳务工种' },
      { key: 'identityCard', cn: '身份证号' },
      { key: 'phone', cn: '联系方式' },
      { key: 'entryDate', cn: '进场时间' },
      { key: 'exitDate', cn: '退场时间' },
      { key: 'entryAttachments', cn: '进场附件' },
      { key: 'exitAttachments', cn: '退场附件' },
    ],
  },
  {
    key: 'deleteGroup',
    url: `${ADMIN_API}/wisdom/group-info/delete`,
    type: 'DELETE',
    name: '班组管理',
    description: '删除班组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
    ],
  },
];
export default group;
