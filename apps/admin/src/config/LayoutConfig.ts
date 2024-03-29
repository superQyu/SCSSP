/**
 * 详细参数配置参考 https://procomponents.ant.design/components/layout
 */
// 预设置 layout 参数
export default () => {
  return {
    /**基础设置 */
    navTheme: 'light', // 主题 realDark | light
    colorPrimary: '#1677FF', // 主题色
    contentWidth: 'Fluid', //Fluid | Fixed; layout 的内容模式，Fluid：自适应，Fixed：定宽 1200px
    layout: 'side', //side | top | mix; layout 的菜单模式，side：右侧导航，top：顶部导航
    fixSiderbar: true, //boolean 是否固定导航
    splitMenus: false, //boolean 自动切割菜单
    siderMenuType: 'sub',
    settingDrawerShow: false, // layout 配置按钮
    /** 显示设置 */
    title: import.meta.env.VITE_APP_TITLE, //layout 的左上角的 title
    siderWidth: '', //侧边菜单宽度 默认208
    logo: null,
    waterMarkProps: '', // 水印
    // route: [],//用于生成菜单和面包屑。
    appList: [], //跨站点导航列表
    // onMenuHeaderClick: (e: React.MouseEvent<HTMLDivElement>) => {
    //   //menu 菜单的头部点击事件
    //   console.log('左上角logo 点击事件');
    // }
  };
};
