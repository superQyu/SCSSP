import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Flex, Progress } from 'antd';
import styled from 'styled-components';
import bg1 from '@/assets/images/materialAnalysis/bg_1.png';
import bg2 from '@/assets/images/materialAnalysis/bg_2.png';
import bg3 from '@/assets/images/materialAnalysis/bg_3.png';
import up from '@/assets/images/materialAnalysis/up.png';
import down from '@/assets/images/materialAnalysis/down.png';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

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
  const { server } = useBasicConfiguration();
  const { materialEnter: M } = server;
  const [statistic, setStatistic] = useState({
    thisMonthPlan: 0,
    todayhReceive: 0,
    todayhAccept: 0,
    todayhReject: 0,
    monthPlan: 0,
    monthReceive: 0,
    monthAccept: 0,
    monthReject: 0,
    thisMonthReject: 0,
  });

  const queryData = async () => {
    const res = await M.summery();
    res.monthPlan = res.yesterdayPlan
      ? (
          ((res.todayPlan - res.yesterdayPlan) /
            res.yesterdayPlan) *
          100
        ).toFixed(2)
      : 0;
    res.monthReceive = res.yesterdayReceive
      ? (
          ((res.todayReceive - res.yesterdayReceive) /
            res.yesterdayReceive) *
          100
        ).toFixed(2)
      : 0;
    res.monthAccept = res.yesterdayAccept
      ? (
          ((res.todayAccept - res.yesterdayAccept) /
            res.yesterdayAccept) *
          100
        ).toFixed(2)
      : 0;
    res.monthReject = res.yesterdayReject
      ? (
          ((res.todayReject - res.yesterdayReject) /
            res.yesterdayReject) *
          100
        ).toFixed(2)
      : 0;
    setStatistic(res);
  };
  useEffect(() => {
    queryData();
  }, []);
  return (
    <CustomSDiv>
      <div className="block-box">
        <Statistic
          title="本月总计划数"
          value={statistic.thisMonthPlan}
        />
        <Flex align="center">
          <div>较上月</div>
          <div
            className={
              statistic.monthPlan > 0
                ? 'up'
                : statistic.monthPlan < 0
                ? 'down'
                : 'px-14px'
            }
          >
            {statistic.monthPlan}
          </div>
        </Flex>
      </div>
      <div className="block-box">
        <Statistic
          title="今日实到数"
          value={statistic.todayReceive}
        />
        <Flex align="center">
          <div>较昨天</div>
          <div
            className={
              statistic.monthReceive > 0
                ? 'up'
                : statistic.monthReceive < 0
                ? 'down'
                : 'px-14px'
            }
          >
            {statistic.monthReceive}%
          </div>
        </Flex>
      </div>
      <div className="block-box">
        <Statistic
          title="今日已验收"
          value={statistic.todayAccept}
        />
        <Flex align="center">
          <div>较昨天</div>
          <div
            className={
              statistic.monthAccept > 0
                ? 'up'
                : statistic.monthAccept < 0
                ? 'down'
                : 'px-14px'
            }
          >
            {statistic.monthAccept}%
          </div>
        </Flex>
      </div>
      <Row className="block-box">
        <Col span={12}>
          <Statistic
            title="今日未验收"
            value={statistic.todayReject}
          />
          <Flex align="center">
            <div>较昨天</div>
            <div
              className={
                statistic.monthReject > 0
                  ? 'up'
                  : statistic.monthReject < 0
                  ? 'down'
                  : 'px-14px'
              }
            >
              {statistic.monthReject}%
            </div>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex
            className="h-full"
            justify="center"
            align="center"
          >
            <Progress
              type="circle"
              size={90}
              percent={statistic.monthReject.toFixed()}
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
