import { Card, Row, Col, Flex, Space } from 'antd';

import VennChart from '@/components/VennChart';
import WorkInfo from './WorkInfo';

import FunctionBar from './components/FunctionBar';
import TeamBar from './components/TeamBar';
import styled from 'styled-components';
import LabelLineBarChart from './components/LabelLineBarChart';

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
  },
}));

const CustomTitle = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  margin-top: 20px;
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
    <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full p-6 bg-#fff ">
      <CustomCard title={<CustomTitle>劳务信息</CustomTitle>}>
        <WorkInfo />
      </CustomCard>
      <CustomCard
        title={<CustomTitle>现场特殊工种统计</CustomTitle>}
      >
        <Row gutter={30} className="h-full  pb-10 pt-4">
          <Col span={12} className="h-full">
            <LabelLineBarChart
              title="在场人数"
              data={[
                { name: '木工', value: 72 },
                { name: '建筑电工', value: 71 },
                { name: '起重信号工', value: 47 },
                { name: '钢筋工', value: 34 },
                { name: '混凝土工', value: 68 },
                { name: '除尘工', value: 68 },
              ]}
            />
          </Col>

          <Col span={12} className="h-full">
            <LabelLineBarChart
              title="出勤人数"
              data={[
                { name: '2019', value: 72 },
                { name: '2020', value: 71 },
                { name: '2021', value: 47 },
                { name: '2022', value: 34 },
                { name: '2023', value: 68 },
              ]}
            />
          </Col>
        </Row>
      </CustomCard>

      <CustomCard title={<CustomTitle>全场工种</CustomTitle>}>
        <FunctionBar />
      </CustomCard>
      <CustomCard
        title={<CustomTitle>全场班组人数</CustomTitle>}
      >
        <TeamBar />
      </CustomCard>
    </div>
  );
};
