import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'components';

import { Descriptions, Col, Row, Typography, Alert, Input } from 'antd';
import type { TreeDataNode } from 'antd';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import ApiListSummary from '@/apis'

console.log(ApiListSummary)
interface Props {}

const ApiList: React.FC<Props> = () => {
  const { server, config } = useBasicConfiguration();
  //  api server
  const { sites: S } = server;
  const { PLATFORMID } = config as Record<string, any>;

  const [menus, setMenus] = useState({ selected: '' });
  const [treeNodes, SetTreeNodes] = useState<any[]>([]);

  const onLoadTreeData = async () => {
    const res = await S.menuList();
    SetTreeNodes([...res]);
  };

  const getSelectedNodes = (node: TreeDataNode[]) => {
    let selected = '';
    if (node) selected = node.map((item) => `${item.key}:${item.title}`).join(';');
    setMenus({ ...menus, selected });
  };

  useEffect(() => {
    onLoadTreeData();
  }, []);

  return (
    <>
      <Alert
        message={'Api 接口列表汇总'}
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
          <div style={{ width: '400px', height: '140px', marginBlockEnd: '20px' }}>
            <Descriptions title="下拉选择框">
              <Descriptions.Item>
                <Typography.Text style={{ whiteSpace: 'pre-wrap' }} type="success" code>
                  {`下拉树控件:model={'select'}`}
                </Typography.Text>
              </Descriptions.Item>
            </Descriptions>
            <TreeSelect
              treeDefaultExpandedKeys={[PLATFORMID]}
              platforId={PLATFORMID}
              flat={true}
              onChange={(v: string) => console.log(v)}
              model={'select'}
              treeNodes={treeNodes}
              rootStyle={{ maxHeight: 320, overflow: 'auto' }}
              expandAll={true}
            />
          </div>
          <div style={{ width: '400px', height: '370px' }}>
            <Descriptions title="树选择">
              <Descriptions.Item>
                <Typography.Text style={{ whiteSpace: 'pre-wrap' }} type="success" code>
                  {`树控件:model={'tree'}
 onChange: (nodes:TreeDataNode[])=>void 
 返回的是当前节点的原始数据 false代表取消选择
`}
                </Typography.Text>
              </Descriptions.Item>
            </Descriptions>
            <div style={{ display: 'flex', marginBlockEnd: '10px' }}>
              <Typography.Title style={{ width: '80px' }} level={5}>
                已选中:
              </Typography.Title>
              <Input value={menus.selected} disabled defaultValue="Hello, antd!" />
            </div>
            <TreeSelect
              treeDefaultExpandedKeys={[PLATFORMID]}
              platforId={PLATFORMID}
              flat={true}
              onChange={getSelectedNodes}
              model={'tree'}
              treeNodes={treeNodes}
              rootStyle={{ maxHeight: 320, overflow: 'auto' }}
              serach={true}
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
              {`import { TreeSelect } from 'components';`}
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`<TreeSelect
  treeDefaultExpandedKeys={[PLATFORMID]}
  platforId={PLATFORMID}
  flat={true}
  onChange={getSelectedNodes}
  model={'tree'}
  treeNodes={treeNodes}
  rootStyle={{ maxHeight: 320, overflow: 'auto' }}
  serach={true}
/>`}
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`参数设置：
 {
  /** 数据源 */
  treeNodes?: TreeDataNode[];
  /** 是否开启搜索 */
  serach?: boolean;
  /** 显示模式  */
  model?: 'tree' | 'select';
  /** 结构数据 是否为ree结构还是扁平数据 */
  flat?: boolean;
  /** 显示指定的数据 源ID*/
  platforId?: string | number;
  /**  */
  treeDefaultExpandedKeys?: string[];
  /** Tree 最外层的 style */
  rootStyle?: CSSProperties;
  /** 是否全部展开 */
  expandAll?: boolean;
  /** 高亮占据整行 */
  blockNode?: boolean;
 }`}
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
};
export default ApiList;
