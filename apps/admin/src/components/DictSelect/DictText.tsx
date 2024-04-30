import React, { useState, useEffect } from 'react';
import { useAppSelector } from 'hooks';

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
  const {
    common: { dictionary },
  } = useAppSelector((state) => state) as { common: { dictionary: Record<string, any> } };

  const [showLabel, setShowLabel] = useState<string>('');

  const loadData = async () => {
    const isExsit = dictionary.get(dictKey);

    if (isExsit) {
      let curItem = (isExsit as SelectOption[]).filter((item) => item.value == value);
      setShowLabel(curItem[0]?.label || '');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {showLabel != '' ? (
        showLabel
      ) : (
        // @ts-ignore
        <EllipsisOutlined />
      )}
    </>
  );
};
export default DictText;
