import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken } from 'utils';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setMenuTab } from 'store';

import styled from 'styled-components';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface Item {
  label: string;
  key: string;
}

const CustomTabs = styled(Tabs)(() => ({
  '& .ant-tabs-nav': {
    padding: '2px 0',
    'margin-block-end': 0,
    'border-block-start': '1px solid rgba(0, 0, 0, 0.06)',
    '& .ant-tabs-nav-wrap': {
      padding: '0 10px',
    },
  },
}));

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
      if (menuTab.length > 1) remove(targetKey);
    }
  };

  useEffect(() => {
    getToken('BREADCRUMBS') && setActiveKey(JSON.parse(getToken('BREADCRUMBS')).key);
  }, [getToken('BREADCRUMBS')]);

  return (
    <CustomTabs
      size="small"
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={menuTab}
      hideAdd={true}
    />
  );
};
