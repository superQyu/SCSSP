import React, { useEffect } from 'react';
import { JsonEditor } from 'ui';

import { Col, Row, Typography, Alert } from 'antd';

interface Props {}

const AddMenus: React.FC<Props> = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Alert
        message={<>JSON数据编辑器:{`<JsonEditor/>`}</>}
        type="success"
        style={{ marginBlockEnd: '25px' }}
        showIcon
      />

      <Row style={{ width: '100%', height: 'calc(100% - 75px)' }} gutter={16}>
        <Col
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          className="gutter-row"
          span={12}
        >
          <div style={{ width: '400px' }}>
            <JsonEditor />
          </div>
        </Col>
        <Col
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          className="gutter-row"
          span={12}
        >
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            <Typography.Text type="success" code>
              {`import { JsonEditor } from 'ui';`}
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`<JsonEditor/>`}
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`参数设置：{}`}
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
};
export default AddMenus;
