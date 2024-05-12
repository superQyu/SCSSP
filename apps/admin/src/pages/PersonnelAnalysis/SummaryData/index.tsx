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
      <div
        className="m-auto color-#6b9ce8 bg-#e0ecfe mt-[-10px] px-30px py-5px font-700"
        style={{ clipPath: 'polygon(0 0, 100% 0 , calc(100% - 20px) 100%, 20px 100%)' }}
      >
        {time}
      </div>
      <Flex align="center">
        现场实施人数
        <span
          className="ml-4 mr-1 px-10px  font-size-30px color-#6b9ce8 font-700 "
          style={{ border: '1px solid #e0ecfe' }}
        >
          0
        </span>
        人
      </Flex>
      <Flex align="center">
        劳务总人数
        <span
          className="ml-4 mr-1 px-10px  font-size-30px color-#6b9ce8 font-700 "
          style={{ border: '1px solid #e0ecfe' }}
        >
          1
        </span>
        <span
          className="ml-4 mr-1 px-10px  font-size-30px color-#6b9ce8 font-700 "
          style={{ border: '1px solid #e0ecfe' }}
        >
          4
        </span>
        人
      </Flex>

      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 h-full bg-#fff">
        {list.map((item, i: number) => {
          return (
            <Flex
              align="center"
              className="px-3 h-full font-size-14px color-#333"
              style={{ border: '1px solid #ecf0f6' }}
              key={item.key}
            >
              {i % 2 ? (
                <ScheduleTwoTone className="font-size-24px" />
              ) : (
                <UserOutlined className="color-#5597fd font-size-24px" />
              )}
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
