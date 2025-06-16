import React from 'react';
import { Statistic, Row, Col, Flex, Progress } from 'antd';
import styled from 'styled-components';
import bg1 from '@/assets/images/materialAnalysis/bg_1.png';
import bg2 from '@/assets/images/materialAnalysis/bg_2.png';
import bg3 from '@/assets/images/materialAnalysis/bg_3.png';
import up from '@/assets/images/materialAnalysis/up.png';
import down from '@/assets/images/materialAnalysis/down.png';
const CustomSDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  gap: 15px;
  height: 100%;
  .block-box {
    padding: 10px 20px;
    border-radius: 10px;
    background-repeat: no-repeat, no-repeat;
    background-position: right 20px bottom 10px, center;
    .ant-statistic-title {
      font-size: 16px;
      color: #333333;
    }
    .ant-statistic-content-value-int {
      font-family: DINAlternate;
      font-weight: bold;
      font-size: 36px;
      color: #333333;
    }

    &:nth-child(1) {
      background-image: url(${bg1}),
        linear-gradient(150deg, #f2f9fe, #e7f5fe);
    }
    &:nth-child(2) {
      background-image: url(${bg2}),
        linear-gradient(150deg, #f3fef1, #e7feee);
    }
    &:nth-child(3) {
      background-image: url(${bg3}),
        linear-gradient(150deg, #fefaf1, #fef2e7);
    }
    &:nth-child(4) {
      background-image: linear-gradient(
        150deg,
        #f5f5ff,
        #ededff
      );
    }
    .up {
      padding-inline: 14px;
      background: url(${up}) no-repeat right center;
    }

    .down {
      padding-inline: 14px;
      background: url(${down}) no-repeat right center;
    }
  }
`;

const App: React.FC = () => {
  const value = 20;
  return (
    <CustomSDiv>
      <div className="block-box">
        <Statistic title="总计划数" value={112893} />
        <Flex align="center">
          <div>较上月</div>
          <div className={value > 0 ? 'up' : 'down'}>
            {value}
          </div>
        </Flex>
      </div>
      <div className="block-box">
        <Statistic title="实到数" value={112893} />
        <Flex align="center">
          <div>较昨天</div>
          <div className={value > 0 ? 'up' : 'down'}>
            {value}
          </div>
        </Flex>
      </div>
      <div className="block-box">
        <Statistic title="已验收" value={112893} />
        <Flex align="center">
          <div>较昨天</div>
          <div className={value > 0 ? 'up' : 'down'}>
            {value}
          </div>
        </Flex>
      </div>
      <Row className="block-box">
        <Col span={12}>
          <Statistic title="未验收" value={112893} />
          <Flex align="center">
            <div>较昨天</div>
            <div className={value > 0 ? 'up' : 'down'}>
              {value}
            </div>
          </Flex>
        </Col>
        <Col span={12}>
         <Flex className='h-full' justify='center' align='center'>
         <Progress
            type="circle"
            size={90}
            percent={75}
            strokeWidth={12}
            strokeColor="rgba(141, 78, 218, 1)"
            trailColor="rgba(231, 222, 255, 0.5)"
          />
         </Flex>
        </Col>
      </Row>
    </CustomSDiv>
  );
};
export default App;
