import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Divider, Space, theme } from 'antd';
import {
  LoginOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { removeToken } from 'utils';

import { AuthContext, useAppDispatch } from 'hooks';
import { useRoute } from 'hooks';
import './profile.scss';

const Profile: React.FC<{ user: any; tokenKeys: any[] }> = (
  props
) => {
  const { clearTab } = useRoute();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signOut } = useContext(AuthContext);
  const { user, tokenKeys } = props || {};
  const {
    userName,
    // avatar = '../../../assets/profile.jpg',
    avatar = new URL(
      '../../../assets/profile.jpg',
      import.meta.url
    ).href,
    nickName,
  } = user.userInfor;
  const { token } = theme.useToken();

  return (
    <>
      <div className="profile-area">
        <div className="profile-inner">
          <div className="profile-infor">
            <p className="infor userName">{nickName}</p>
            <Avatar
              style={{ backgroundColor: '#efefef' }}
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              // src={<img src={avatar} alt="avatar" />}
              src={
                <img
                  src={
                    new URL(
                      '../../../assets/profile.jpg',
                      import.meta.url
                    ).href
                  }
                  alt="avatar"
                />
              }
            />
            <p className="infor nickName">{userName}</p>
            {/* <p><span>登录时间:</span>--:--</p> */}
          </div>
          <Divider />
          <div className="profile-btns-lists">
            <div className="item">
              <Space>
                <UserOutlined />
                <p>个人中心</p>
              </Space>
            </div>
            <div className="item">
              <Space>
                <QuestionCircleOutlined />
                <p>说明</p>
              </Space>
            </div>
            <div
              className="item"
              onClick={async () => {
                await signOut(dispatch);
                navigate('/');
                clearTab();
                // removeToken('BREADCRUMBS')
                tokenKeys.map((keyName) => removeToken(keyName));
              }}
            >
              <Space>
                <a title={'Sign Out'}>
                  <LoginOutlined style={{}} />
                </a>
                <Space />
                <p>退出</p>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
