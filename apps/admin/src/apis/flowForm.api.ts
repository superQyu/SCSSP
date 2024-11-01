import { ApiItem } from '@spms/web-request';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const flowForm: ApiItem[] = [
  {
    key: 'getFormPage',
    url: `${ADMIN_API}/bpm/form/page`,
    type: 'GET',
    name: '流程管理/流程表单',
    description: '获得工作流的表单定义分页',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'name', cn: '流程表单名称' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
    ],
  },
  {
    key: 'deleteForm',
    url: `${ADMIN_API}/bpm/form/delete`,
    type: 'DELETE',
    name: '流程管理/流程表单',
    description: '删除流程表单',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
    ],
  },
];
export default flowForm;
