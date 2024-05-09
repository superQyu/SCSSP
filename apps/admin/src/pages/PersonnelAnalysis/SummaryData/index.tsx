import { useEffect, useState } from 'react';
import { Flex } from 'antd';
import { UserOutlined, ScheduleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';

import TextItem from '../components/TextItem';

export default () => {
  let timer: any;
  const list = [
    {
      label: '管理人员',
      key: '1',
      unit: '',
    },
    {
      label: '出勤率',
      key: '2',
      unit: '%',
    },
    {
      label: '普通工人',
      key: '3',
      unit: '',
    },
    {
      label: '出勤率',
      key: '4',
      unit: '%',
    },
  ];
  const [time, setTime] = useState<string>();

  const getTime = () => {
    setTime(dayjs().format('YYYY年M月D日 hh:mm:ss'));
    timer = setTimeout(getTime, 1000);
  };

  useEffect(() => {
    getTime();
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Flex gap="middle" vertical justify="space-between" className="h-full">
      <div>{time}</div>
      <div>
        现场实施人数
        <span>0 人</span>
      </div>
      <div>劳务总人数 0 人 </div>
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 h-full bg-#fff" >
        {list.map((item, i: number) => {
          return (
            <Flex align="center" className="px-3 h-full font-size-14px color-#333" style={{border: '1px solid #ecf0f6'}} key={item.key}>
              {i % 2 ? <ScheduleTwoTone className='font-size-24px'/> : <UserOutlined className='color-#5597fd font-size-24px'/>}
              <div className="flex-1 ml-2">{item.label}</div>
              <div className="font-size-24px font-700 color-orange">
                {item.key}
                {item.unit}
              </div>
            </Flex>
          );
        })}
      </div>
    </Flex>
  );
};
