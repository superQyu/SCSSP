import React, { useState, useEffect, useRef } from 'react';

import { IconSelect, IconShow } from 'ui';
import { Descriptions, Col, Row, Typography, Alert } from 'antd';

interface Props {}

const AddMenus: React.FC<Props> = () => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {}, []);

  return (
    <>
      <Alert
        message={<>图标选择器:{`<IconSelect/>`}</>}
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
          <div style={{ width: '400px', marginBlockEnd: '20px' }}>
            <Descriptions title="带图标名称显示" />
            <IconSelect value={value} onChange={(v) => setValue(v)} />
          </div>
          <div style={{ width: '400px', marginBlockEnd: '20px' }}>
            <Descriptions title="图标模式可点击修改" />
            <IconSelect model={'simple'} value={value} onChange={(v) => setValue(v)} />
          </div>

          <div style={{ width: '400px' }}>
            <Descriptions title="图标回显不可修改" />
            <IconShow ico={value} size={48} />
          </div>
        </Col>
        <Col
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          className="gutter-row"
          span={12}
        >
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            <Typography.Text type="success" code>
              {`import { IconSelect, IconShow } from 'ui';`}
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`图标选择器
<IconSelect />
 图标回显
 <IconShow ico={value} size={48} />`}
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`参数设置：
 图标选择器：
 {
    /** 显示模式 simple:简约 */
    model?: 'simple' | undefined;
 }`}
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
};
export default AddMenus;
