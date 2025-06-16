import { useState } from 'react';
import { Card, Radio } from 'antd';
import styled from 'styled-components';

import Overview from './components/Overview';
import TimeAnalysist from './components/TimeAnalysist';
import MaterialStatistics from './components/MaterialStatistics';

const CustomSDiv = styled.div`
  padding: 20px 17px;
  height: 100%;
  background: #eaf0f6;
`;
const CustomCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  boxShadow: '0px 4px 13px 0px rgba(0,0,0,0.07)',
  borderRadius: '10px',
  border: '1px solid #EEEEEE',
  '.ant-card-head': {
    borderBottom: 'none',
  },
  '.ant-card-body': {
    flex: 1,
    height: 0,
    padding: '10px 20px',
    overflowY: 'hidden',
  },
}));

const CustomCard2 = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  borderRadius: '20px',
  flexDirection: 'column',
  border: 'none',
  '.ant-card-head': {
    borderBottom: 'none',
  },
  '.ant-card-body': {
    flex: 1,
    height: 0,
    padding: '10px 20px',
    overflowY: 'hidden',
  },
}));

const CustomCard3 = styled(CustomCard)(() => ({
  '>.ant-card-body': {
    flex: 1,
    height: 0,
    padding: '0',
    overflowY: 'hidden',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridTemplateRows:
      'minmax(0, 1fr) minmax(0, 1.5fr)  minmax(0, 1.5fr)',
  },
  '>.ant-card-body::before': {
    display: 'none',
  },
}));

const CustomTitle = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 17px;
    margin-right: 6px;
    background: #3662ec;
    border-radius: 4px;
  }
`;

export default () => {
  const [curSelect, setCurSelect] = useState('1');
  return (
    <CustomSDiv>
      <CustomCard3>
        <CustomCard2 title={<CustomTitle>总览</CustomTitle>}>
          <Overview />
        </CustomCard2>
        <CustomCard2
          title={<CustomTitle>时段分析</CustomTitle>}
        >
          <TimeAnalysist />
        </CustomCard2>
        <CustomCard2 title={<CustomTitle>物料统计</CustomTitle>}>
          <MaterialStatistics />
        </CustomCard2>
      </CustomCard3>
    </CustomSDiv>
  );
};
