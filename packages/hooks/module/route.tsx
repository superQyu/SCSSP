import { Navigate, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { setMenuTab } from 'store';
import { getToken, setToken, filter, flattenArray } from 'utils';
import { useAppDispatch, useAppSelector } from './index';
import { getMenuData } from '@ant-design/pro-components';

interface MenuTabItem {
  label: string;
  path: string;
}
interface TabProps {
  /** 中文路径
   * 示例: 项目人员管理/工种管理
   */
  namePath: string;
  /** 配置的路由路径
   * 示例: /PM/JM
   */
  routePath: string;
  /** state 传参 */
  state?: Record<string, any>;
}

export default () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const {
    common: { menuTab },
  } = useAppSelector((state) => state) as { common: { menuTab: any[] } };
  const {
    user: { menu },
  } = useAppSelector((state) => state) as { user: { menu: any; userInfor: object } };

  /**
   * 路由跳转, 并添加tab
   * namePath: 中文路径, 设置 面包屑导航 和 tab
   * 如果设置 namePath, 则按照设置的 namePath 生成
   * 如果不设置 namePath, 则按照路由的路径结构自动生成
   * routePath: 需要跳转的路由路径
   * @param props
   */
  const tabNavigate = (props: TabProps) => {
    const { namePath, routePath } = props;

    let nameArr: string[] = [];
    let breadcrumbs;
    if (namePath) {
      nameArr = namePath.split('/');
      breadcrumbs = nameArr.map((pathName: string) => {
        return {
          title: pathName,
        };
      });
    } else {
      alert('当前路由不存在');
      return;
      // nameArr = [''];
      // breadcrumbs = nameArr.map((pathName: string) => {
      //   return {
      //     title: pathName,
      //   };
      // });
    }

    const newMenuTab = {
      label: nameArr.reverse()?.[0],
      path: routePath,
      key: routePath,
      breadcrumbs,
    };
    setToken('BREADCRUMBS', JSON.stringify(newMenuTab));

    if (!menuTab.some((el: MenuTabItem) => el.label == newMenuTab.label)) {
      dispatch(setMenuTab([...menuTab, newMenuTab]));
    }

    routePath && navigator(routePath, { state: props.state });
  };

  /**
   * 删除tab, 并跳转路由至最右侧路由
   * @param label 需要删除的 tab 的中文名
   * @param toRight 是否跳转至最右侧路由
   */
  const deleteTab = (label: string, toRight: boolean) => {
    // console.log('menuTab', menuTab, label);
    const list = menuTab.filter((item: MenuTabItem) => item.label != label);
    // console.log('list', list);
    dispatch(setMenuTab(list));
    if (toRight) {
      setToken('BREADCRUMBS', JSON.stringify(list));
      const routePath = list.at(-1)?.path;
      routePath && navigator(routePath);
    }
  };

  /**
   * 根据路由路径获取路由的中文结构
   * @param routePath 需要查找的路由路径
   */
  const getRouteName = (routePath: string) => {
    // console.log('菜单列表', menu);
    const { breadcrumbMap } = getMenuData(menu);
    // console.log('有完整路径的菜单列表', breadcrumbMap);
    const routeObj = breadcrumbMap.get(routePath)?.locale as string;
    const name = routeObj?.split('.')?.slice(1)?.join('/');
    // 筛选出所传路由的层级结构
    // const list = filter(menuData, (node) => node.path == routePath);
    // // console.log('所查询路由的层级结构', list);
    // // 展开层级结构
    // const newList = flattenArray(list);
    // // console.log('展开后的层级结构', newList);
    // const name = newList[0]?.locale?.split('.')?.slice(1)?.join('/');
    // // console.log('路由完整的名字', name);
    return name;
  };

  return { tabNavigate, deleteTab, getRouteName };
};
