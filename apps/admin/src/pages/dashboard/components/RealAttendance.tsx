import React, { useState, useEffect } from 'react';
import { Avatar, Card } from 'antd';
import styled from 'styled-components';
import icon1 from '@/assets/images/dashboard/icon_1.png';
import icon2 from '@/assets/images/dashboard/icon_2.png';
import icon3 from '@/assets/images/dashboard/icon_3.png';
import icon4 from '@/assets/images/dashboard/icon_4.png';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useAppSelector } from 'hooks';
const { Meta } = Card;
const CustomSDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 10px;
  height: 100%;
  .label {
    font-size: 14px;
    color: #8a8a8a;
  }
  .value {
    margin-top: -15px;
    font-family: DINAlternate;
    font-weight: bold;
    font-size: 30px;
    color: #3294e6;
  }
`;
const CustomCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  borderRadius: '10px',
  border: '1px solid #EEEEEE',
  '.ant-card-head': {
    borderBottom: 'none',
  },
  '.ant-card-body': {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    height: 0,
    padding: '10px 20px',
    overflowY: 'hidden',
    '.ant-card-meta-avatar': {
      display: 'flex',
      alignItems: 'center',
      paddingRight: '5px',
    },
  },
}));

interface ColumnVO {
  label: string;
  icon: string;
  color: string;
  key: string;
  unit?: string;
}

export default () => {
  const { site } = useAppSelector((state) => state);
  const { websocket } = site;
  const { server } = useBasicConfiguration();
  const { attendance, personAnalysis } = server;

  const [statistic, setStatistic] = useState({
    attendanceNum: 0,
    presentWorkerNum: 0,
    total: 0,
    percent: 0,
  });
  const columns: ColumnVO[] = [
    {
      label: '总人数',
      icon: icon1,
      color: '#3294E6',
      key: 'total',
    },
    {
      label: '当前在场人数',
      icon: icon2,
      color: '#31B182',
      key: 'presentWorkerNum',
    },
    {
      label: '今日出勤人数',
      icon: icon3,
      color: '#6C7AF9',
      key: 'attendanceNum',
    },
    {
      label: '出勤占总数比',
      icon: icon4,
      color: '#FF4676',
      unit: '%',
      key: 'percent',
    },
  ];

  const queryData = async () => {
    const res = await attendance.attendanceCount();
    const res1 = await personAnalysis.getAttendanceMonitor();
    setStatistic({
      ...res,
      total: res1.total,
      percent: ((res.attendanceNum / res1.total) * 100).toFixed(
        2
      ),
    });
  };

  useEffect(() => {
    queryData();
  }, [websocket.person]);

  return (
    <CustomSDiv>
      {columns.map((item) => {
        return (
          <CustomCard key={item.key}>
            <Meta
              avatar={<Avatar src={item.icon} size={40} />}
              title={<div className="label">{item.label}</div>}
              description={
                <div
                  className="value "
                  style={{ color: item.color }}
                >
                  {statistic?.[item.key]}
                  {item?.unit}
                </div>
              }
            />
          </CustomCard>
        );
      })}
    </CustomSDiv>
  );
};
