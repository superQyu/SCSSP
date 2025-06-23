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

const Home = () => {
  const navigate = useNavigate();
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
      <Image
        src={enterUrl}
        onClick={() => {
          handleClick('enter');
        }}
      />

      <Image
        src={exitUrl}
        onClick={() => {
          handleClick('exit');
        }}
      />
    </HomeBox>
  );
};

export default Home;
