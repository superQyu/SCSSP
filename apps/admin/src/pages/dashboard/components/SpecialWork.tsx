import { Row, Col, Flex, Space } from 'antd';
import LabelLinePieChart from './PieChart';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useEffect, useState } from 'react';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { attendance } = server;

  const [presentChartData, setPresentChartData] = useState<any>(
    []
  );
  const [attendanceChartData, setAttendanceChartData] =
    useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res =
      await attendance.attendanceCountWithSpecialWorkType();
    const list1 = res.map((item: any) => ({
      name: item.workTypeName,
      value: item.thisWorkTypePresentWorkerCount,
    }));
    setPresentChartData(list1);
    const list2 = res.map((item: any) => ({
      name: item.workTypeName,
      value: item.thisWorkTypeAttendanceWorkerCount,
    }));
    setAttendanceChartData(list2);
    // setChartData([
    //   { name: '木工', value: 72 },
    //   { name: '建筑电工', value: 71 },
    //   { name: '起重信号工', value: 47 },
    //   { name: '钢筋工', value: 34 },
    //   { name: '混凝土工', value: 68 },
    //   { name: '除尘工', value: 68 },
    // ]);
  };

  return (
    <div className="h-full">
      <LabelLinePieChart
        title="总人数"
        data={presentChartData}
      />
    </div>
  );
};
