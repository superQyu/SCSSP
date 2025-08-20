import React from 'react';
import { Card, Descriptions, Badge } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

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

const InfoItem = styled(Descriptions.Item)`
  & .ant-descriptions-item-label {
    color: #666;
    font-weight: 500;
    font-size: 14px;
  }

  & .ant-descriptions-item-content {
    color: #333;
    font-size: 14px;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

// 类型定义
export interface DeviceInfo {
  name: string;
  type: string;
  location: string;
  ip: string;
  status: 'online' | 'offline';
  lastOnline: string;
}

// 组件
const DeviceInfoCard: React.FC<{ data: DeviceInfo }> = ({
  data,
}) => {
  return (
    <StyledCard   title={<SingleTitle label="设备基础信息" />} bordered={false}>
      <Descriptions column={1} bordered size="small">
        <InfoItem label="设备名称">{data?.name}</InfoItem>
        <InfoItem label="设备类型">{data.type}</InfoItem>
        <InfoItem label="安装位置">{data.location}</InfoItem>
        <InfoItem label="IP地址">{data.ip}</InfoItem>
        <InfoItem label="当前状态">
          <StatusWrapper>
            {data.status === 'online' ? (
              <Badge
                status="success"
                icon={<CheckCircleOutlined />}
                text="在线"
              />
            ) : (
              <Badge
                status="error"
                icon={<CloseCircleOutlined />}
                text="离线"
              />
            )}
          </StatusWrapper>
        </InfoItem>
        <InfoItem label="最后在线时间">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ClockCircleOutlined
              size={14}
              style={{ color: '#999' }}
            />
            <span>{data.lastOnline}</span>
          </div>
        </InfoItem>
      </Descriptions>
    </StyledCard>
  );
};

export default DeviceInfoCard;
