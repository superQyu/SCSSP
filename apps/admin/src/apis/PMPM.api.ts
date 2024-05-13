import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const menus: ApiItem[] = [
    {
        key: 'createProjectUnity',
        url: `${ADMIN_API}/wisdom/project-unity/create`,
        type: 'POST',
        name: '项目新增',
        description: '获取项目新增',
        params: [{ key: 'Authorization', location: 'header' },
        { key: "projectInfoSaveReqVO" }, { key: "projectBankInfoSaveReqVO" }, { key: "projectBidInfoSaveReqVO" },
        { key: "projectEngineeringInfoSaveReqVO" }, { key: "projectQualitySafetySaveReqVO" }, { key: "projectManagementSystemSaveReqVO" },
        { key: "projectRelatedUnitsSaveReqVO" }, { key: "projectBuildingInfoSaveReqVOList" }],
    },
    {
        key: 'updateProjectUnity',
        url: `${ADMIN_API}/wisdom/project-unity/update`,
        type: 'PUT',
        name: '项目更新',
        description: '更新项目信息',
        params: [{ key: 'Authorization', location: 'header' },
        { key: "projectInfoSaveReqVO" }, { key: "projectBankInfoSaveReqVO" }, { key: "projectBidInfoSaveReqVO" },
        { key: "projectEngineeringInfoSaveReqVO" }, { key: "projectQualitySafetySaveReqVO" }, { key: "projectManagementSystemSaveReqVO" },
        { key: "projectRelatedUnitsSaveReqVO" }, { key: "projectBuildingInfoSaveReqVOList" }],
    },
    {
        key: 'projectUnityList',
        url: `${ADMIN_API}/wisdom/project-unity/page`,
        type: 'GET',
        description: '项目管理',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'current', targetKey: 'pageNo' }, { key: 'pageSize' },
            { key: 'projectName' }, { key: 'projectStatus' }
        ],
    },
    {
        key: 'deleteProjectUnity',
        url: `${ADMIN_API}/wisdom/project-unity/delete`,
        type: 'DELETE',
        name: '删除项目',
        description: '删除项目',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: '数据ID集' },
        ],
    },
    {
        key: 'getProjectUnity',
        url: `${ADMIN_API}/wisdom/project-unity/get`,
        type: 'GET',
        description: '项目具体信息',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: '数据ID集' },
        ],
    },
];
export default menus;
