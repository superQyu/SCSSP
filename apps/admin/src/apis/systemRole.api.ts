import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const menus: ApiItem[] = [
    {
        key: 'createRole',
        url: `${ADMIN_API}/system/role/create`,
        type: 'POST',
        name: '创建角色',
        description: '创建角色',
        params: [{ key: 'Authorization', location: 'header' }, { key: 'name' },
        { key: 'code' }, { key: 'sort' }, { key: 'status' }, { key: 'type' }, { key: 'remark' }],
    },
    {
        key: 'roleList',
        url: `${ADMIN_API}/system/role/page`,
        type: 'GET',
        name: '角色列表',
        description: '角色列表',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'pageNo' }, { key: 'pageSize' },
            { key: 'name' }, { key: 'code' }, { key: 'status' }
        ],
    },
    {
        key: 'deleteRole',
        url: `${ADMIN_API}/system/role/delete`,
        type: 'DELETE',
        name: '删除菜单',
        description: '删除菜单',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: '数据ID集' },
        ],
    },
    {
        key: 'listRoleMenus',
        url: `${ADMIN_API}/system/permission/list-role-menus`,
        type: 'GET',
        name: '角色菜单',
        description: '获取roleId的角色的菜单',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'roleId' },
        ],
    },
    {
        key: 'deptSimpleList',
        url: `${ADMIN_API}/system/dept/simple-list`,
        type: 'GET',
        name: '部门列表',
        description: '获取部门列表',
        params: [
            { key: 'Authorization', location: 'header' }
        ],
    }, {
        key: 'assignRoleMenu',
        url: `${ADMIN_API}/system/permission/assign-role-menu`,
        type: 'POST',
        name: '数据权限',
        description: '修改角色的数据权限',
        params: [{ key: 'Authorization', location: 'header' }, { key: 'roleId' }, { key: 'menuIds' }],
    },
    {
        key: 'assignRoleData',
        url: `${ADMIN_API}/system/permission/assign-role-data-scope`,
        type: 'POST',
        name: '数据权限',
        description: '修改角色的数据权限',
        params: [{ key: 'Authorization', location: 'header' }, { key: 'roleId' }, { key: 'dataScope' }, { key: 'dataScopeDeptIds' }],
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
        key: 'updateRole',
        url: `${ADMIN_API}/system/role/update`,
        type: 'PUT',
        name: '更新角色',
        description: '更新角色信息',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: 'ID编号' },
            { key: 'name', cn: '角色名称' },
            { key: 'code', cn: '角色标识' },
            { key: 'sort', cn: '排序' },
            { key: 'status', cn: '角色状态' },
            { key: 'type', cn: '角色类型' },
            { key: 'remark', cn: '备注' },
            { key: 'dataScope', cn: '权限范围' },
            { key: 'dataScopeDeptIds', cn: '权限具体范围' }
        ],
    },
];
export default menus;
