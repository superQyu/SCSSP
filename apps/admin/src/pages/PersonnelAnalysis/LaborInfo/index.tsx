import { Flex, Row, Col, Space } from 'antd';

import LaborPie from './components/LaborPie';

export default () => {
  return (
    <Row className="h-full">
      <Col span={10} className="h-full">
        <div className="grid grid-rows-3  gap-5 h-full color-#333">
          <Flex
            align="center"
            className="px-10px"
            style={{ backgroundImage: 'linear-gradient(to right, #ebf3ff, transparent)' }}
          >
            <span className="flex-1">历史施工人数</span>
            <span className="pr-2 color-#64deef font-size-26px">14</span>人
          </Flex>
          <div>
            <Flex
              align="center"
              className="px-10px"
              style={{ backgroundImage: 'linear-gradient(to right, #ebf3ff, transparent)' }}
            >
              <span className="flex-1">男性占比</span>
              <span className="pr-2 color-#64deef font-size-26px">78.58</span>%
            </Flex>
            <Flex
              align="center"
              className="px-10px color-#458fff"
              style={{ backgroundImage: 'linear-gradient(to right, #ebf3ff, transparent)' }}
            >
              <span className="flex-1">同比 0%</span>
              <span>环比 0%</span>
            </Flex>
          </div>

          <div>
            <Flex
              align="center"
              className="px-10px"
              style={{ backgroundImage: 'linear-gradient(to right, #ebf3ff, transparent)' }}
            >
              <span className="flex-1">女性占比</span>
              <span className="pr-2 color-#64deef font-size-26px">78.58</span>%
            </Flex>
            <Flex
              align="center"
              className="px-10px color-#458fff"
              style={{ backgroundImage: 'linear-gradient(to right, #ebf3ff, transparent)' }}
            >
              <span className="flex-1">同比 0%</span>
              <span>环比 0%</span>
            </Flex>
          </div>
        </div>
      </Col>
      <Col span={14} className="h-full">
        <LaborPie />
      </Col>
    </Row>
  );
};
