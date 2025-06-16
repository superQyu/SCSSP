import { useState } from 'react';
import { Card, Radio } from 'antd';
import styled from 'styled-components';

import SummaryData from './SummaryData';
import AttendanceAnalysis from './AttendanceAnalysis';
import RealData from './RealData';
import CertificateWarn from './CertificateWarn';
import SpecialWork from './SpecialWork';
import SafetySupervisor from './SafetySupervisor';

const CustomSDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(
      0,
      1fr
    );
  grid-template-rows: minmax(0, 1fr) minmax(0, 2fr);
  gap: 20px;
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
  gridRow: '1 / 3',
  gridColumn: '2 / 2',
  '>.ant-card-body': {
    flex: 1,
    height: 0,
    padding: '0',
    overflowY: 'hidden',
    display: 'grid',
    gridTemplateRows: 'minmax(0, 1fr) minmax(0, 2fr)',
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
    <>
      <CustomSDiv>
        <CustomCard>
          <SummaryData />
        </CustomCard>
        <CustomCard3>
          <CustomCard2
            title={<CustomTitle>现场考核分析</CustomTitle>}
          >
            <AttendanceAnalysis />
          </CustomCard2>
          <CustomCard2
            title={<CustomTitle>现场特殊工种统计</CustomTitle>}
          >
            <SpecialWork />
          </CustomCard2>
        </CustomCard3>

        <CustomCard
          title={<CustomTitle>安全员出勤统计</CustomTitle>}
        >
          <SafetySupervisor />
        </CustomCard>
        <CustomCard title={<CustomTitle>实时动态</CustomTitle>}>
          <RealData />
        </CustomCard>
        <CustomCard
          title={<CustomTitle>证书到期预警</CustomTitle>}
        >
          <CertificateWarn />
        </CustomCard>
      </CustomSDiv>
    </>
  );
};
