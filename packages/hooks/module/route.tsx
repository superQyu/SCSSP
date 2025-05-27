import {
  Navigate,
  useNavigate,
  useRouteLoaderData,
} from 'react-router-dom';
import { setMenuTab, setMenu } from 'store';
import { getToken, setToken, filter, flattenArray, removeToken } from 'utils';
import { useAppDispatch, useAppSelector } from './index';
import { getMenuData } from '@ant-design/pro-components';

interface MenuTabItem {
  label: string;
  path: string;
}
interface TabProps {
  /**
   * 控制 tab 文字内容
   * 如果不传, 则使用 namePath 的最后一个路径
   */
  tabName?: string;
  /** 中文路径
   * 控制 面包屑导航 和 tab 文字内容
   * 如果设置 namePath, 则按照设置的 namePath 生成(弃用)
   * 如果不设置 namePath, 则按照路由的路径结构自动生成(弃用)
   * 示例: 项目人员管理/工种管理
   */
  namePath: string;
  /** 需要跳转的路由路径
   * 示例: /PM/JM
   */
  routePath: string;
  /**
   * 需要保持激活的左侧菜单 menu
   * 如果为空, 则激活当前路由对应的菜单
   */
  activeMenu?: string;
  /** state 传参 */
  state?: Record<string, any>;
}

export default () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const {
    common: { menuTab },
  } = useAppSelector((state) => state) as {
    common: { menuTab: any[] };
  };
  const {
    user: { menu },
  } = useAppSelector((state) => state) as {
    user: { menu: any; userInfor: object };
  };

  /**
   * 路由跳转, 并添加tab
   * @param props
   */
  const tabNavigate = (props: TabProps) => {
    const { namePath, routePath, tabName } = props;

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
      label: tabName || nameArr.reverse()?.[0],
      path: routePath,
      key: routePath,
      activeMenu: props.activeMenu,
      breadcrumbs,
    };
    setToken('BREADCRUMBS', JSON.stringify(newMenuTab));

    // console.log('当前已存在的menuTab', menuTab);
    if (
      // 如果当前需要跳转的 menuTab 不存在
      // 如果完整路径没有重复, 则创建新的 tab
      !menuTab.some(
        // (el: MenuTabItem) => el.label == newMenuTab.label
        (el: MenuTabItem) => el.path == newMenuTab.path
      )
    ) {
      dispatch(setMenuTab([...menuTab, newMenuTab]));
    } else {
      // 如果完整路径是重复的, 直接激活就行
      // dispatch(setMenuTab([...menuTab]));
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
    const list = menuTab.filter(
      (item: MenuTabItem) => item.label != label
    );
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
    const routeObj = breadcrumbMap.get(routePath)
      ?.locale as string;
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

  const clearTab = () => {
    dispatch(setMenuTab([]));
    dispatch(setMenu([]));
    removeToken('BREADCRUMBS');
  }

  return { tabNavigate, deleteTab, getRouteName, clearTab };
};
