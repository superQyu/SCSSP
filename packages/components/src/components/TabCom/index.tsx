import React, { useEffect, useRef, useState } from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface AppProps {
  // {data: []}
  [key: string]: any;
}
interface Item {
  label: string;
  key: string;
}

const App: React.FC = (props: AppProps) => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('');
  const [items, setItems] = useState(props.data);
  const newTabIndex = useRef(0);

  const onChange = (newActiveKey: string) => {
    navigate(newActiveKey);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item: Item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item: Item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
    props.render && props.render('newPanes');
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  useEffect(() => {
    setItems(props.data);
    if (props.data.length > 0) {
      setActiveKey(props.data[0].key);
    }
  });

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
      hideAdd={true}
    />
  );
};

export default App;
