import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  Flex,
  Tag,
} from 'antd';
import styled from 'styled-components';

import SingleTitle from '@/components/SingleTitle';
import RemoveRestriction from './RemoveRestriction';

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
  const informationLossRate = 0;
  const columns = [
    {
      label: '按月',
      children: [
        {
          label: '工人总工时',
          value: 0,
        },
        {
          label: '管理人员总工时',
          value: 0,
        },
        {
          label: '安全人员总工时',
          value: 0,
        },
      ],
    },
    {
      label: '按年',
      children: [
        {
          label: '工人总工时',
          value: 0,
        },
        {
          label: '管理人员总工时',
          value: 0,
        },
        {
          label: '安全人员总工时',
          value: 0,
        },
      ],
    },
  ];
  return (
    <>
      <Row className="h-full" gutter={20}>
        <Col span={5} className="h-full">
          <CustomCard className="h-full">
            <Flex justify="space-between">
              <Flex vertical={true} justify="space-between">
                <Statistic
                  title={
                    <div className="color-#999 font-400 font-size-16px">
                      信息缺失人员占比
                    </div>
                  }
                  value={informationLossRate}
                  suffix="%"
                  style={{ fontSize: 24, fontWeight: 'bold' }}
                />
                <div className="color-#999 font-400 font-size-16px">
                  特殊工种占：0%
                </div>
              </Flex>
              <Progress
                type="circle"
                size={90}
                percent={75}
                strokeWidth={12}
                strokeColor="#E5667E"
                trailColor="#EAEAEA"
              />
            </Flex>
          </CustomCard>
        </Col>
        {columns.map((el, i) => {
          return (
            <Col span={6} key={`col${i}`} className="h-full">
              <CustomCard className="h-full">
                <Tag
                  color="#4C9EF9"
                  className="px-10px py-1px"
                  style={{ borderRadius: 20 }}
                >
                  {el.label}
                </Tag>
                <Row gutter={16} className="mt-20px">
                  {el.children.map((item, j) => {
                    return (
                      <Col span={8} key={j}>
                        <Statistic
                          title={item.label}
                          value={item.value}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </CustomCard>
            </Col>
          );
        })}
        <Col span={7} className="h-full">
          <CustomCard
            className="h-full"
            title={<SingleTitle label="解除限制人数" />}
          >
            <RemoveRestriction />
          </CustomCard>
        </Col>
      </Row>
    </>
  );
};
