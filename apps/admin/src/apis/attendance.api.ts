import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const attendance: ApiItem[] = [
  {
    key: 'attendanceCount',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getAttendanceCount`,
    type: 'GET',
    description: '现场统计(劳务信息)',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'attendanceCountWithSpecialWorkType',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getAttendanceSpecialWorkTypeCount`,
    type: 'GET',
    description: '现场统计(现场特殊工种统计)',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'attendanceCountWithTotalWorkType',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getPresentWorkTypeCount`,
    type: 'GET',
    description: '现场统计获取在场工种及对应人数',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'attendanceCountWithTotalGroup',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getPresentGroupCount`,
    type: 'GET',
    description: '现场统计(全场班组人数)',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'attendanceList',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getAttendanceSummaryPage`,
    type: 'GET',
    description: '考勤汇总列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'current', targetKey: 'pageNo', cn: '页码' },
      { key: 'pageSize', cn: '每页条数' },
      { key: 'subcontractorId', cn: '单位ID' },
      { key: 'workTypeId', cn: '劳务工种ID' },
      { key: 'groupId', cn: '班组ID' },
      { key: 'yearAndMonth', cn: '年月' },
      // {
      //   key: 'beginTime',
      //   cn: '开始时间',
      // },
      // {
      //   key: 'endTime',
      //   cn: '结束时间',
      // },
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
      { key: 'subcontractorId', cn: '单位ID' },
      { key: 'workTypeId', cn: '劳务工种ID' },
      { key: 'jobCategoryId', cn: '管理员ID' },
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
      { key: 'subcontractorId', cn: '单位ID' },
      { key: 'workTypeId', cn: '劳务工种ID' },
      { key: 'groupId', cn: '班组ID' },
      { key: 'username', cn: '姓名' },
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
      {
        key: 'userId',
        cn: '姓名',
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
      { key: 'subcontractorId', cn: '单位ID' },
      { key: 'workTypeId', cn: '劳务工种ID' },
      { key: 'groupId', cn: '班组ID' },
      { key: 'username', cn: '姓名' },
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
      {
        key: 'userId',
        cn: '姓名',
      },
    ],
  },
  {
    key: 'getAttendanceCount',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getAttendanceCount`,
    type: 'GET',
    description: '现场统计获取在场或出勤人数',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getSafetyManagerAttendanceCount',
    url: `${ADMIN_API}/wisdom/personnel-attendance/getSafetyManagerAttendanceCount`,
    type: 'GET',
    description: '获取安全员在场时长',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getPersonnelStatusControlList',
    url: `${ADMIN_API}/wisdom/personnel-info/getPersonnelStatusControlList`,
    type: 'GET',
    description: '获取人员状态管控列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'name', cn: '姓名' },
      { key: 'status', cn: '考勤状态' },
      { key: 'pageNo', cn: '页码' },
      { key: 'pageSize', cn: '每页条数' },
    ],
  },
  {
    key: 'setBlack',
    url: `${ADMIN_API}/wisdom/dahua/setBlack`,
    type: 'GET',
    description: '将人员设为黑名单',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'userId', cn: '人员id' },
    ],
  },
  {
    key: 'cancelBlack',
    url: `${ADMIN_API}/wisdom/dahua/cancelBlack`,
    type: 'GET',
    description: '将人员移出黑名单',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'userId', cn: '人员id' },
    ],
  },
];
export default attendance;
