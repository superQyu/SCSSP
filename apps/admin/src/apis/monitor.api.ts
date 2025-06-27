import { ApiItem } from '@spms/web-request';
import { getToken } from 'utils';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;
const monitor: ApiItem[] = [
  {
    key: 'login',
    url: `${ADMIN_API}/wisdom/monitor/token`,
    type: 'GET',
    name: '监控平台鉴权登录',
    description: '监控平台鉴权登录',
    params: [
      { key: 'Authorization', location: 'header' },
      {
        key: 'username',
        cn: '菜单类型',
        valueAttrs: {
          value: 'adminUser',
        },
      },
      {
        key: 'password',
        cn: '权限',
        valueAttrs: {
          value: 'rYJOpkzmdaSj/SLSHG3cKg==',
        },
      },
    ],
  },
  {
    key: 'cameraList',
    url: `${ADMIN_API}/wisdom/monitor/camera-list`,
    // url: `/monitor/camera/getCameraByCode`,
    type: 'GET',
    name: '根据项目编号获取监控列表',
    description: '根据项目编号获取监控列表',
    params: [
      { key: 'Authorization', location: 'header' },
      {
        key: 'token',
        location: 'header',
        valueAttrs: {
          value: getToken('monitor_token'),
        },
      },
      { key: 'projectNo', cn: '项目编号' },
      { key: 'pageNo', cn: '站点标识' },
      { key: 'pageSize', cn: '站点标识' },
      { key: 'beginDate', cn: '站点标识' },
      { key: 'endDate', cn: '站点标识' },
      { key: 'isRemoved', cn: '站点标识' },
    ],
  },
  {
    key: 'previewURLs',
    url: `/monitor/camera/previewURLs`,
    type: 'GET',
    name: '根据设备编号获取视频流地址',
    description: '根据设备编号获取视频流地址',
    params: [
      {
        key: 'token',
        location: 'header',
        valueAttrs: {
          value: getToken('monitor_token'),
        },
      },
      { key: 'cameraIndexCode', cn: '项目编号' },
      { key: 'streamType', cn: '站点标识' },
      { key: 'transmode', cn: '站点标识' },
      { key: 'protocol', cn: '站点标识' },
      { key: 'expand', cn: '站点标识' },
    ],
  },
];
export default monitor;
