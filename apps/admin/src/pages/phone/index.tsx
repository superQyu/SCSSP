import { NavBar, Toast, TabBar } from 'antd-mobile';
import {
  AppOutline,
  UserOutline,
  AddOutline,
} from 'antd-mobile-icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getToken, setToken } from 'utils';

const PhoneBox = styled.div`
  .navbar-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 999;
  }
  .content {
    overflow: auto;
    padding-block: 45px 50px;
    height: 100vh;
    background: #f8f8f8;
  }
  .tabbar-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 999;

    .create {
      position: absolute;
      top: -50%;
      left: 50%;
      width: 50px;
      height: 50px;
      color: #fff;
      transform: translateX(-50%);
      background-color: #409eff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.5);
      z-index: 99;
    }
  }
`;

const tabs = [
  {
    key: '首页',
    title: '首页',
    icon: <AppOutline />,
    router: '/phone/home',
    //   badge: Badge.dot,
  },
  {
    key: '我的',
    title: '我的',
    icon: <UserOutline />,
    router: '/phone/center',
  },
];
export default () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('首页');

  const back = () => {
    navigate(-1);
  };

  const handleTabChange = (key: string) => {
    const { router } = tabs.find((item) => item.key == key);
    navigate(router);
    setTitle(key);
  };

  useEffect(() => {
    setTitle(getToken('PHONETITLE'));
  });

  return (
    <PhoneBox>
      <div className="navbar-box">
        {title != '首页' && title != '我的' ? (
          <NavBar onBack={back}>{title}</NavBar>
        ) : (
          <NavBar back={null}>{title}</NavBar>
        )}
      </div>

      {/* 内容 */}
      <div className="content">
        <Outlet />
      </div>

      <div className="tabbar-box">
        <div
          className="create"
          onClick={() => {
            navigate('/phone/material-create');
          }}
        >
          <AddOutline fontSize={26} />
        </div>
        <TabBar
          safeArea
          activeKey={title}
          onChange={handleTabChange}
        >
          {tabs.map((item) => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </TabBar>
      </div>
    </PhoneBox>
  );
};
