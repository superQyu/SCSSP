import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const ApiLists: ApiItem[] = [
    {
        key: 'createTenant',
        url: `${ADMIN_API}/system/tenant/create`,
        type: 'POST',
        name: '创建租户',
        description: '创建租户',
        params: [{ key: 'Authorization', location: 'header' },
        { key: 'name' }, { key: 'packageId' }, { key: 'contactName' },
        { key: 'contactMobile' }, { key: 'username' }, { key: 'password' },
        { key: 'accountCount' }, { key: 'expireTime' },
        { key: 'website' }, { key: 'status' },
        ],
    },
    {
        key: 'tenantList',
        url: `${ADMIN_API}/system/tenant/page`,
        type: 'GET',
        name: '租户列表',
        description: '获取租户列表',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'pageNo' }, { key: 'pageSize' }, { key: 'name' },
            { key: 'contactName' }, { key: 'contactMobile' }, { key: 'status' }
        ],
    },
    {
        key: 'tenantPackageList',
        url: `${ADMIN_API}/system/tenant-package/simple-list`,
        type: 'GET',
        name: '租户套餐',
        description: '获取租户套餐列表',
        params: [
            { key: 'Authorization', location: 'header' }
        ],
    },
    {
        key: 'deleteTenant',
        url: `${ADMIN_API}/system/tenant/delete`,
        type: 'DELETE',
        name: '删除租户',
        description: '删除租户',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: '数据ID集' },
        ],
    },
    {
        key: 'updateTenant',
        url: `${ADMIN_API}/system/tenant/update`,
        type: 'PUT',
        name: '更新租户',
        description: '更新租户信息',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: 'ID编号' },
            { key: 'name' }, { key: 'packageId' }, { key: 'contactName' },
            { key: 'contactMobile' }, { key: 'username' }, { key: 'password' },
            { key: 'accountCount' }, { key: 'expireTime' },
            { key: 'website' }, { key: 'status' },
        ],
    },
    {
        key: 'createTenanpackage',
        url: `${ADMIN_API}/system/tenant-package/create`,
        type: 'POST',
        name: '创建套餐',
        description: '创建套餐',
        params: [{ key: 'Authorization', location: 'header' },
        { key: 'name' }, { key: 'menuIds' }, { key: 'remark' }, { key: 'status' },
        ],
    },
    {
        key: 'tenanpackageList',
        url: `${ADMIN_API}/system/tenant-package/page`,
        type: 'GET',
        name: '套餐列表',
        description: '获取套餐列表',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'pageNo' }, { key: 'pageSize' }, { key: 'name' },
            { key: 'createTime' }
        ],
    },
    {
        key: 'updateTenanpackage',
        url: `${ADMIN_API}/system/tenant-package/update`,
        type: 'PUT',
        name: '创建套餐',
        description: '创建套餐',
        params: [{ key: 'Authorization', location: 'header' },
        { key: 'id' },
        { key: 'name' }, { key: 'menuIds' }, { key: 'remark' }, { key: 'status' },
        ],
    },
    {
        key: 'deleteTenanpackage',
        url: `${ADMIN_API}/system/tenant-package/delete`,
        type: 'DELETE',
        name: '删除套餐',
        description: '删除套餐',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: '数据ID集' },
        ],
    },
];
export default ApiLists;
