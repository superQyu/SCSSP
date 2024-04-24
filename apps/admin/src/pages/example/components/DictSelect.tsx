import React, { useState } from 'react';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { Descriptions, Col, Row, Typography } from 'antd';
import DictSelect from '@/components/DictSelect';

type MenusType = {
  [key: string]: any;
};

const AddMenus: React.FC = () => {
  const { config: C } = useBasicConfiguration();
  const { COMMON_STATUS, SYSTEM_DATA_SCOPE } = C?.DICT_TYPE || {};

  const [menus, _] = useState<MenusType>({ dataScope: '' });

  return (
    <>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div style={{ width: '400px', marginBottom: '10px' }}>
            <Descriptions title="状态" />
            <DictSelect
              dictKey={`${COMMON_STATUS}`}
              initValue={`${menus.dataScope}`}
              dropdownExtend={false}
              onChange={(val) => console.log(val)}
            />
          </div>
          <div style={{ width: '400px' }}>
            <Descriptions title="权限" />
            <DictSelect
              dictKey={`${SYSTEM_DATA_SCOPE}`}
              initValue={`${menus.dataScope}`}
              dropdownExtend={false}
              onChange={(val) => console.log(val)}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            <Typography.Text type="success" code>
              {`import DictSelect from '@/components/DictSelect/index.tsx';`}
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`<DictSelect
    dictKey={'SYSTEM_DATA_SCOPE'}
    initValue={'menus'}
    dropdownExtend={false}
    onChange={(val) => console.log(val)}
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
