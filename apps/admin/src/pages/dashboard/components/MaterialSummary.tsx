import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
import styled from 'styled-components';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
const CustomSDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  gap: 10px;
  height: 100%;
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
    text-align: center;
  }
  .icon {
    margin-right: 3px;
    width: 6px;
    height: 6px;
    background: #fc8220;
    border-radius: 50%;
  }
  .value {
    font-weight: bold;
    font-size: 18px;
    color: #333333;
    text-align: center;
  }
`;
const columns = [
  {
    label: '总计划数',
    color: '#FC8220',
    key: 'thisMonthPlan',
  },
  {
    label: '实到数',
    color: '#6C7AF9',
    key: 'thisMonthReceive',
  },
  {
    label: '已验收',
    color: '#15D087',
    key: 'thisMonthAccept',
  },
  {
    label: '未验收',
    color: '#EE5B85',
    key: 'thisMonthReject',
  },
];
const App: React.FC = () => {
  const { server } = useBasicConfiguration();
  const { materialEnter: M } = server;
  const [statistic, setStatistic] = useState({
    thisMonthPlan: 0,
    thisMonthReceive: 0,
    thisMonthAccept: 0,
    thisMonthReject: 0,
  });

  const queryData = async () => {
    const res = await M.summery();
    setStatistic(res);
  };
  useEffect(() => {
    queryData();
  }, []);
  return (
    <CustomSDiv>
      {columns.map((item) => {
        return (
          <Flex
            align="center"
            vertical={true}
            justify="space-evenly"
            key={item.key}
          >
            <div className="value">{statistic?.[item.key]}</div>

            <div className="label">
              <div
                className="icon"
                style={{ background: item.color }}
              ></div>
              {item.label}
            </div>
          </Flex>
        );
      })}
    </CustomSDiv>
  );
};
export default App;
