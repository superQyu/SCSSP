import { Navigate, useNavigate } from 'react-router-dom';
import { setMenuTab } from 'store';
import { TOKEN, getToken, setToken, filterRoutes } from 'utils';
import { useAppDispatch, useAppSelector } from './index';

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
  } = useAppSelector((state) => state) as { common: { menuTab: any } };

  // 路由跳转, 并添加tab
  const tabNavigate = (props: TabProps) => {
    const { namePath, routePath } = props;

    const nameArr = namePath.split('/');
    const breadcrumbs = nameArr.map((pathName: string) => {
      return {
        title: pathName,
      };
    });
    const newMenuTab = {
      label: nameArr.reverse()?.[0],
      path: routePath,
      key: routePath,
      breadcrumbs,
    };
    setToken('BREADCRUMBS', JSON.stringify(newMenuTab));
    // 当前已存在的路由 tab

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

  return { tabNavigate, deleteTab };
};
