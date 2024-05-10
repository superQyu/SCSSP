export declare namespace ModesApi {
  type ParamsType = {
    pageNo?: number;
    pageSize?: number;
    subcontractorId?: number;
    workTypeId?: number;
    groupId?: number;
    beginTime?: string;
    endTime?: string;
  };

  type ResultType = {
    subcontractorId?: string;
    workTypeId?: string;
    groupId?: string;
    teamId?: string;
    time?: string;
    workerMembers?: string;
    attendanceNumbers?: string;
    attendanceHours?: string;
  };
}
