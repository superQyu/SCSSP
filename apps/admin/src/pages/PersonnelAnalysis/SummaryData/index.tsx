import { useEffect, useState } from 'react';
import { Flex } from 'antd';
import dayjs from 'dayjs';

import styled from 'styled-components';
// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useAppSelector } from 'hooks';
const CustomBlock = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 30px;
  padding: 20px 17px;
  height: 100%;
  .block-flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90px;
    background: #ffffff;
    box-shadow: 0px -7px 4px 0px rgba(27, 45, 100, 0.16);
    border-radius: 10px;
  }
  .block-value {
    font-family: DINAlternate;
    font-weight: bold;
    font-size: 30px;
    color: #000000;
  }
  .block-label {
    font-family: Microsoft YaHei;
    font-size: 16px;
    color: #6f8aa5;
  }
  .block-item {
    width: 100%;
    font-size: 14px;
    color: #000000;
    padding-inline: 15px;
    background: rgba(17, 130, 236, 0.05);
    border-radius: 20px;
    .block-item-value {
      font-family: DINAlternate;
      font-weight: bold;
      font-size: 24px;
    }
  }
`;

export default () => {
  const { site } = useAppSelector((state) => state);
  const { websocket } = site;
  const { server } = useBasicConfiguration();
  const { personAnalysis } = server;

  const [time, setTime] = useState<string>();
  const [data, setData] = useState<any>([]);

  const loadData = async () => {
    personAnalysis.getAttendanceMonitor().then((res: any) => {
      const list = [
        {
          label: '现场实施人数',
          value: res.presentNum,
          children: [
            {
              label: '管理人员',
              key: '1',
              value: res.managerTotal,
              unit: '',
            },
            {
              label: '普通工人',
              key: '3',
              value: res.workerTotal,
              unit: '',
            },
          ],
        },
        {
          label: '劳务总人数',
          value: res.total,
          children: [
            {
              label: '出勤率',
              key: '2',
              value:
                res.managerTotal == 0
                  ? 0
                  : (
                      (res.presentManagerNum /
                        res.managerTotal) *
                      100
                    ).toFixed(),
              unit: '%',
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
          ],
        },
      ];
      setData(list);
    });
  };

  useEffect(() => {
    setTime(dayjs().format('YYYY年M月D日 HH:mm:ss'));
    const intervalId = setInterval(() => {
      setTime(dayjs().format('YYYY年M月D日 HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    loadData();
  }, [websocket.person]);
  return (
    <>
      <Flex gap="middle" vertical justify="space-between">
        <div
          className="m-auto color-#fff  mt-[-10px] px-30px py-5px font-700"
          style={{
            clipPath:
              'polygon(0 0, 100% 0 , calc(100% - 20px) 100%, 20px 100%)',
            background:
              'linear-gradient(-3deg, #0783FD, #78BDFF)',
          }}
        >
          {time}
        </div>
      </Flex>
      <CustomBlock>
        {data.map((item: any, i) => {
          return (
            <Flex
              justify="space-evenly"
              align="center"
              vertical={true}
            >
              <div className="block-flex">
                <div className="block-value">{item.value}</div>
                <div className="block-label">{item.label}</div>
              </div>
              {item.children.map((el: any) => {
                return (
                  <Flex
                    className="block-item"
                    justify="space-between"
                    align="center"
                  >
                    {el.label}
                    <span className="block-item-value">
                      {el.value}
                      {i == 1 ? '%' : ''}
                    </span>
                  </Flex>
                );
              })}
            </Flex>
          );
        })}

        {/* <Flex justify='space-evenly' align='center' vertical={true}>
          <div className='block-flex'>
            <div className='block-value'>48</div>
            <div className='block-label'>总务总人数</div>
          </div>
          <Flex className='block-item' justify='space-between' align='center'>
            出勤率  <span className='block-item-value'>14</span>
          </Flex>
          <Flex className='block-item' justify='space-between' align='center'>
            出勤率  <span className='block-item-value'>14</span>
          </Flex>
        </Flex> */}
      </CustomBlock>
    </>
  );
};
