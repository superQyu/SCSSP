import React, { useEffect, useRef } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import * as echarts from 'echarts';

import SingleTitle from '@/components/SingleTitle';

// 样式组件
const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  .ant-card-body {
    padding: 20px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const ChartWrapper = styled.div`
  width: 180px;
  height: 180px;

  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
    margin: 0 auto 16px;
  }
`;

const StatsGrid = styled(Row)`
  width: calc(100% - 200px);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StatItem = styled(Col)`
  padding: 8px 12px;

  .ant-statistic {
    background: #f7f8fa;
    padding: 12px;
    border-radius: 8px;
  }

  .ant-statistic-title {
    color: #666;
    font-size: 13px;
    margin-bottom: 6px;
  }

  .ant-statistic-content {
    font-size: 16px;
    font-weight: 600;
  }
`;

// 类型定义
export interface HealthStats {
  score: number;
  uptime: string;
  offlineCount: number;
  runtime: string;
  onlineRate: string;
}

// 组件
const DeviceHealthScore: React.FC<{ data: HealthStats }> = ({
  data,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // 初始化健康评分环形图
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      // 动态设置评分颜色（80分以上绿色，60-80黄色，60以下红色）
      let scoreColor = '#52c41a'; // 绿色-良好
      if (data.score < 60) scoreColor = '#ff4d4f'; // 红色-危险
      else if (data.score < 80) scoreColor = '#faad14'; // 黄色-警告

      const option = {
        tooltip: {
          show: false,
        },
        series: [
          {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              roundCap: true,
              clip: false,
              itemStyle: {
                color: scoreColor,
              },
            },
            axisLine: {
              lineStyle: {
                width: 16,
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            title: {
              fontSize: 14,
              color: '#666',
              offsetCenter: [0, 30],
            },
            detail: {
              width: 60,
              height: 20,
              fontSize: 24,
              color: '#333',
              borderColor: 'auto',
              formatter: '{value}',
              offsetCenter: [0, 0],
            },
            data: [
              {
                value: data.score,
                name: '健康评分',
              },
            ],
          },
        ],
      };

      chart.setOption(option);

      // 响应式处理
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [data.score]);

  return (
    <StyledCard
      title={<SingleTitle label="设备健康状态" />}
      bordered={false}
    >
      <ScoreContainer>
        {/* 健康评分图表 */}
        <ChartWrapper ref={chartRef} />

        <StatsGrid gutter={10}>
          <StatItem span={12}>
            <Statistic
              title="连续无故障"
              value={data.uptime}
              // prefix={<ShieldOutlined size={16} style={{ color: '#52c41a' }} />}
            />
          </StatItem>

          <StatItem span={12}>
            <Statistic
              title="本月离线次数"
              value={data.offlineCount}
              prefix={
                <ArrowUpOutlined
                  size={16}
                  style={{ color: '#ff4d4f' }}
                />
              }
              valueStyle={{ color: '#ff4d4f' }}
            />
          </StatItem>

          <StatItem span={12}>
            <Statistic
              title="累计运行天数"
              value={data.runtime}
              // prefix={<ClockCircleOutlined size={16} style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </StatItem>

          <StatItem span={12}>
            <Statistic
              title="平均在线率"
              value={data.onlineRate}
              valueStyle={{
                color:
                  data.onlineRate >= '95%'
                    ? '#52c41a'
                    : '#faad14',
              }}
            />
          </StatItem>
        </StatsGrid>
      </ScoreContainer>
    </StyledCard>
  );
};

export default DeviceHealthScore;
