import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const attendance: ApiItem[] = [
  {
    key: 'attendanceList',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getAttendanceSummaryPage`,
    type: 'GET',
    description: '考勤汇总列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'current', targetKey: 'pageNo', cn: '页码' },
      { key: 'pageSize', cn: '每页条数' },
      { key: 'subcontractorId', cn: '分包单位ID' },
      { key: 'workTypeId', cn: '劳务工种ID' },
      { key: 'groupId', cn: '班组ID' },
      {
        key: 'beginTime',
        cn: '开始时间',
      },
      {
        key: 'endTime',
        cn: '结束时间',
      },
    ],
  },
  {
    key: 'attendanceDetailList',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getAttendanceDetailsPage`,
    type: 'GET',
    description: '考勤明细列表',
    params: [
      { key: 'Authorization', location: 'header' },
      // { key: 'current', targetKey: 'pageNo', cn: '页码' },
      // { key: 'pageSize', cn: '每页条数' },
      { key: 'subcontractorId', cn: '分包单位ID' },
      { key: 'workTypeId', cn: '劳务工种ID' },
      { key: 'groupId', cn: '班组ID' },
      {
        key: 'yearAndMonth',
        cn: '年月',
      },
      {
        key: 'username',
        cn: '人员名称',
      },
    ],
  },
  {
    key: 'attendanceRecordList',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getAttendanceRecordsPage`,
    type: 'GET',
    description: '考勤记录列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'current', targetKey: 'pageNo', cn: '页码' },
      { key: 'pageSize', cn: '每页条数' },
      { key: 'subcontractorId', cn: '分包单位ID' },
      { key: 'workTypeId', cn: '劳务工种ID' },
      { key: 'groupId', cn: '班组ID' },
      {
        key: 'beginTime',
        cn: '开始时间',
      },
      {
        key: 'endTime',
        cn: '结束时间',
      },
      {
        key: 'username',
        cn: '姓名',
      },
    ],
  },
];
export default attendance;
