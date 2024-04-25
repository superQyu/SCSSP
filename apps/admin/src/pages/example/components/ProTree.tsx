import React, { useState, useEffect, useRef } from 'react';
import { ProTree } from 'components';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import { Descriptions, Col, Row, Typography } from 'antd';

interface Props {}

type MenusType = {
  [key: string]: any;
};

const AddMenus: React.FC<Props> = () => {
  const { server, config } = useBasicConfiguration();
  const { sites: S } = server;

  const { PLATFORMID } = config as Record<string, any>;
  const treeRef = useRef<any>(null);
  const [menus, setMenus] = useState<MenusType>({ menuIds: [] });
  const [treeNodes, SetTreeNodes] = useState([]);
  const handlerChange = (key: string, val: any) => setMenus({ ...menus, [key]: val });
  const onLoadTreeData = async () => {
    const res = await S.simpleMenuList();
    SetTreeNodes(res);
  };

  useEffect(() => {
    onLoadTreeData();
  }, []);

  return (
    <>
      <Row style={{ width: '100%', height: 'calc(100% - 75px)' }} gutter={16}>
        <Col
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          className="gutter-row"
          span={12}
        >
          <div style={{ width: '400px' }}>
            <Descriptions title="不带选择框" />
            <ProTree
              ref={treeRef}
              treeNodes={treeNodes}
              topToolBar={true}
              defSelected={menus.menuIds}
              onStateChange={(checked: (string | number)[]) => handlerChange('menuIds', checked)}
            />
          </div>
        </Col>
        <Col
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          className="gutter-row"
          span={12}
        >
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            <Typography.Text type="success" code>
              {`import { ProTree } from 'components';`}
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`<ProTree
  ref={treeRef}
  treeNodes={treeNodes}
  topToolBar={true}
  defSelected={menus.menuIds}
  onStateChange={(checked: (string | number)[]) => handlerChange('menuIds', checked)}
/>`}
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`参数设置：
 {
    /** tree结构数据  */
    treeNodes: TreeNodes[];
    /** 结构数据 是否为ree结构还是扁平数据 */
    flat?: boolean;
    /** 是否展开 */
    expandAll?: boolean;
    /** 初始化默认项 */
    defSelected?: CheckedsType | boolean;
    /** 是否显示辅助工具 */
    topToolBar?: boolean;
    /** 表单初始化 */
    subForm?: Record<string, any>;
    /** 监听Modal状态变化 */
    onStateChange?: (state: CheckedsType) => void;
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
