import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const certificate: ApiItem[] = [
  {
    key: 'getPersonInfoList',
    url: `${ADMIN_API}/wisdom/personnel-info/getPersonnelInfoList`,
    type: 'GET',
    name: '人员列表',
    description: '获取人员列表(不分页)',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getPersonInfoDetail',
    url: `${ADMIN_API}/wisdom/personnel-info/getPersonnelInfoManagerDetail`,
    type: 'GET',
    name: '人员列表',
    description: '获取人员详情',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据主键' },
    ],
  },
  {
    key: 'getCertificateList',
    url: `${ADMIN_API}/wisdom/personnel-certificate/getPersonnelCertificateManagerPage`,
    type: 'GET',
    name: '证件列表',
    description: '获取证件列表(分页)',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'realName', cn: '分包单位' },
      { key: 'userName', cn: '隶属人员名称' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
    ],
  },
  {
    key: 'createCertificate',
    url: `${ADMIN_API}/wisdom/personnel-certificate/getPersonnelCertificateManagerPage`,
    type: 'GET',
    name: '证件列表',
    description: '新增证件列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'personId', cn: '隶属人员 id' },
      { key: 'userName', cn: '证书编号' },
      { key: 'userName', cn: '归档日期' },
      { key: 'userName', cn: '有效期' },
      { key: 'userName', cn: '有效期起' },
      { key: 'userName', cn: '备注' },
      { key: 'userName', cn: '图片上传' },
    ],
  },
];
export default certificate;
