import { useEffect } from 'react';
import { List, Switch, Image } from 'antd-mobile';
import {
  UnorderedListOutline,
  PayCircleOutline,
  SetOutline,
} from 'antd-mobile-icons';
import { useAppSelector } from 'hooks';
import { getToken, setToken } from 'utils';
export default () => {
  //   const { user } = useAppSelector((state) => state);
  //   useEffect(() => {
  //     console.log('user', user.nickName);
  //     // setBaseInfor({
  //     //   avatar: userInfor.avatar,
  //     //   userName: userInfor.nickName,
  //     //   logo: siteInfor.ico,
  //     //   siteName: siteInfor.name,
  //     // });
  //     // if (siteInfor.ico && siteInfor.ico != '')
  //     //   setShouldRender(true);
  //     // setLoading(false);
  //   }, [user]);
  const item = {
    avatar:
      'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'admin',
    description: '管理员',
  };

  useEffect(() => {
    setToken('PHONETITLE', '我的');
  });
  return (
    <>
      <List>
        <List.Item
          prefix={
            <Image
              src={item.avatar}
              style={{ borderRadius: 20 }}
              fit="cover"
              width={40}
              height={40}
            />
          }
          description={item.description}
        >
          {item.name}
        </List.Item>
      </List>
    </>
  );
};
