import { Row, Col, Flex, Space } from 'antd';
import TitleItem from './components/TitleItem';
import LaborPie from './components/LaborPie';
import TextItem from './components/TextItem';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useEffect, useState } from 'react';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { attendance } = server;

  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await attendance.attendanceCount();
    setChartData({
      value: res.attendanceNum,
      total: res.presentWorkerNum,
    });
  };

  return (
    <Row className="h-full pb-10 pt-4">
      <Col span={14} className="h-full">
        <LaborPie data={chartData} />
      </Col>
      <Col span={10} className="h-full">
        <Flex
          gap="middle"
          vertical
          justify="space-between"
          className="h-full"
        >
          <div className="overflow-hidden grid grid-cols-2 border-rd-4px">
            <TitleItem label="在场人数" color="#26ff00" />
            <TitleItem label="出勤人数" color="#0080ff" />
          </div>
          <Space direction="vertical" size={5}>
            <div className="mb-1 font-size-14px font-700 color-#454545">
              在场状态
            </div>
            <TextItem label="在场人数" value={4} unit="人" />
            <TextItem label="出勤人数" value={4} unit="人" />
            {/* <TextItem label="出勤率" value={25} unit="%" /> */}
          </Space>
        </Flex>
      </Col>
    </Row>
  );
};
