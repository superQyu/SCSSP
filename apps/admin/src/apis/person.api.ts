import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const person: ApiItem[] = [
  {
    key: 'createFullPersonInfo',
    url: `${ADMIN_API}/wisdom/personnel-info/createFullPersonInfo`,
    type: 'POST',
    name: '信息采集',
    description: '录入人员信息',
    params: [
      {
        key: 'tenant-id', location: 'header', value: "1", valueAttrs: {
          value: "1"
        }
      },
      { key: 'Authorization', location: 'header' },
      { key: 'personnelInfoSaveReqVO', cn: '用户基础信息' },
      { key: 'personnelCertificateSaveReqVOS', cn: '人员证书信息' },
      { key: 'entryInfoSaveReqVO', cn: '人员进场信息' },
    ],
  },
  {
    key: 'updateFullPersonInfo',
    url: `${ADMIN_API}/wisdom/personnel-info/updatePersonnelInfoManagerDetail`,
    type: 'PUT',
    name: '信息采集',
    description: '录入人员信息',
    params: [
      {
        key: 'tenant-id', location: 'header', value: "1", valueAttrs: {
          value: "1"
        }
      },
      { key: 'Authorization', location: 'header' },
      { key: 'personnelInfoSaveReqVO', cn: '用户基础信息' },
      { key: 'personnelCertificateSaveReqVOS', cn: '人员证书信息' },
      { key: 'entryInfoSaveReqVO', cn: '人员进场信息' },
    ],
  },
  {
    key: 'confirmPersonInfo',
    url: `${ADMIN_API}/wisdom/personnel-info/confirm-bpm`,
    type: 'GET',
    name: '项目经理审核人员信息',
    description: '项目经理审核人员信息',
    params: [
      {
        key: 'tenant-id', location: 'header', value: "1", valueAttrs: {
          value: "1"
        }
      },
      { key: 'Authorization', location: 'header' },
      { key: 'personnelInfoId', cn: '用户基础信息' },
      { key: 'isConfirm', cn: '通过或者驳回' },

    ],
  },
  {
    key: 'createPersonInfo',
    url: `${ADMIN_API}/wisdom/personnel-info/create-bpm`,
    type: 'GET',
    name: '驳回后再次提交人员信息',
    description: '驳回后再次提交人员信息',
    params: [
      {
        key: 'tenant-id', location: 'header', value: "1", valueAttrs: {
          value: "1"
        }
      },
      { key: 'Authorization', location: 'header' },
      { key: 'personnelInfoId', cn: '用户基础信息' },
    ],
  },
  {
    key: 'workType',
    url: `${ADMIN_API}/wisdom/work-type-info/page`,
    type: 'GET',
    name: '工种信息',
    description: '工种信息',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
    ],
  },
  {
    key: 'aaa',
    url: `${ADMIN_API}/wisdom/personnel-info/page`,
    type: 'GET',
    name: '信息管理',
    description: '人员信息列表',
    params: [
      { key: 'Authorization', location: 'header' },
    ],
  },
  {
    key: 'uploadFile',
    url: `${ADMIN_API}/infra/file/upload`,
    type: 'POST',
    name: '上传文件',
    description: '文件存储',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'path', cn: '文件附件' },

    ],
  },
];
export default person;
