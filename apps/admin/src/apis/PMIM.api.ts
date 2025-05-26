import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const menus: ApiItem[] = [
  {
    key: 'personnelInfoList',
    // url: `${ADMIN_API}/wisdom/personnel-info/page`,
    url: `${ADMIN_API}/wisdom/personnel-info/getPersonnelInfoManagerPage`,
    type: 'GET',
    description: '项目人员信息管理',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
      { key: 'name', cn: '姓名' },
      { key: 'phone', cn: '电话号码' },
      { key: 'address', cn: '家庭住址' },
      { key: 'isOverAge', cn: '是否超龄' },
      { key: 'isCertificated', cn: '是否有证书' },
      { key: 'status', cn: '状态' },
    ],
  },
  {
    key: 'getPersonnelNeedUpdateList',
    // url: `${ADMIN_API}/wisdom/personnel-info/page`,
    url: `${ADMIN_API}/wisdom/personnel-info/getPersonnelNeedUpdateList`,
    type: 'GET',
    description: '查询所有信息缺失人员',
    params: [
      { key: 'Authorization', location: 'header' },

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

  {
    key: 'getOverAgeAndNotCertificatedCount',
    url: `${ADMIN_API}/wisdom/personnel-info/getOverAgeAndNotCertificatedCount`,
    type: 'GET',
    description: '获取超龄及证书缺失人数',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'exportModelInfo',
    url: `${ADMIN_API}/wisdom/importInfo/export-model`,
    type: 'GET',
    name: '导出信息管理导入模板',
    description: '导出信息管理导入模板',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" },
    { key: 'Accept-Encoding', location: "header" }
    ]
  },
  {
    key: 'importByModel',
    url: `${ADMIN_API}/wisdom/importInfo/importByModel`,
    type: 'POST',
    name: '导入信息管理',
    description: '导入信息管理',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'file', cn: 'Excel 文件' },
    ],
  },
];
export default menus;
