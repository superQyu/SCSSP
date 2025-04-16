import { useEffect, useState } from 'react';
import { Flex } from 'antd';
import {
  UserOutlined,
  ScheduleTwoTone,
} from '@ant-design/icons';
import dayjs from 'dayjs';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { personAnalysis } = server;

  // const list = [
  //   {
  //     label: '管理人员',
  //     key: '1',
  //     unit: '',
  //   },
  //   {
  //     label: '出勤率',
  //     key: '2',
  //     unit: '%',
  //   },
  //   {
  //     label: '普通工人',
  //     key: '3',
  //     unit: '',
  //   },
  //   {
  //     label: '出勤率',
  //     key: '4',
  //     unit: '%',
  //   },
  // ];
  const [time, setTime] = useState<string>();
  const [data, setData] = useState<any>([]);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    setTime(dayjs().format('YYYY年M月D日 HH:mm:ss'));
    const intervalId = setInterval(() => {
      setTime(dayjs().format('YYYY年M月D日 HH:mm:ss'));
    }, 1000);

    personAnalysis.getAttendanceMonitor().then((res: any) => {
      setData(res);
      const list = [
        {
          label: '管理人员',
          key: '1',
          value: res.managerTotal,
          unit: '',
        },
        {
          label: '出勤率',
          key: '2',
          value:
            res.managerTotal == 0
              ? 0
              : (
                  (res.presentManagerNum / res.managerTotal) *
                  100
                ).toFixed(),
          unit: '%',
        },
        {
          label: '普通工人',
          key: '3',
          value: res.workerTotal,
          unit: '',
        },
        {
          label: '出勤率',
          key: '4',
          value: (
            (res.presentWorkerNum / res.workerTotal) *
            100
          ).toFixed(),
          unit: '%',
        },
      ];
      setList(list);
    });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Flex
      gap="middle"
      vertical
      justify="space-between"
      className="h-full"
    >
      <div
        className="m-auto color-#6b9ce8 bg-#e0ecfe mt-[-10px] px-30px py-5px font-700"
        style={{
          clipPath:
            'polygon(0 0, 100% 0 , calc(100% - 20px) 100%, 20px 100%)',
        }}
      >
        {time}
      </div>
      <Flex align="center">
        现场实施人数
        <span
          className="ml-4 mr-1 px-10px  font-size-30px color-#6b9ce8 font-700 "
          style={{ border: '1px solid #e0ecfe' }}
        >
          {data.presentNum}
        </span>
        人
      </Flex>
      <Flex align="center">
        劳务总人数
        {data.total
          ?.toString()
          .split('')
          .map((item: any) => {
            return (
              <span
                key={item}
                className="ml-4 mr-1 px-10px  font-size-30px color-#6b9ce8 font-700 "
                style={{ border: '1px solid #e0ecfe' }}
              >
                {item}
              </span>
            );
          })}
        {/* <span
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
        </span> */}
        人
      </Flex>

      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 h-full bg-#fff">
        {list.map((item: any, i: number) => {
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
                {item.value}
                {item.unit}
              </div>
            </Flex>
          );
        })}
      </div>
    </Flex>
  );
};
