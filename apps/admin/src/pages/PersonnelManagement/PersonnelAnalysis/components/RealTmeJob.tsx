import React from 'react';
import { Col, Row } from 'antd';
import RealTime from './RealTime';
import YoYMoM from './YoYMoM';

const App: React.FC = () => (
  <>
    <Row className="h-full">
      <Col span={12} className="h-full">
        <RealTime />
      </Col>
      <Col span={12}>
        <YoYMoM />
      </Col>
    </Row>
  </>
);

export default App;
