import { useRef, useState, useEffect } from 'react';
import { Col, Row, Alert } from 'antd';
import styled from 'styled-components';

import { type ActionType } from '@ant-design/pro-components';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import DeptTree from './components/DeptTree';
import UserTable from './components/UserTable';

const StyledRow = styled(Row)`
  height: 100%;
  padding: 10px 10px 15px;
`;

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  const [colWidth, _] = useState<string>('280px');
  const [deptId, setDeptId] = useState<number | string>('');

  useEffect(() => {}, []);

  return (
    <>
      {/* <Alert message="未开放" type="warning" showIcon /> */}
      <StyledRow gutter={16}>
        <Col
          className="gutter-row"
          style={{
            width: colWidth,
            height: '100%',
            paddingBlockStart: '10px',
            paddingBlockEnd: '10px',
          }}
        >
          <Col
            style={{
              width: '100vh',
              backgroundColor: '#fff',
              height: '100%',
            }}
          >
            <DeptTree onChange={(deptId: string | number) => setDeptId(deptId)} />
          </Col>
        </Col>
        <Col className="gutter-row" style={{ width: `calc(100% - ${colWidth})` }}>
          <UserTable queryParams={{ deptId }} />
        </Col>
      </StyledRow>
    </>
  );
};
