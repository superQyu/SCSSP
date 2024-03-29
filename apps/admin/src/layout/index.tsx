import { Navigate, useNavigate } from 'react-router-dom';

import { TOKEN, getToken } from 'utils';
import { Layout } from 'components';
import InitSettings from '@/utils/InitSettings';
import LayoutConfig from '@/config/LayoutConfig';
// 左上角logo
import myImage from '@/assets/logo/64-64.png'; // 导入图片

// 验证权限
const Permissions = ({ children }: any) => {
  return getToken(TOKEN) ? <InitSettings>{children}</InitSettings> : <Navigate to="/login" />;
};
const LayoutContext: React.FC = () => {
  const navigator = useNavigate();

  return (
    <Permissions>
      <Layout
        {...{
          ...LayoutConfig(),
          onMenuHeaderClick: (e: React.MouseEvent<HTMLDivElement>) => {
            navigator('/');
          },
          logo: myImage,
          // route: [],
          // menuDataRender: (e) => {
          //   console.log(e);
          //   return [e[e.length-1]];
          // },
          // menuRender:(e)=>{
          //   console.log(e);
          //   return e;
          // }
          // menuFooterRender: (props) => {
          //   console.log(props);
          // },
        }}
      />
    </Permissions>
  );
};

export default LayoutContext;
