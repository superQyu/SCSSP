import { Card } from 'antd';
import styled from 'styled-components';

import SummaryData from './SummaryData';
import LaborInfo from './LaborInfo';
import AttendanceAnalysis from './AttendanceAnalysis';
import RealData from './RealData';
import FunctionAnalysis from './FunctionAnalysis';
import CertificateWarn from './CertificateWarn';

const CustomSDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: 20px;
  padding: 20px;
  height: 100%;
  background: #fff;
`;
const CustomCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  borderRadius: '20px',
  flexDirection: 'column',
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
  return (
    <>
      <CustomSDiv>
        <CustomCard>
          <SummaryData />
        </CustomCard>
        <CustomCard title={<CustomTitle>劳务信息111</CustomTitle>}>
          <LaborInfo />
        </CustomCard>
        <CustomCard title={<CustomTitle>考勤分析</CustomTitle>}>
          <AttendanceAnalysis />
        </CustomCard>
        <CustomCard title={<CustomTitle>实时动态</CustomTitle>}>
          <RealData />
        </CustomCard>
        <CustomCard title={<CustomTitle>建筑工人工种与持证分析</CustomTitle>}>
          <FunctionAnalysis />
        </CustomCard>
        <CustomCard title={<CustomTitle>证书到期预警</CustomTitle>}>
          <CertificateWarn />
        </CustomCard>
      </CustomSDiv>
    </>
  );
};
