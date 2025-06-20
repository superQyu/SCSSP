import { useState } from 'react';
import { Card, Radio } from 'antd';
import styled from 'styled-components';
import SingleTitle from '@/components/SingleTitle';
import Overview from './components/Overview';
import Monitor from './camera/index';
import RealAttendance from './components/RealAttendance';
import ManagementAttendance from './components/ManagementAttendance';
import SpecialWork from './components/SpecialWork';
import RealData from '@/pages/PersonnelAnalysis/RealData';
import MaterialSummary from './components/MaterialSummary';
import CertificateWarn from '@/pages/PersonnelAnalysis/CertificateWarn';

const CustomSDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.5fr) minmax(
      0,
      1.5fr
    );
  grid-template-rows: minmax(0, 1.3fr) repeat(6, minmax(0, 1fr));
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
  gridRow: '4 / 8',
  gridColumn: '2 / 3',
  '>.ant-card-body': {
    flex: 1,
    height: 0,
    padding: '0',
    overflowY: 'hidden',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
  },
  '>.ant-card-body::before': {
    display: 'none',
  },
}));

export default () => {
  const [curSelect, setCurSelect] = useState('1');
  return (
    <>
      <CustomSDiv>
        <CustomCard
          title={<SingleTitle label="项目概况" />}
          style={{ gridRow: '1 / 8', gridColumn: '1 / 2' }}
        >
          <Overview />
        </CustomCard>

        <CustomCard
          title={<SingleTitle label="实时监控" />}
          style={{ gridRow: '1 / 4', gridColumn: '2 / 3' }}
        >
          <Monitor />
        </CustomCard>
        <CustomCard3>
          <CustomCard2 title={<SingleTitle label="实时考勤" />}>
            <RealAttendance />
          </CustomCard2>
          <CustomCard2
            title={<SingleTitle label="管理人员考勤" />}
          >
            <ManagementAttendance />
          </CustomCard2>
          <CustomCard2
            style={{ gridRow: '1 / 3', gridColumn: '2 / 3' }}
            title={<SingleTitle label="实时动态" />}
          >
            <RealData />
          </CustomCard2>
        </CustomCard3>

        <CustomCard
          title={<SingleTitle label="物料汇总" />}
          style={{ gridRow: '1 / 2', gridColumn: '3 / 4' }}
        >
          <MaterialSummary />
        </CustomCard>

        <CustomCard
          title={<SingleTitle label="现场特殊工种统计" />}
          style={{ gridRow: '2 / 5', gridColumn: '3 / 4' }}
        >
          <SpecialWork />
        </CustomCard>

        <CustomCard
          title={<SingleTitle label="证书到期预警" />}
          style={{ gridRow: '5 / 8', gridColumn: '3 / 4' }}
        >
          <CertificateWarn />
        </CustomCard>
      </CustomSDiv>
    </>
  );
};
