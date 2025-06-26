import { useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  Flex,
  Tag,
} from 'antd';
import styled from 'styled-components';

import SingleTitle from '@/components/SingleTitle';
import LoginRecord from './LoginRecord';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

const CustomCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  boxShadow: '0px 4px 13px 0px rgba(0,0,0,0.07)',
  borderRadius: '10px',
  border: '1px solid #EEEEEE',
  '.ant-card-head': {
    borderBottom: 'none',
  },
  '.ant-card-body': {
    flex: 1,
    height: 0,
    padding: '10px 20px',
    overflowY: 'hidden',
  },
}));

export default () => {
  const { server } = useBasicConfiguration();
  const { personAnalysis: P } = server;
  const [data, setData] = useState({
    totalNum: 0,
    needUpdateNum: 0,
    specialWorkNum: 0,
  });
  const [monthData, setMonthData] = useState({
    manager: 0,
    safetyOfficer: 0,
    worker: 0,
  });
  const [yearData, setYearData] = useState({
    manager: 0,
    safetyOfficer: 0,
    worker: 0,
  });
  const columns = [
    {
      label: '按月',
      children: [
        {
          label: '工人总工时',
          key: 'worker',
        },
        {
          label: '管理人员总工时',
          key: 'manager',
        },
        {
          label: '安全人员总工时',
          key: 'safetyOfficer',
        },
      ],
    },
    {
      label: '按年',
      children: [
        {
          label: '工人总工时',
          key: 'worker',
        },
        {
          label: '管理人员总工时',
          key: 'manager',
        },
        {
          label: '安全人员总工时',
          key: 'safetyOfficer',
        },
      ],
    },
  ];

  const queryData = async () => {
    const res = await P.getPersonnelNum();
    setData(res);

    const res1 = await P.getAttendanceCountMonthList();
    setMonthData(res1);

    const res2 = await P.getAttendanceCountYearList();
    setYearData(res2);
  };
  useEffect(() => {
    queryData();
  }, []);
  return (
    <>
      <Row className="h-full" gutter={20}>
        <Col span={5} className="h-full">
          <CustomCard className="h-full pos-relative">
            <Tag
              color="#4C9EF9"
              className="px-10px py-1px"
              style={{ borderRadius: 20 }}
            >
              信息缺失人员占比
            </Tag>

            <Flex justify="space-center" vertical={true} className='h-full'>
              <Statistic
                value={
                  !data.totalNum
                    ? 0
                    : Number(
                        (
                          (data.needUpdateNum / data.totalNum) *
                          100
                        ).toFixed(2)
                      )
                }
                suffix="%"
              />
              <div className="color-#999 font-400 font-size-16px mt-20px">
                特殊工种占：
                <span className='color-#e5667e'>
                {!data.totalNum
                  ? 0
                  : Number(
                      (
                        (data.specialWorkNum / data.totalNum) *
                        100
                      ).toFixed(2)
                    )}
                %
                </span>
              </div>
            </Flex>
            <div className="pos-absolute right-20px top-30px">
              <Progress
                type="circle"
                size={90}
                percent={
                  !data.totalNum
                    ? 0
                    : Number(
                        (
                          (data.specialWorkNum / data.totalNum) *
                          100
                        ).toFixed(2)
                      )
                }
                strokeWidth={12}
                strokeColor="#E5667E"
                trailColor="#EAEAEA"
              />
            </div>
            {/* </Flex> */}
          </CustomCard>
        </Col>
        {columns.map((el, i) => {
          return (
            <Col span={7} key={`col${i}`} className="h-full">
              <CustomCard className="h-full">
                <Tag
                  color="#4C9EF9"
                  className="px-10px py-1px"
                  style={{ borderRadius: 20 }}
                >
                  {el.label}
                </Tag>
                <Row gutter={16} className="mt-20px">
                  {el.children.map((item, j) => {
                    return (
                      <Col span={8} key={j}>
                        <Statistic
                          title={item.label}
                          value={
                            !i
                              ? Number(
                                  monthData[item.key].toFixed(2)
                                )
                              : Number(
                                  yearData[item.key].toFixed(2)
                                )
                          }
                          suffix="h"
                        />
                      </Col>
                    );
                  })}
                </Row>
              </CustomCard>
            </Col>
          );
        })}
        <Col span={5} className="h-full">
          <CustomCard className="h-full">
            <Tag
              color="#4C9EF9"
              className="px-10px py-1px"
              style={{ borderRadius: 20 }}
            >
              账号登录情况
            </Tag>
            <LoginRecord />
          </CustomCard>
        </Col>
      </Row>
    </>
  );
};
