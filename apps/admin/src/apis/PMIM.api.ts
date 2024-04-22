import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const menus: ApiItem[] = [
    {
        key: 'personnelInfoList',
        url: `${ADMIN_API}/wisdom/personnel-info/page`,
        type: 'GET',
        description: '项目人员信息管理',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'current', targetKey: 'pageNo' }, { key: 'pageSize' }, { key: 'name' }
        ],
    },
];
export default menus;
