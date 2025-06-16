import BarChart from './LineChart';

import { Form } from 'antd';
import type { RadioChangeEvent } from 'antd';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useEffect, useState } from 'react';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { attendance } = server;
  const { materialList } = server;
  const [chartData, setChartData] = useState<any>([]);
  const [form] = Form.useForm();
  const [params, setParams] = useState<any>({
    enterOrExit: 'enter',
    type: '1',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { list } = await materialList.analysisList(params);
    const resultMap = {};
    list.forEach((item) => {
      const materialName = item.materialName;
      const enterNumber = item.enterNumber;
      if (resultMap[materialName]) {
        resultMap[materialName] += enterNumber;
      } else {
        resultMap[materialName] = enterNumber;
      }
    });
    const resultArray = [];
    for (const [name, value] of Object.entries(resultMap)) {
      resultArray.push({ name, value: value.toFixed(2) * 1 });
    }
    setChartData(resultArray);
  };

  const onChange = (e: RadioChangeEvent) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
    setTimeout(() => {
      console.log('params', params);
    }, 1000);
  };
  return <BarChart data={chartData} />;
};
