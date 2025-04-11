import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const personAnalysis: ApiItem[] = [
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
];
export default personAnalysis;
