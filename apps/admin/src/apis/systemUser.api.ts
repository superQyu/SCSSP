import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const ApiLists: ApiItem[] = [
    {
        key: 'createUser',
        url: `${ADMIN_API}/system/user/create`,
        type: 'POST',
        name: '创建用户',
        description: '创建用户',
        params: [{ key: 'Authorization', location: 'header' },
        { key: 'id', cn: 'ID编号' }, { key: 'username' },
        { key: 'nickname' }, { key: 'remark' }, { key: 'deptId' },
        { key: 'deptName' }, { key: 'postIds' }, { key: 'email' },
        { key: 'mobile' }, { key: 'sex' }, { key: 'avatar' },
        { key: 'status' }, { key: 'password' }],
    },
    {
        key: 'userList',
        url: `${ADMIN_API}/system/user/page`,
        type: 'GET',
        name: '用户列表',
        description: '获取用户列表',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'pageNo' }, { key: 'pageSize' },
            { key: 'deptId' }, { key: "username" },
            { key: 'mobile' }, { key: 'status' }
        ],
    },
    {
        key: 'getSimpleUserList',
        url: `${ADMIN_API}/system/user/simple-list`,
        type: 'GET',
        name: '用户列表',
        description: '获取用户精简信息列表',
        params: [
            { key: 'Authorization', location: 'header' },
        ],
    },
    {
        key: 'deleteUser',
        url: `${ADMIN_API}/system/user/delete`,
        type: 'DELETE',
        name: '删除用户',
        description: '删除用户',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: '数据ID集' },
        ],
    },
    {
        key: 'updateUser',
        url: `${ADMIN_API}/system/user/update`,
        type: 'PUT',
        name: '更新用户',
        description: '更新用户信息',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id', cn: 'ID编号' }, { key: 'username' },
            { key: 'nickname' }, { key: 'remark' }, { key: 'deptId' },
            { key: 'deptName' }, { key: 'postIds' }, { key: 'email' },
            { key: 'mobile' }, { key: 'sex' }, { key: 'avatar' },
            { key: 'status' }, { key: 'loginIp' }, { key: 'loginDate' },
            { key: 'createTime' }
        ],
    },
    {
        key: 'updateUserPassword',
        url: `${ADMIN_API}/system/user/update-password`,
        type: 'PUT',
        name: '修改密码',
        description: '修改用户密码',
        params: [
            { key: 'Authorization', location: 'header' },
            { key: 'id' }, { key: 'password' }
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
        name: '菜单权限',
        description: '修改角色的菜单权限',
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
];
export default ApiLists;
