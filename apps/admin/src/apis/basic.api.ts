import { ApiItem } from '@spms/web-request';
const MOCK = import.meta.env.VITE_APP_MOCK_API;
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;
const user: ApiItem[] = [
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
];
export default user;
