import { ApiItem } from '@spms/web-request';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const flowGroup: ApiItem[] = [
  {
    key: 'getUserGroupPage',
    url: `${ADMIN_API}/bpm/user-group/page`,
    type: 'GET',
    name: '流程管理/用户分组',
    description: '获得用户组分页',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'name', cn: '组名' },
      { key: 'status', cn: '状态' },
      { key: 'createTime[0]', cn: '创建时间' },
      { key: 'createTime[1]', cn: '创建时间' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
    ],
  },
  {
    key: 'createUserGroup',
    url: `${ADMIN_API}/bpm/user-group/create`,
    type: 'POST',
    name: '流程管理/用户分组',
    description: '创建用户组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'name', cn: '组名' },
      { key: 'description', cn: '描述' },
      { key: 'memberUserIds', cn: '成员编号' },
      { key: 'status', cn: '状态' },
    ],
  },
  {
    key: 'updateUserGroup',
    url: `${ADMIN_API}/bpm/user-group/update`,
    type: 'PUT',
    name: '流程管理/用户分组',
    description: '更新用户组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
      { key: 'name', cn: '组名' },
      { key: 'description', cn: '描述' },
      { key: 'memberUserIds', cn: '成员编号' },
      { key: 'status', cn: '状态' },
    ],
  },
  {
    key: 'deleteUserGroup',
    url: `${ADMIN_API}/bpm/user-group/delete`,
    type: 'DELETE',
    name: '流程管理/用户分组',
    description: '删除用户组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
    ],
  },
];
export default flowGroup;
