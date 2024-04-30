import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const attendance: ApiItem[] = [
  {
    key: 'attendanceList',
    url: `${ADMIN_API}/wisdom/personnel-info/page`,
    type: 'GET',
    description: '考勤汇总列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
      { key: 'name' },
      {
        key: 'startTime',
      },
      {
        key: 'endTime',
      },
    ],
  },
];
export default attendance;
