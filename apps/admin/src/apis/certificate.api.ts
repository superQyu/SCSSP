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
      // 信息采集中用的 certificateCategory
      // 证书创建接口中给的 credentialClassification
      // 暂定以信息采集为准
      // 0：项目管理；1：安全员；2：特殊工种)
      { key: 'certificateCategory', cn: '证书分类(tab)' },
      { key: 'subcontractorId', cn: '分包单位' },
      { key: 'userId', cn: '隶属人员名称' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
    ],
  },
  {
    key: 'createCertificate',
    url: `${ADMIN_API}/wisdom/personnel-certificate/create`,
    type: 'POST',
    name: '证件列表',
    description: '新增证件列表',
    params: [
      { key: 'Authorization', location: 'header' },
      // { key: 'certificateCategory', cn: '证书分类(tab)' },
      { key: 'userId', cn: '隶属人员 id' },
      { key: 'credentialName', cn: '证书名称' },
      { key: 'credentialNumber', cn: '证书编号' },
      { key: 'certificateType', cn: '证书种类' },
      { key: 'certificateCategory', cn: '证书类型' },
      { key: 'certificateLevel', cn: '证书等级' },
      { key: 'positionTitle', cn: '岗位名称' },
      { key: 'firstIssuedDate', cn: '第一次发证日期' },
      { key: 'validityStartDate', cn: '有效期起' },
      { key: 'validityEndDate', cn: '有效期止' },
      { key: 'issuingAuthority', cn: '发证机关' },
      { key: 'reviewDate', cn: '复核日期' },
      { key: 'certificateDateSpecialWork', cn: '特工证网络核验日期' },
      { key: 'remark', cn: '备注' },
      { key: 'picture', cn: '图片上传' },
    ],
  },
  {
    key: 'updateCertificate',
    url: `${ADMIN_API}/wisdom/personnel-certificate/update`,
    type: 'PUT',
    name: '证件列表',
    description: '编辑证件列表',
    params: [
      { key: 'Authorization', location: 'header' },
      // { key: 'certificateCategory', cn: '证书分类(tab)' },
      { key: 'userId', cn: '隶属人员 id' },
      { key: 'credentialName', cn: '证书名称' },
      { key: 'credentialNumber', cn: '证书编号' },
      { key: 'certificateType', cn: '证书种类' },
      { key: 'certificateCategory', cn: '证书类型' },
      { key: 'certificateLevel', cn: '证书等级' },
      { key: 'positionTitle', cn: '岗位名称' },
      { key: 'firstIssuedDate', cn: '第一次发证日期' },
      { key: 'validityStartDate', cn: '有效期起' },
      { key: 'validityEndDate', cn: '有效期止' },
      { key: 'issuingAuthority', cn: '发证机关' },
      { key: 'reviewDate', cn: '复核日期' },
      { key: 'certificateDateSpecialWork', cn: '特工证网络核验日期' },
      { key: 'remark', cn: '备注' },
      { key: 'picture', cn: '图片上传' },
    ],
  },
  {
    key: 'deleteCertificate',
    url: `${ADMIN_API}/wisdom/personnel-certificate/delete`,
    type: 'GET',
    name: '证件列表',
    description: '删除证件列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
    ],
  },
];
export default certificate;
