import React, { useState, useEffect } from 'react';
import { useAppSelector } from 'hooks';
import { Divider, Flex, Tag } from 'antd';
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

const DictText: React.FC<Props> = ({
  value,
  dictKey,
}: Props) => {
  const {
    common: { dictionary },
  } = useAppSelector((state) => state) as {
    common: { dictionary: Record<string, any> };
  };

  const [showLabel, setShowLabel] = useState<string>('');
  const [color, setColor] = useState<string>('default');

  const loadData = async () => {
    const isExsit = dictionary.get(dictKey);

    if (isExsit) {
      let curItem = (isExsit as SelectOption[]).filter(
        (item) => item.value == value
      );
      setShowLabel(curItem[0]?.label || '');
      setColor(curItem[0]?.colorType || 'default');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {showLabel != '' ? (
        <Tag color={color}>{showLabel}</Tag>
      ) : (
        <EllipsisOutlined />
      )}
    </>
  );
};
export default DictText;
