import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

interface Props {
  /* 描述列表的标题，显示在最顶部  */
  title?: 'string' | React.ReactNode;
  /* 描述布局 */
  layout?: 'horizontal' | 'vertical';
  /* 列表项内容 */
  items: DescriptionsProps['items'];
  /* 是否展示边框 */
  bordered?: boolean;
  /* 每行数量 */
  column?: number;
}

const App: React.FC<Props> = ({
  title = '',
  layout = 'horizontal',
  items = [],
  bordered = false,
  column = 3,
}) => (
  <Descriptions title={title} layout={layout} items={items} bordered={bordered} column={column} />
);

export default App;
