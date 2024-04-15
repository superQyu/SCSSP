import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken } from 'utils';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setMenuTab } from 'store';
import style from './style.module.scss';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface Item {
  label: string;
  key: string;
}

export default () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    common: { menuTab },
  } = useAppSelector((state) => state) as { common: { menuTab: any } };
  const [activeKey, setActiveKey] = useState('');

  const onChange = (newActiveKey: string) => {
    const breadcrumbs = menuTab.find((item: Item) => item.key == newActiveKey);
    navigate(newActiveKey);
    setActiveKey(newActiveKey);
    setToken('BREADCRUMBS', JSON.stringify(breadcrumbs));
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    menuTab.forEach((item: Item, i: number) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = menuTab.filter((item: Item) => item.key !== targetKey);
    dispatch(setMenuTab(newPanes));
    if (newPanes.length && newActiveKey === targetKey) {
      newActiveKey = lastIndex >= 0 ? newPanes[lastIndex].key : newPanes[0].key;
    }
    setActiveKey(newActiveKey);
    const breadcrumbs = menuTab.find((item: Item) => item.key == newActiveKey);
    setToken('BREADCRUMBS', JSON.stringify(breadcrumbs));
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
    getToken('BREADCRUMBS') && setActiveKey(JSON.parse(getToken('BREADCRUMBS')).key);
  }, [getToken('BREADCRUMBS')]);

  return (
    <div class={style.menuTab}>
      <Tabs
        size="small"
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={menuTab}
        hideAdd={true}
      />
    </div>
  );
};
