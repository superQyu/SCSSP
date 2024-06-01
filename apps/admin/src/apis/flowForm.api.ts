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
    key: 'createGroup',
    url: `${ADMIN_API}/wisdom/flowForm-info/create`,
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
    url: `${ADMIN_API}/wisdom/flowForm-info/update`,
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
