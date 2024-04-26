import React, { useState } from 'react';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { Descriptions, Col, Row, Typography, Alert } from 'antd';
import DictSelect from '@/components/DictSelect';

const AddMenus: React.FC = () => {
  const { config: C } = useBasicConfiguration();
  const { COMMON_STATUS } = C?.DICT_TYPE || {};

  const [value, setValue] = useState<string>('0');

  return (
    <>
      <Alert message={<>字典下拉选择器:{`<DictSelect/>`}</>} type="success" style={{ marginBlockEnd: '25px' }} showIcon />
      
      <Row style={{ width: '100%', height: 'calc(100% - 75px)' }} gutter={16}>
        <Col
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          className="gutter-row"
          span={12}
        >
          <div style={{ width: '320px', marginBottom: '10px' }}>
            <div style={{ marginBottom: '20px' }}>
              <Descriptions title="字典下拉菜单" />
              <DictSelect
                dictKey={`${COMMON_STATUS}`}
                value={value}
                dropdownExtend={false}
                onChange={(val) => setValue(val)}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Descriptions title="自定义添加按钮">
                <Descriptions.Item>
                  <Typography.Text style={{ whiteSpace: 'pre-wrap' }} type="success" code>
                    {`dropdownExtend={true}
 dropdownExtend 也可传入自定义组件`}
                  </Typography.Text>
                </Descriptions.Item>
              </Descriptions>
              <DictSelect
                dictKey={`${COMMON_STATUS}`}
                value={value}
                dropdownExtend={true}
                onChange={(val) => setValue(val)}
              />
            </div>
            <div>
              <Descriptions title="文本显示">
                <Descriptions.Item>
                  <Typography.Text style={{ whiteSpace: 'pre-wrap' }} type="success" code>
                    {`type={'text'}`}
                  </Typography.Text>
                </Descriptions.Item>
              </Descriptions>
              <DictSelect dictKey={`${COMMON_STATUS}`} value={value} type={'text'} />
            </div>
          </div>
        </Col>
        <Col
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          className="gutter-row"
          span={12}
        >
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            <Typography.Text type="success" code>
              {`import DictSelect from '@/components/DictSelect/index.tsx';`}
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`<DictSelect
    dictKey={'SYSTEM_DATA_SCOPE'}
    value={'0'}
    initValue={'menus'}
    dropdownExtend={false}
    onChange={(val) => console.log(val)}
    type={'text'}
/>`}
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`参数设置：
{
    /** 监听值状态变化 */
    onChange?: (state: any) => void;
    /** 监听loading状态变化 */
    onLoadingStatus?: (state: boolean) => void;
    /** 新增选项 */
    afterAddItem?: (state: any) => void;
    /** 字典key */
    dictkey?: string;
    /** 格式化下拉菜单样式 */
    valueEnum?: Record<string, any>;
    /** 显示模式*/
    type?: string;
    /** 绑定tree dom */
    ref?: any;
  }`}
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
};
export default AddMenus;
