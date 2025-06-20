import React from 'react';
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

// 可根据需要自定义样式，这里简单示例
const CustomCard = styled(Card)`
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  boxShadow: '0px 4px 13px 0px rgba(0,0,0,0.07)',
  borderRadius: '10px',
  border: '1px solid #EEEEEE',
  '.ant-card-head': {
    display: 'none',
  },
  '.ant-card-body': {
    flex: 1,
    height: 0,
    padding: '10px 20px',
    overflowY: 'hidden',
  },
`;

const PageDashboard: React.FC = () => {
  // 模拟数据，实际应从接口获取
  const totalPeople = 245;
  const dailyAttendanceRate = 76;
  const informationLossRate = 0;
  const specialWorkTypeRate = 0;
  const workerHoursMonthly = 1269;
  const managerHoursMonthly = 1269;
  const safetyHoursMonthly = 1269;
  const workerHoursYearly = 1269;
  const managerHoursYearly = 1269;
  const safetyHoursYearly = 1269;
  const columns = [
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
  ];
  return (
    <Row className="h-full" gutter={20}>
      <Col span={6}>
        <CustomCard>
          <Flex align="center" justify="space-between">
            <Statistic
              title={
                <div className="color-#999 font-400 font-size-16px">
                  总人数
                </div>
              }
              value={totalPeople}
              style={{ fontSize: 24, fontWeight: 'bold' }}
            />
            <Statistic
              title={
                <div className="color-#999 font-400 font-size-16px">
                  当日出勤
                </div>
              }
              value={totalPeople}
              style={{ fontSize: 24, fontWeight: 'bold' }}
              suffix="%"
            />
          </Flex>
          <Progress
            percent={50}
            strokeColor={{
              '0%': '#00ff00',
              '100%': '#008000',
            }}
            style={{ marginTop: 8 }}
          />
        </CustomCard>
      </Col>

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

      <Col span={13} className="h-full">
        <CustomCard className="h-full">
          <Row gutter={16}>
            <Col span={12}>
              <Tag
                color="#4C9EF9"
                className="px-10px py-1px"
                style={{ borderRadius: 20 }}
              >
                按月
              </Tag>
            </Col>
            <Col span={12}>
              <Tag
                color="#4C9EF9"
                className="px-10px py-1px"
                style={{ borderRadius: 20 }}
              >
                按年
              </Tag>
            </Col>
          </Row>
          <Row gutter={16} className="mt-20px">
            {columns.map((item, i) => {
              return (
                <Col span={4} key={i}>
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
    </Row>
  );
};

export default PageDashboard;
