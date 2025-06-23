import { useEffect, useState } from 'react';

import LabelLinePieChart from './PieChart';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const { personAnalysis: P } = server;

  const [presentChartData, setPresentChartData] = useState<any>(
    []
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await P.getPersonnelSpecialWorkList();
    const list = res.map((item: any) => ({
      name: item.companyName,
      value: item.specialWorkNum,
    }));
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
