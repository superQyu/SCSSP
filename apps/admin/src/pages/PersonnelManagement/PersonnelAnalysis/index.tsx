import { Card } from 'antd';
import styled from 'styled-components';
import SingleTitle from '@/components/SingleTitle';
import Overview from './components/Overview';
import AgeDistribution from './components/AgeDistribution';
import JobType from './components/JobType';
import SpecialCertification from './components/SpecialCertification';
import RealTmeJob from './components/RealTmeJob';

const CustomSDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 2fr) minmax(
      0,
      2fr
    );
  gap: 20px;
  padding: 20px 17px;
  height: 100%;
  background: #eaf0f6;
  .ant-statistic-content-value-int {
    font-family: DINAlternate;
    font-weight: bold;
    font-size: 30px;
    color: #333333;
  }
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

export default () => {
  return (
    <>
      <CustomSDiv>
        <div style={{ gridRow: '1 / 2', gridColumn: '1 / 3' }}>
          <Overview />
        </div>

        <CustomCard title={<SingleTitle label="特殊工种人数" />}>
          <SpecialCertification />
        </CustomCard>

        <CustomCard title={<SingleTitle label="工种实时动态" />}>
          <RealTmeJob />
        </CustomCard>

        <CustomCard title={<SingleTitle label="年龄分布" />}>
          <AgeDistribution />
        </CustomCard>

        <CustomCard title={<SingleTitle label="工种配比" />}>
          {/* <JobType /> */}
        </CustomCard>
      </CustomSDiv>
    </>
  );
};
