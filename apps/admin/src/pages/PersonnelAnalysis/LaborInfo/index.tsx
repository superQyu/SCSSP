import { Flex, Row, Col } from 'antd';
import { useEffect, useState } from 'react';

import LaborPie from './components/LaborPie';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { personAnalysis, person } = server;
  console.log('person', personAnalysis, person);

  const [laborInfo, setLaborInfo] = useState<any>([]);
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await personAnalysis.getLaborInfo();
    // console.log('res', res);
    setLaborInfo(res);
    setChartData([
      {
        name: '超龄',
        value: res.overAge,
      },
      {
        name: '正常',
        value: res.normalAge,
      },
    ]);
    // setAttendanceChartData(list2);
    // setChartData([
    //   { name: '木工', value: 72 },
    //   { name: '建筑电工', value: 71 },
    //   { name: '起重信号工', value: 47 },
    //   { name: '钢筋工', value: 34 },
    //   { name: '混凝土工', value: 68 },
    //   { name: '除尘工', value: 68 },
    // ]);
  };

  return (
    <Row className="h-full">
      <Col span={10} className="h-full">
        {/* <div className="grid grid-rows-3  gap-5 h-full color-#333"> */}
        <div className="flex flex-col justify-center h-full color-#333">
          {/* <Flex
            align="center"
            className="px-10px"
            style={{ backgroundImage: 'linear-gradient(to right, #ebf3ff, transparent)' }}
          >
            <span className="flex-1">历史施工人数</span>
            <span className="pr-2 color-#64deef font-size-26px">14</span>人
          </Flex> */}
          {/* 男性占比 */}
          <div className="mb-1.5rem">
            <Flex
              align="center"
              className="px-10px"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #ebf3ff, transparent)',
              }}
            >
              <span className="flex-1">男性数量</span>
              <span className="pr-2 color-#64deef font-size-26px">
                {laborInfo.manCount}
              </span>
              人
            </Flex>
            {/* <Flex
              align="center"
              className="px-10px color-#458fff"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #ebf3ff, transparent)',
              }}
            >
              <span className="flex-1">同比 0%</span>
              <span>环比 0%</span>
            </Flex> */}
          </div>
          {/* 女性占比 */}
          <div>
            <Flex
              align="center"
              className="px-10px"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #ebf3ff, transparent)',
              }}
            >
              <span className="flex-1">女性数量</span>
              <span className="pr-2 color-#64deef font-size-26px">
                {laborInfo.womanCount}
              </span>
              人
            </Flex>
            {/* <Flex
              align="center"
              className="px-10px color-#458fff"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #ebf3ff, transparent)',
              }}
            >
              <span className="flex-1">同比 0%</span>
              <span>环比 0%</span>
            </Flex> */}
          </div>
        </div>
      </Col>
      <Col span={14} className="h-full">
        <LaborPie data={chartData} />
      </Col>
    </Row>
  );
};
