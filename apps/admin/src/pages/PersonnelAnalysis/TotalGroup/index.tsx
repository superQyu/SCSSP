import TeamBar from './components/TeamBar';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
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
    const res = await attendance.attendanceCountWithTotalGroup();
    const list = res.map((item: any) => ({
      name: `${item.groupName}【${item.groupLeaderName}】`,
      value: item.count,
    }));
    setChartData(list);
    // setChartData([
    //   { name: '木工【王积国】', value: 72 },
    //   { name: '建筑电工【宋德国】', value: 71 },
    //   { name: '起重信号工【李清然】', value: 47 },
    //   { name: '钢筋工【钱莱】', value: 34 },
    //   { name: '混凝土工【孙祥】', value: 68 },
    //   { name: '除尘工【赵三清】', value: 68 },
    // ]);
  };

  return <TeamBar data={chartData} />;
};
