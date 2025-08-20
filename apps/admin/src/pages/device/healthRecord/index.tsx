import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
import DeviceSelector from './DeviceSelector';
import DeviceInfoCard, { DeviceInfo } from './DeviceInfoCard';
import DeviceHealthScore, {
  HealthStats,
} from './DeviceHealthScore';
import FaultRecordsTable from './FaultRecordsTable';

// 页面容器样式
const DashboardContainer = styled.div`
  height: 300px;
  box-sizing: border-box;
`;

// 模拟数据
const mockDeviceInfo: DeviceInfo = {
  name: '南门人脸识别闸机',
  type: '人脸识别闸机',
  location: '南门入口处',
  ip: '192.168.10.79',
  status: 'online',
  lastOnline: '2023-08-18 14:32:15',
};

const mockHealthStats: HealthStats = {
  score: 85,
  uptime: '32天',
  offlineCount: 2,
  runtime: '182天',
  onlineRate: '98%',
};

const devices = [
  '南门人脸识别闸机',
  '东门人脸识别闸机',
  '一号地磅',
  '塔吊监控录像机',
  '一号地磅',
  '一号地磅',
];

const faultRecords: FaultRecord[] = [
  {
    key: '1',
    type: '离线故障',
    occurTime: '2025-08-14 10:20:00',
    restoreTime: '2025-08-14 12:20:00',
  },
  {
    key: '2',
    type: '离线故障',
    occurTime: '2025-08-13 10:20:00',
    restoreTime: '2025-08-13 12:20:00',
  },
  {
    key: '3',
    type: '离线故障',
    occurTime: '2025-08-12 10:20:00',
    restoreTime: '2025-08-12 12:20:00',
  },
  {
    key: '4',
    type: '离线故障',
    occurTime: '2025-08-11 10:20:00',
    restoreTime: '2025-08-11 12:20:00',
  },
];

const DeviceDetailPage: React.FC = () => {
  const [selectedDevice, setSelectedDevice] =
    useState('南门人脸识别闸机');
  const [searchValue, setSearchValue] = useState('');
  const [faultSearchValue, setFaultSearchValue] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeviceSelect = (device: string) => {
    setSelectedDevice(device);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleFaultSearch = (value: string) => {
    setFaultSearchValue(value);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <Row
      gutter={16}
      style={{ padding: '16px' }}
      className="h-full"
    >
      <Col span={6} className="h-full">
        <DeviceSelector
          devices={devices}
          onSelect={handleDeviceSelect}
          searchValue={searchValue}
          onSearch={handleSearch}
        />
      </Col>
      <Col span={18} className="h-full">
        <div className="flex flex-col h-full">
          <DashboardContainer>
            <Row gutter={20}>
              <Col span={12} className="h-330px">
                <DeviceInfoCard data={mockDeviceInfo} />
              </Col>

              <Col span={12} className="h-330px">
                <DeviceHealthScore data={mockHealthStats} />
              </Col>
            </Row>
          </DashboardContainer>

          <div className="flex-1 mt-45px">
            <FaultRecordsTable />
          </div>
        </div>
        {/* </Card> */}
      </Col>
    </Row>
  );
};

export default DeviceDetailPage;

// 补充FaultRecord类型定义（可放在单独的types文件中）
type FaultRecord = {
  key: string;
  type: string;
  occurTime: string;
  restoreTime: string;
};
