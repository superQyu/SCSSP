import { ApiItem } from '@spms/web-request';

const menus: ApiItem[] = [
  {
    key: 'createMenu',
    url: '/api/v1/menu/createMenu',
    type: 'POST',
    name: '新建菜单',
    description: '新建菜单',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'name', cn: '菜单名称' },
      { key: 'description', cn: '菜单描述' },
      { key: 'path', cn: '路由地址' },
      { key: 'filepath', cn: '组件地址' },
      { key: 'orderNum', cn: '排序' },
      { key: 'ico', cn: '图标' },
      { key: 'isDelete', cn: '菜单状态' },
      { key: 'isHidden', cn: '显示状态' },
      { key: 'parentId', cn: '上级菜单' },
      { key: 'siteKey', cn: '站点标识' },
    ],
  },
  {
    key: 'deleteMenus',
    url: '/api/v1/menu/deleteMenus',
    type: 'DELETE',
    name: '删除菜单',
    description: '删除菜单',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'ids', cn: '数据ID集合' },
    ],
  },
  {
    key: 'updateMenu',
    url: '/api/v1/menu/updateMenu',
    type: 'PUT',
    name: '更新菜单',
    description: '更新菜单信息',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: 'ID编号' },
      { key: 'name', cn: '菜单名称' },
      { key: 'description', cn: '菜单描述' },
      { key: 'path', cn: '路由地址' },
      { key: 'filepath', cn: '组件地址' },
      { key: 'orderNum', cn: '排序' },
      { key: 'isDelete', cn: '菜单状态' },
      { key: 'isHidden', cn: '显示状态' },
      { key: 'ico', cn: '图标' },
      { key: 'parentId', cn: '上级菜单' },
      { key: 'siteKey', cn: '站点标识' },
    ],
  },
  {
    key: 'verSiteKey',
    url: '/api/v1/site/verSiteKey',
    type: 'GET',
    name: '验证标识',
    description: '验证标识是否唯一',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'siteKey', cn: '站点标识' },
    ],
  },
];
export default menus;
