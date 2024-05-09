import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const menus: ApiItem[] = [
    {
        key: 'projectUnityList',
        url: `${ADMIN_API}/wisdom/project-unity/page`,
        type: 'GET',
        description: '项目管理',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'current', targetKey: 'pageNo' }, { key: 'pageSize' }, { key: 'name' }
        ],
    },
];
export default menus;
