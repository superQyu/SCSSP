import React from 'react';
import { Input, List, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

// 列表容器（带滚动）
const ListContainer = styled.div`
  max-height: calc(100% - 56px); // 减去搜索框高度
  overflow-y: auto;
  padding-right: 8px;
`;

interface DeviceSelectorProps {
  devices: string[];
  onSelect: (device: string) => void;
  searchValue: string;
  onSearch: (value: string) => void;
  selectedDevice?: string;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  devices,
  onSelect,
  searchValue,
  onSearch,
  selectedDevice,
}) => {
  const filteredDevices = devices.filter((device) =>
    device.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <StyledCard bordered>
      <Input
        placeholder="搜索设备..."
        prefix={<SearchOutlined />}
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        style={{ marginBottom: 16 }}
        allowClear
      />

      <ListContainer>
        <List
          split={false}
          dataSource={filteredDevices}
          renderItem={(device) => (
            <List.Item
              onClick={() => onSelect(device)}
              style={{
                cursor: 'pointer',
                backgroundColor:
                  selectedDevice === device
                    ? '#f0f7ff'
                    : 'transparent',
                borderLeft:
                  selectedDevice === device
                    ? '3px solid #1890ff'
                    : 'none',
                transition: 'all 0.2s ease',
              }}
              hoverable
            >
              {device}
            </List.Item>
          )}
          size="small"
        />
      </ListContainer>
    </StyledCard>
  );
};

export default DeviceSelector;
