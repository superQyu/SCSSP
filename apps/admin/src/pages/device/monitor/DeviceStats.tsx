import React from 'react';
import { Card, Row, Col, Progress } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// 定义主题变量，针对小高度场景优化
const theme = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    danger: '#ff4d4f',
    gray: '#8c8c8c',
    lightGray: '#f5f5f5',
    border: '#e8e8e8',
  },
  spacing: {
    xs: '4px', // 缩小内边距
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
  borderRadius: '6px', // 略小的圆角
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)', // 更浅的阴影
};

// 统计卡片组件 - 适应100px高度
const StatCard = styled(Card)`
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  transition: all 0.3s ease;
  height: 100px; // 占满父容器高度
  overflow: hidden;
  border: none;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-2px); // 轻微上浮效果
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

// 卡片内容容器 - 关键是控制内部间距
const StatCardContent = styled.div`
  padding: ${theme.spacing.sm}; // 减小内边距
  height: 100%;
  box-sizing: border-box; // 确保padding不增加总高度
  display: flex;
  flex-direction: column; // 垂直布局
  justify-content: center; // 垂直居中
`;

// 标题样式
const StatTitle = styled.div`
  font-size: 12px; // 缩小字体
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing.xs}; // 减小间距
  line-height: 1; // 紧凑行高
`;

// 数值样式
const StatValue = styled.div`
  font-size: 20px; // 调整数值大小
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs}; // 减小间距
  line-height: 1.2; // 紧凑行高
`;

// 变化趋势样式
const StatChange = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px; // 缩小字体
  line-height: 1; // 紧凑行高
`;

// 主组件
const Dashboard: React.FC = () => {
  // 设备统计数据
  const deviceStats = {
    total: 156,
    online: 132,
    offline: 18,
  };

  return (
    <Row gutter={12}>
      <Col span={8}>
        <StatCard>
          <StatCardContent>
            <StatTitle>设备总数</StatTitle>
            <StatValue>{deviceStats.total}</StatValue>
            <StatChange>
              <ArrowUpOutlined
                style={{
                  color: theme.colors.success,
                  marginRight: 2,
                  fontSize: '12px',
                }}
              />
              <span style={{ color: theme.colors.success }}>
                较上月 +8 台
              </span>
            </StatChange>
          </StatCardContent>
        </StatCard>
      </Col>
      <Col span={8}>
        <StatCard>
          <StatCardContent>
            <StatTitle>在线设备</StatTitle>
            <StatValue>{deviceStats.online}</StatValue>
            <StatChange>
              <span
                style={{
                  color: theme.colors.gray,
                  marginRight: 4,
                }}
              >
                {Math.round(
                  (deviceStats.online / deviceStats.total) * 100
                )}
                %
              </span>
              <Progress
                percent={
                  (deviceStats.online / deviceStats.total) * 100
                }
                size="small"
                status="success"
                style={{ flex: 1, minWidth: '60px' }} // 自适应进度条宽度
              />
            </StatChange>
          </StatCardContent>
        </StatCard>
      </Col>
      <Col span={8}>
        <StatCard>
          <StatCardContent>
            <StatTitle>离线设备</StatTitle>
            <StatValue style={{ color: theme.colors.danger }}>
              {deviceStats.offline}
            </StatValue>
            <StatChange>
              <ArrowUpOutlined
                style={{
                  color: theme.colors.danger,
                  marginRight: 2,
                  fontSize: '12px',
                }}
              />
              <span style={{ color: theme.colors.danger }}>
                较昨日 +2 台
              </span>
            </StatChange>
          </StatCardContent>
        </StatCard>
      </Col>
    </Row>
  );
};

export default Dashboard;
