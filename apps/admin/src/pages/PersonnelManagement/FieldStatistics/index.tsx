import { Card } from 'antd';

import styled from 'styled-components';

import WorkInfo from './WorkInfo';
import SpecialWork from './SpecialWork';
import TotalWork from './TotalWork';
import TotalGroup from './TotalGroup';

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
        <SpecialWork />
      </CustomCard>
      <CustomCard title={<CustomTitle>全场工种</CustomTitle>}>
        <TotalWork />
      </CustomCard>
      <CustomCard
        title={<CustomTitle>全场班组人数</CustomTitle>}
      >
        <TotalGroup />
      </CustomCard>
    </div>
  );
};
