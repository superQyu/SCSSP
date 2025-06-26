import { useEffect, useState } from 'react';
import { Flex, Select, Space } from 'antd';

import BarChart from './BarChart';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useAppSelector } from 'hooks';
export default () => {
  const { site } = useAppSelector((state) => state);
  const { websocket } = site;
  const { server } = useBasicConfiguration();
  const { materialEnter } = server;
  const [weightData, setWeightData] = useState<any>([]);

  const loadData = async () => {
    const res = await materialEnter.AnalyseByUnit();
    const list = Object.entries(res).map(([key, value]) => {
      return {
        label: key,
        ...value,
      };
    });

    setWeightData(list);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [websocket.material]);

  return (
    <div className="h-full">
      <div className="w-full h-full">
        <BarChart data={weightData} />
      </div>
    </div>
  );
};
