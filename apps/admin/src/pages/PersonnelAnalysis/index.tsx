import { useState } from 'react';
import { Card, Radio } from 'antd';
import styled from 'styled-components';

import SummaryData from './SummaryData';
import LaborInfo from './LaborInfo';
import WorkInfo from './WorkInfo';
import AttendanceAnalysis from './AttendanceAnalysis';
import RealData from './RealData';
import FunctionAnalysis from './FunctionAnalysis';
import CertificateWarn from './CertificateWarn';
import SpecialWork from './SpecialWork';
import TotalGroup from './TotalGroup';
import TotalWork from './TotalWork';

// const CustomSDiv = styled.div`
//   display: grid;
//   grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr);
//   grid-template-rows: minmax(0, 1fr) minmax(0, 1.5fr);
//   gap: 20px;
//   padding: 20px;
//   height: 100%;
//   background: #fff;
// `;
const CustomSDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(
      0,
      1fr
    );
  grid-template-rows: repeat(5, 1fr);
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
const CustomCard1 = styled(CustomCard)(() => ({
  gridRow: '1 / 3',
}));
const CustomCard2 = styled(CustomCard)(() => ({
  gridRow: '3 / 6',
}));
const CustomCard3 = styled(CustomCard)(() => ({
  gridRow: '1 / 4',
}));
const CustomCard4 = styled(CustomCard)(() => ({
  gridRow: '4 / 6',
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
        <CustomCard1>
          <SummaryData />
        </CustomCard1>
        <CustomCard3 title={<CustomTitle>劳务信息</CustomTitle>}>
          <LaborInfo />
          <WorkInfo />
        </CustomCard3>
        <CustomCard1
          title={<CustomTitle>现场考勤分析</CustomTitle>}
          extra={
            <Radio.Group
              onChange={(e) => {
                setCurSelect(e.target.value);
              }}
              defaultValue="1"
            >
              <Radio.Button value="1">工种</Radio.Button>
              <Radio.Button value="2">班组</Radio.Button>
            </Radio.Group>
          }
        >
          {/* <AttendanceAnalysis /> */}
          {curSelect == '1' ? <TotalWork /> : <TotalGroup />}
        </CustomCard1>
        <CustomCard2 title={<CustomTitle>实时动态</CustomTitle>}>
          <RealData />
        </CustomCard2>
        {/* <CustomCard4
          title={
            <CustomTitle>建筑工人工种与持证分析</CustomTitle>
          }
        >
          <FunctionAnalysis />
        </CustomCard4> */}
        <CustomCard4
          title={<CustomTitle>现场特殊工种统计</CustomTitle>}
        >
          <SpecialWork />
        </CustomCard4>
        <CustomCard2
          title={<CustomTitle>证书到期预警</CustomTitle>}
        >
          <CertificateWarn />
        </CustomCard2>
      </CustomSDiv>
    </>
  );
};
