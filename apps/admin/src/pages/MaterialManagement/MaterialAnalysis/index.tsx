import FunctionBar from './components/FunctionBar';

import { Form, } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useEffect, useState } from 'react';
import { esESIntl } from '@ant-design/pro-components';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { attendance } = server;
  const { materialList } = server;
  const [chartData, setChartData] = useState<any>([]);
  const [form] = Form.useForm();
  const [params, setParams] = useState<any>({
    enterOrExit: 'enter',
    type: '1'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { list } = await materialList
      .analysisList(params)
    const resultMap = {};
    list.forEach(item => {
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
    setChartData(resultArray)
  };

  const onChange = (e: RadioChangeEvent) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
    setTimeout(() => {
      console.log('params', params)
    }, 1000);
  };
  return (
    <div className='p-20px'>
      {/* <Form className='pl-40px' form={form} layout="inline" >
        <Form.Item>
          <Radio.Group size='large' onChange={onChange} defaultValue="enter" name="enterOrExit">
            <Radio.Button value="enter">进场</Radio.Button>
            <Radio.Button value="exit">出场</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Radio.Group size='large' onChange={onChange} defaultValue="1" name="type">
            <Radio.Button value="1">重量</Radio.Button>
            <Radio.Button value="2">数量</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form> */}

      <div style={{ height: '700px' }}>
        <FunctionBar data={chartData} unit={params.type == '1' ? 't' : '个'} />
      </div>

    </div>

  );

};
