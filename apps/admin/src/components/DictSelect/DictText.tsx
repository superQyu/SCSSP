import React, { createElement, forwardRef, useState, useEffect, useContext } from 'react';
import { Divider, Input, Select, Space, Button, Spin, Empty } from 'antd';
import { AuthContext, useAppDispatch, useAppSelector } from 'hooks';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import { EllipsisOutlined } from '@ant-design/icons';

interface Props {
  value: string;
  dictKey: string;
}

interface SelectOption {
  id?: number | string;
  name?: string;
  type?: string;
  [key: string]: any;
}

const DictText: React.FC<Props> = ({ value, dictKey }: Props) => {
  const { server } = useBasicConfiguration();
  const { basic: B } = server;

  const {
    common: { dictionary },
  } = useAppSelector((state) => state) as { common: { dictionary: Record<string, any> } };
  const dispatch = useAppDispatch();
  const { saveDicts } = useContext(AuthContext);

  const [showLabel, setShowLabel] = useState<string>('');

  const loadData = async () => {
    console.log(dictionary);

    if (dictionary.hasOwnProperty(dictKey)) {
      let curItem = (dictionary[dictKey] as SelectOption[]).filter((item) => {
        return item.value == value;
      });
      setShowLabel(curItem[0]?.label || '');
    } else {
      const res = await B.getDictType({ dictType: dictKey });
      console.log('res.list', res.list);
      saveDicts(dispatch, { [`${dictKey}`]: res.list });
    }
  };

  useEffect(() => {
    // setShowLabel(value);
    loadData();
  }, []);

  return <>{showLabel != '' ? showLabel : createElement(EllipsisOutlined)}</>;
};
export default DictText;
