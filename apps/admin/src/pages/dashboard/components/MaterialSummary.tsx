import React from 'react';
import { Avatar, Card } from 'antd';
import styled from 'styled-components';

const { Meta } = Card;
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

const App: React.FC = () => {
  const columns = [
    {
      label: '总计划数',
      color: '#FC8220',
    },
    {
      label: '实到数',
      color: '#6C7AF9',
    },
    {
      label: '已验收',
      color: '#15D087',
    },
    {
      label: '未验收',
      color: '#EE5B85',
    },
  ];
  return (
    <CustomSDiv>
      {columns.map((item) => {
        return (
          <Meta
            title={<div className="value">2222</div>}
            description={
              <div className="label">
                <div className="icon" style={{background: item.color}}></div>
                {item.label}
              </div>
            }
          />
        );
      })}
    </CustomSDiv>
  );
};
export default App;
