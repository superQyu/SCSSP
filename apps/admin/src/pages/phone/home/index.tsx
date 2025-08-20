import { useEffect } from 'react';
import { Image, Space } from 'antd-mobile';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import banner from '@/assets/images/phone/banner.png';
import enterUrl from '@/assets/images/phone/enter.png';
import exitUrl from '@/assets/images/phone/exit.png';
import gateUrl from '@/assets/images/phone/gate.png';

import { setToken } from 'utils';

const HomeBox = styled.div`
  .block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    witdh: 100%;
    height: 160px;
    border-radius: 15px;
    background: no-repeat center;
    background-size: 100% 100%;
    .title {
      padding-left: 30px;
      font-weight: bold;
      font-size: 20px;
      color: #000000;
    }
    .text {
      padding-left: 40px;
      font-weight: 400;
      font-size: 16px;
      color: #666666;
    }
    &.enter {
      margin: 10px;
      background-image: url(${enterUrl});
    }
    &.exit {
      margin: 10px;
      background-image: url(${exitUrl});
    }
    &.gate {
      margin: 10px;
      background-image: url(${gateUrl});
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const handleClick = (type: 'enter' | 'exit' | 'gate') => {
    if (type == 'enter') {
      navigate('/phone/material-enter');
      // setToken('PHONETITLE', '物料/机械进场');
    } else if (type == 'exit') {
      navigate('/phone/material-exit');
      // setToken('PHONETITLE', '物料/机械出场');
    } else if (type == 'gate') {
      navigate('/phone/gate');
      // setToken('PHONETITLE', '闸机管理');
    }
  };

  useEffect(() => {
    setToken('PHONETITLE', '首页');
  });
  return (
    <HomeBox>
      <Image src={banner} />
      <div className="block enter">
        <div className="title">物料/机械进场</div>
        <div className="text">管理进库物料</div>
      </div>
      <div
        className="block exit"
        onClick={() => {
          handleClick('exit');
        }}
      >
        <div className="title">物料/机械出场</div>
        <div className="text">管理出库物料</div>
      </div>
      <div
        className="block gate"
        onClick={() => {
          handleClick('gate');
        }}
      >
        <div className="title">闸机管理</div>
        <div className="text">监管闸机状态</div>
      </div>

      {/* <div className="block gate">
        <div>闸机管理</div>
        <div>监管闸机状态</div>
      </div> */}
    </HomeBox>
  );
};

export default Home;
