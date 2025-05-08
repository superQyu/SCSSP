import FunctionBar from './components/FunctionBar';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { set } from 'lodash';
import { useEffect, useState } from 'react';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { attendance } = server;

  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res =
      await attendance.attendanceCountWithTotalWorkType();
    const list = res.map((item: any) => ({
      name: item.workTypeName,
      value: item.presentWorkTypeCount,
    }));
    setChartData(list);
    // setChartData([
    //   { name: '木工', value: 72 },
    //   { name: '建筑电工', value: 71 },
    //   { name: '起重信号工', value: 47 },
    //   { name: '钢筋工', value: 34 },
    //   { name: '混凝土工', value: 68 },
    //   { name: '除尘工', value: 68 },
    // ]);
  };

  return <FunctionBar data={chartData} />;
};
