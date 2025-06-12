import { NavBar, Space, Toast, TabBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'


import { Outlet } from 'react-router-dom';
// // import { CloseOutline, MoreOutline, SearchOutline } from 'antd-mobile-icons'
// // import { DemoBlock } from 'demos'
import React, { useState } from 'react'
import styled from 'styled-components';
// import './demo1.less'
const PhoneBox = styled.div`
  .navbar-box {
    position: fixed;
    top: 0;
    // height: 70px;
    left: 0;
    right: 0;
    // background: #000;
  }
  .tabbar-box {
    position: fixed;
    bottom: 0;
    // height: 70px;
    left: 0;
    right: 0;
    // background: #000;
  }
  
`;
export default () => {
    // const right = (
    //     <div style={{ fontSize: 24 }}>
    //         <Space style={{ '--gap': '16px' }}>
    //             <SearchOutline />
    //             <MoreOutline />
    //         </Space>
    //     </div>
    // )
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,
            //   badge: Badge.dot,
        },
        // {
        //     key: 'todo',
        //     title: '待办',
        //     icon: <UnorderedListOutline />,
        //     badge: '5',
        // },
        // {
        //     key: 'message',
        //     title: '消息',
        //     icon: (active: boolean) =>
        //         active ? <MessageFill /> : <MessageOutline />,
        //     badge: '99+',
        // },
        {
            key: 'personalCenter',
            title: '我的',
            icon: <UserOutline />,
        },
    ]

    const [activeKey, setActiveKey] = useState('todo')


    const back = () =>
        Toast.show({
            content: '点击了返回区域',
            duration: 1000,
        })

    return (
        <PhoneBox>
            <div className='navbar-box'>
                <NavBar back='返回' onBack={back}>
                    标题
                </NavBar>
            </div>

            <Outlet />

            <div className='tabbar-box'>
                <TabBar safeArea>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>


        </PhoneBox>
    )
}