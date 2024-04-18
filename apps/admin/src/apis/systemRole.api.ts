import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const menus: ApiItem[] = [
    {
        key: 'roleList',
        url: `${ADMIN_API}/system/role/page`,
        type: 'GET',
        name: '角色列表',
        description: '角色列表',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'pageNo' },
            { key: 'pageSize' },
            { key: 'name' },
            { key: 'code' }
        ],
    },
    {
        key: 'createMenu',
        url: `${ADMIN_API}/system/menu/create`,
        type: 'POST',
        name: '新建菜单',
        description: '新建菜单',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'parentId', cn: '上级菜单' },
            { key: 'name', cn: '菜单名称' },
            { key: 'componentName', cn: '组件名称' },
            { key: 'component', cn: '组件地址' },
            { key: 'path', cn: '路由地址' },
            { key: 'sort', cn: '排序' },
            { key: 'status', cn: '菜单状态' },
            { key: 'icon', cn: '图标' },
            { key: 'description', cn: '菜单描述' },
            { key: 'type', cn: '菜单类型' },
            { key: 'permission', cn: '权限' },
        ],
    },
    {
        key: 'deleteMenus',
        url: `${ADMIN_API}/admin-api/system/menu/delete`,
        type: 'DELETE',
        name: '删除菜单',
        description: '删除菜单',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: '数据ID集合' },
        ],
    },
    {
        key: 'updateMenu',
        url: `${ADMIN_API}/system/menu/update`,
        type: 'PUT',
        name: '更新菜单',
        description: '更新菜单信息',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: 'ID编号' },
            { key: 'parentId', cn: '上级菜单' },
            { key: 'name', cn: '菜单名称' },
            { key: 'componentName', cn: '组件名称' },
            { key: 'component', cn: '组件地址' },
            { key: 'path', cn: '路由地址' },
            { key: 'sort', cn: '排序' },
            { key: 'status', cn: '菜单状态' },
            { key: 'icon', cn: '图标' },
            { key: 'description', cn: '菜单描述' },
            { key: 'type', cn: '菜单类型' },
            { key: 'permission', cn: '权限' },
        ],
    },
];
export default menus;
