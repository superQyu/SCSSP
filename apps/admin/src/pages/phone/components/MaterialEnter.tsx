
import { Image, Space } from 'antd-mobile';
import styled from 'styled-components';

const HomeBox = styled.div`

  .block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height:200px;
    padding-left: 40px;
    margin:20px;
    border-radius: 15px;
    border: 1px solid #eee;
  }
  


  
`;

function Home() {
    const demoSrc =
        'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
    const demoSrc2 =
        'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80'

    return (<HomeBox>
打豆豆
    </HomeBox>)
}

export default Home;
