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

  const [chartData, setChartData] = useState<any>({
    value: 0,
    total: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await attendance.attendanceCount();
    console.log('接口返回的结果', res);
    if (res.code === 40001) {
      return;
    }
    // 出勤人数必定大于等于在场人数
    setChartData({
      value: res.presentWorkerNum,
      total: res.presentWorkerNum + res.attendanceNum,
    });
    // setChartData({
    //   value: 30,
    //   total: 100,
    // });
  };

  return (
    // <Row className="h-50% pb-10 pt-4">
    <Row className="h-50% mt-4">
      <Col span={14} className="h-full">
        {/* <LaborPie /> */}
        <LaborPie data={chartData} />
      </Col>
      <Col span={10} className="h-full">
        <Flex
          gap="middle"
          vertical
          // justify="space-between"
          // justify="space-around"
          className="h-full"
        >
          <div className="overflow-hidden grid grid-cols-2 border-rd-4px">
            <TitleItem label="出勤人数" color="#26ff00" />
            <TitleItem label="在场人数" color="#0080ff" />
          </div>
          <Space direction="vertical" size={5}>
            <div className="mb-1 font-size-14px font-700 color-#454545">
              在场状态
            </div>
            <TextItem
              label="在场人数"
              value={chartData.value}
              unit="人"
            />
            <TextItem
              label="出勤人数"
              value={chartData.total - chartData.value}
              unit="人"
            />
            {/* <TextItem label="出勤率" value={25} unit="%" /> */}
          </Space>
        </Flex>
      </Col>
    </Row>
  );
};
