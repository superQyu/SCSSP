import React, { createElement, useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button, Spin, Empty } from 'antd';
import type { InputRef } from 'antd';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  /** 监听值状态变化 */
  onChange: (state: any) => void;
  /** 监听loading状态变化 */
  onLoadingStatus?: (state: boolean) => void;
  /** 新增选项 */
  afterAddItem?: (state: any) => void;
  /** 字典key */
  dictkey?: string;
  [key: string]: any;
}

interface SelectOption {
  id?: number | string;
  name?: string;
  type?: string;
  [key: string]: any;
}

const DictSelect: React.FC<Props> = ({
  dictKey,
  dropdownExtend,
  onLoadingStatus,
  afterAddItem,
  onChange,
}: Props) => {
  const { server } = useBasicConfiguration();
  //  api server
  const { basic: B } = server;

  const [items, setItems] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const loadData = async () => {
    const res = await B.getDictType({ dictType: dictKey });
    setItems(res.list as SelectOption[]);
    setLoading(false);
  };

  const onFocusSelect = () => {
    if (items.length == 0) {
      setLoading(true);
      loadData();
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const newItem = { key: name, value: name, label: name };
    setItems([...items, newItem]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    afterAddItem && afterAddItem(newItem);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    onLoadingStatus && onLoadingStatus(loading);
  }, [loading]);

  return (
    <Select
      style={{ width: '100%' }}
      allowClear
      placeholder="请选择"
      notFoundContent={
        loading ? (
          <Space
            style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '130px' }}
          >
            <Spin />
          </Space>
        ) : (
          <Empty />
        )
      }
      onFocus={onFocusSelect}
      dropdownRender={(menu) => (
        <>
          {menu}
          {typeof dropdownExtend === 'boolean' ? (
            dropdownExtend ? (
              <>
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ width: '100%', padding: '0 8px 4px' }}>
                  <Input
                    placeholder="输入自定义选项"
                    ref={inputRef}
                    value={name}
                    disabled={loading}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button
                    disabled={loading}
                    type="primary"
                    icon={createElement(PlusOutlined)}
                    onClick={addItem}
                  >
                    新增
                  </Button>
                </Space>
              </>
            ) : (
              <></>
            )
          ) : (
            <>{dropdownExtend}</>
          )}
        </>
      )}
      options={items}
      onChange={onChange}
    />
  );
};

export default DictSelect;
