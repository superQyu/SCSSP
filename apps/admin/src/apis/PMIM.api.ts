import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const menus: ApiItem[] = [
  {
    key: 'personnelInfoList',
    url: `${ADMIN_API}/wisdom/personnel-info/page`,
    type: 'GET',
    description: '项目人员信息管理',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
      { key: 'name' },
    ],
  },
  {
    key: 'deletePersonnelInfo',
    url: `${ADMIN_API}/wisdom/personnel-info/delete`,
    type: 'DELETE',
    description: '项目人员信息管理',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '需要删除的主键id' },
    ],
  },
];
export default menus;
