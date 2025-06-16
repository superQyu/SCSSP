import React from 'react';
import { Avatar, Card } from 'antd';
import styled from 'styled-components';
import icon1 from '@/assets/images/dashboard/icon_1.png';
import icon2 from '@/assets/images/dashboard/icon_2.png';
import icon3 from '@/assets/images/dashboard/icon_3.png';
import icon4 from '@/assets/images/dashboard/icon_4.png';
const { Meta } = Card;
const CustomSDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 10px;
  height: 100%;
  .label {
    font-size: 14px;
    color: #8a8a8a;
  }
  .value {
    margin-top: -15px;
    font-family: DINAlternate;
    font-weight: bold;
    font-size: 30px;
    color: #3294e6;
  }
`;
const CustomCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  borderRadius: '10px',
  border: '1px solid #EEEEEE',
  '.ant-card-head': {
    borderBottom: 'none',
  },
  '.ant-card-body': {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    height: 0,
    padding: '10px 20px',
    overflowY: 'hidden',
    '.ant-card-meta-avatar': {
      display: 'flex',
      alignItems: 'center',
      paddingRight: '5px',
    },
  },
}));

const App: React.FC = () => {
  const columns = [
    {
      label: '总人数',
      icon: icon1,
      color: '#3294E6',
    },
    {
      label: '当前在场人数',
      icon: icon2,
      color: '#31B182',
    },
    {
      label: '今日出勤人数',
      icon: icon3,
      color: '#6C7AF9',
    },
    {
      label: '占总人数比例',
      icon: icon4,
      color: '#FF4676',
      unit:'%'
    },
  ];
  return (
    <CustomSDiv>
      {columns.map((item) => {
        return (
          <CustomCard>
            <Meta
              avatar={<Avatar src={item.icon} size={40} />}
              title={<div className="label">{item.label}</div>}
              description={
                <div
                  className="value"
                  style={{ color: item.color }}
                >
                  2222{item?.unit}
                </div>
              }
            />
          </CustomCard>
        );
      })}
    </CustomSDiv>
  );
};
export default App;
