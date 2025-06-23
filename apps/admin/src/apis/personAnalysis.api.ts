import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const personAnalysis: ApiItem[] = [
  {
    key: 'getAttendanceMonitor',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getAttendanceMonitor`,
    type: 'GET',
    name: '现场统计',
    description: '现场统计',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getLatestFourAttendanceRecord',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getLatestFourAttendanceRecord`,
    type: 'GET',
    name: '实时动态',
    description: '实时动态',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getLaborInfo',
    url: `${ADMIN_API}/wisdom/personnel-info/getPersonAnalyse`,
    type: 'GET',
    name: '劳务信息',
    description: '劳务信息（男女人数、年龄人数）',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getCertificateWarningList',
    url: `${ADMIN_API}/wisdom/personnel-certificate/getCertificateWarningList`,
    type: 'GET',
    name: '证书预警',
    description: '证书预警',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getPersonnelSpecialWorkList',
    url: `${ADMIN_API}/wisdom/personnel-info/getPersonnelSpecialWorkList`,
    type: 'GET',
    name: '获取公司特殊工种人员',
    description: '获取公司特殊工种人员',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getCurrentAttendanceStatistic',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getCurrentAttendanceStatistic`,
    type: 'GET',
    name: '获取公司注册人数和履約人数',
    description: '获取公司注册人数和履約人数',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getCompanyUnFreezeNumList',
    url: `${ADMIN_API}/wisdom/personnel-info/getCompanyUnFreezeNumList`,
    type: 'GET',
    name: '获取公司解除限制人数 ',
    description: '获取公司解除限制人数 ',
    params: [{ key: 'Authorization', location: 'header' }],
  },
];
export default personAnalysis;
