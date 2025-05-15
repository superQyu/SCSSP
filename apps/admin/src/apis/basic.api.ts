import { ApiItem } from '@spms/web-request';
const MOCK = import.meta.env.VITE_APP_MOCK_API;
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const user: ApiItem[] = [
  {
    key: 'getListByUser',
    url: `${ADMIN_API}/wisdom/project-info/list-by-user`,
    type: 'GET',
    name: '获取用户项目列表',
    description: '获取用户项目列表',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getSimpleDictTypeList',
    url: `${ADMIN_API}/system/dict-type/list-all-simple`,
    type: 'GET',
    name: '字典列表',
    description: '获取字典列表',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getDictType',
    url: `${ADMIN_API}/system/dict-data/page`,
    type: 'GET',
    name: '字典详情',
    description: '查询字典详情',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'pageNo', valueAttrs: { value: 1 } },
      { key: 'pageSize', valueAttrs: { value: 99 } },
      { key: 'label' },
      { key: 'dictType' },
    ],
  },
  // 
  // 查询字典数据（精简)列表
  {
    key: 'getDictList',
    url: `${ADMIN_API}/system/dict-data/simple-list`,
    type: 'GET',
    name: '字典列表',
    description: '查询字典列表',
    params: [{ key: 'Authorization', location: "header" }]
  },
  // /system/area/tree
  // 地区查询
  {
    key: 'getAreaList',
    url: `${ADMIN_API}/system/area/tree`,
    type: 'GET',
    name: '地区查询',
    description: '查询地区列表',
    params: [{ key: 'Authorization', location: "header" }]
  },
  // {
  //   key: 'getDictType',
  //   url: `${ADMIN_API}/system/dict-type/get`,
  //   type: 'GET',
  //   name: '字典详情',
  //   description: '查询字典详情',
  //   params: [{ key: 'Authorization', location: "header" },
  //   { key: 'id' }]
  // },
  {
    key: 'siteInfor',
    url: '/api/v1/site/siteInfor',
    type: 'GET',
    name: '站点信息',
    description: '站点信息',
    params: [{ key: 'host' }, { key: 'protocol' }, { key: 'origin' }],
  },
  {
    key: 'test',
    url: `${MOCK}/json-mock/news`,
    type: 'GET',
    name: '测试',
    description: '测试',
  },
  {
    key: 'upload',
    url: `${ADMIN_API}/infra/file/upload`,
    type: 'POST',
    name: '上传文件',
    description: '上传文件',
    params: [
      {
        key: 'tenant-id',
        location: 'header',
        value: '1',
        valueAttrs: {
          value: '1',
        },
      },
      { key: 'Authorization', location: 'header' },
      { key: 'path', cn: '路径' },
      { key: 'file:', cn: '文件信息' },
    ],
  },
  {
    key: 'exportCarDispatchRecord',
    url: `${ADMIN_API}/wisdom/car-info/export-form`,
    type: 'GET',
    name: '车辆模板导出',
    description: '车辆模板导出',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" }]
  },
  {
    key: 'exportSubcontractorInfo',
    url: `${ADMIN_API}/wisdom/subcontractor-info/export-excel`,
    type: 'GET',
    name: '单位模板导出',
    description: '单位模板导出',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" }]
  },
  {
    key: 'exportPersonnelInfo',
    url: `${ADMIN_API}/wisdom/personnel-info/export-excel`,
    type: 'GET',
    name: '人员信息模板导出',
    description: '人员信息模板导出',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" }]
  },

  {
    key: 'exportPersonnelAttendance',
    url: `${ADMIN_API}/wisdom/personnel-attendance/export-excel`,
    type: 'GET',
    name: '考勤导出',
    description: '考勤导出',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" }]
  },
  {
    key: 'exportWorkTypeInfo',
    url: `${ADMIN_API}/wisdom/work-type-info/export-excel`,
    type: 'GET',
    name: '工种导出',
    description: '工种导出',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" }]
  },
  {
    key: 'exportProjectUnity',
    url: `${ADMIN_API}/wisdom/project-unity/export`,
    type: 'GET',
    name: '工种导出',
    description: '工种导出',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" }]
  },
  {
    key: 'exportMaterialsEnter',
    url: `${ADMIN_API}/wisdom/materials-enter/export-excel`,
    type: 'GET',
    name: '物料进场导出',
    description: '物料进场导出',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" }]
  },
  {
    key: 'exportMaterialsExit',
    url: `${ADMIN_API}/wisdom/materials-exit/export-excel`,
    type: 'GET',
    name: '物料退场导出',
    description: '物料退场导出',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" }]
  },
  {
    key: 'exportCarInOutRecord',
    url: `${ADMIN_API}/wisdom/car-in-out-record/export-excel`,
    type: 'GET',
    name: '车辆进出场',
    description: '车辆进出场',
    cusParmas: {
      dataType: 'blob'
    },
    params: [{ key: 'Authorization', location: "header" }]
  },
];
export default user;
