import { useEffect, useState } from 'react';

import BarChart from './BarChart';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const { materialEnter } = server;
  const [weightData, setWeightData] = useState<any>([]);
  const [pieceData, setPieceData] =
    useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await materialEnter.AnalyseByUnit({
      unit: 't',
    });
    setWeightData(res.plan);
    const res2 = await materialEnter.AnalyseByUnit({
      unit: 'm3',
    });
    setPieceData(res2.plan);
 
  };

  return (
    <div className="flex h-full">
      <div className="w-50%">
        <BarChart data={weightData} unit='计重' />
      </div>
      <div className="w-50%">
        <BarChart data={pieceData} unit='加件' />
      </div>
    </div>
  );
};
