import { useEffect, useState } from 'react';

import LabelLinePieChart from './PieChart';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const { attendance } = server;

  const [presentChartData, setPresentChartData] = useState<any>(
    []
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res =
      await attendance.attendanceCountWithSpecialWorkType();
    const list = res.map((item: any) => ({
      name: item.workTypeName,
      value: item.thisWorkTypePresentWorkerCount,
    })).filter((item:any)=> item.thisWorkTypePresentWorkerCount)
    setPresentChartData(list);
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
