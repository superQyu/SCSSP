import { useState } from 'react';
import { Card, Flex, Drawer } from 'antd';

import Left from './Left';
import Right from './Right';

export default () => {
  const [code, setCode] = useState<number>();
  const [visible, setVisible] = useState(false);

  // 打开抽屉
  const showDrawer = () => {
    setVisible(true);
  };

  // 关闭抽屉
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="custom-drawer-container">
      <Right code={code} />

      <Drawer
        title="自定义容器的抽屉"
        placement="right" // 抽屉方向（right/left/top/bottom）
        closable={true} // 是否显示关闭按钮
        onClose={onClose} // 关闭回调
        visible={visible} // 控制抽屉显隐
        // 关键配置：指定抽屉渲染到哪个容器
        getContainer={() =>
          document.querySelector('.custom-drawer-container')
        }
        // 或直接传 DOM 元素：getContainer={document.querySelector('.custom-drawer-container')}
      >
        <p>抽屉内容...</p>
      </Drawer>
      {/* <Flex className="h-full" gap={10}>
        <div className="flex-1 w-0 h-full">
          <Right code={code} />
        </div>
        <div className="w-170px bg-#F1F7FF h-full p-10px overflow-y-auto">
          <Left onSelect={(id: number) => setCode(id)} />
        </div>
      </Flex> */}
    </div>
  );
};
