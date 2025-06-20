import { useEffect } from 'react';
import { Image, Space } from 'antd-mobile';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import banner from '@/assets/images/phone/banner.png';
import enterUrl from '@/assets/images/phone/enter.png';
import exitUrl from '@/assets/images/phone/exit.png';
import { setToken } from 'utils';

const HomeBox = styled.div`
  .block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 200px;
    // padding-left: 40px;
    // margin: 20px;
    border-radius: 15px;
    border: 1px solid #eee;
    backgound: no-repeat center;
    backgound-size: 100% 100%;
    &.enter {
      background-image: url(${enterUrl});
    }
          &.exit {
      background-image: url(${exitUrl});
    }
  }
`;

function Home() {
  const navigate = useNavigate();
  const demoSrc =
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60';
  const demoSrc2 =
    'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80';

  const handleClick = (type: 'enter' | 'exit') => {
    if (type == 'enter') {
      navigate('/phone/material-enter');
      setToken('PHONETITLE', '物料/机械进场');
    } else {
      navigate('/phone/material-exit');
      setToken('PHONETITLE', '物料/机械出场');
    }
  };

  useEffect(() => {
    setToken('PHONETITLE', '首页');
  });
  return (
    <HomeBox>
      <Image src={banner} />
      <Image src={enterUrl} onClick={() => {
          handleClick('enter');
        }} />

      <Image src={exitUrl} />

      {/* <div
        className="block enter"
        
      >
        <div className="block-title">物料/机械进场</div>
        <div className="block-label">管理入库物料</div>
      </div>
      <div className="block exit">
        <div className="block-title">物料/机械出场</div>
        <div className="block-label">管理出库物料</div>
      </div> */}
    </HomeBox>
  );
}

export default Home;
