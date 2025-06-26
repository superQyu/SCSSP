import { useEffect, useState, useContext } from 'react';
import { List, Image, Space, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { setToken, removeToken } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { AuthContext, useAppDispatch } from 'hooks';

export default () => {
  const { server } = useBasicConfiguration();
  // const { systemRole: SR } = server;
  const { user, tokenKeys } = useAppSelector((state) => state);
  const { userInfor } = user;
  const [roleObj, setRoleObj] = useState({});
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

//   const queryRoles = async () => {
//     const { list } = await SR.roleList();
//     const obj = Object.fromEntries(
//       list.map((item: any) => [item.code, item.name])
//     );
//     obj['super_admin'] = '管理员';
//     setRoleObj(obj);
//   };
// console.log('userInfor',userInfor);
//   useEffect(() => {
//     queryRoles();
//   }, []);

  useEffect(() => {
    setToken('PHONETITLE', '我的');
  });
  return (
    <div className="pos-relative h-full">
      <List>
        <List.Item
          prefix={
            <Image
              src={
                new URL(
                  '@/assets/avatar/profile.jpg',
                  import.meta.url
                ).href
              }
              style={{ borderRadius: 20 }}
              fit="cover"
              width={40}
              height={40}
            />
          }
          // description={
          //   <Space>
          //     {userInfor?.roles?.map((item: string) => {
          //       return <div key={item}>{roleObj?.[item]}</div>;
          //     })}
          //   </Space>
          // }
        >
          {userInfor?.nickName}
        </List.Item>
      </List>
      <List className="mt-10px">
        <List.Item
          onClick={async () => {
            await signOut(dispatch);
            navigate('/');

            tokenKeys.map((keyName) => removeToken(keyName));
          }}
        >
          <div className="" style={{ textAlign: 'center' }}>
            退出登录
          </div>
        </List.Item>
      </List>
    </div>
  );
};
