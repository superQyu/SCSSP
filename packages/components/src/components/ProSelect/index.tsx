import React, { createElement, useState, useRef, useEffect, useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button, Spin, Empty } from 'antd';
import type { InputRef } from 'antd';

interface Props {
  /** 监听值状态变化 */
  onChange?: (state: any) => void;
  /** 监听loading状态变化 */
  onLoadingStatus?: (state: boolean) => void;
  /** 新增选项 */
  afterAddItem?: (state: any) => void;
  /** 拉下菜单获取 */
  asyncData?: Function;
  /** 格式化下拉菜单样式 */
  valueEnum?: Record<string, any>;
  transform?: any;
  /** 绑定tree dom */
  ref?: any;
  /** 显示模式*/
  type?: string;
  [key: string]: any;
}

interface SelectOption {
  id?: number | string;
  name?: string;
  type?: string;
  [key: string]: any;
}

const AsyncSelect: React.FC<Props> = (
  {
    value,
    asyncData,
    dropdownExtend,
    onLoadingStatus,
    afterAddItem,
    onChange,
    valueEnum,
    transform,
    type,
  }: Props,
  ref
) => {
  const [items, setItems] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [showLabel, setShowLabel] = useState<string>('');

  const loadData = async () => {
    if (!asyncData) return;
    const list = await asyncData();
    if (transform?.formatter) {
      setItems(transform.formatter(list));
    } else {
      setItems(list as SelectOption[]);
    }
    if (type === 'text') {
      let curItem = (items as SelectOption[]).filter((item) => item.value == value);
      setShowLabel(curItem[0]?.label || '');
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

  useEffect(() => {
    loadData();
  }, [value]);

  useEffect(() => {
    onLoadingStatus && onLoadingStatus(loading);
  }, [loading]);

  return (
    <>
      {type && type === 'text' ? (
        <>{showLabel}</>
      ) : (
        <Select
          value={value}
          style={{ width: '100%' }}
          allowClear
          placeholder="请选择"
          notFoundContent={
            loading ? (
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  minHeight: '130px',
                }}
              >
                <Spin />
              </Space>
            ) : (
              <Empty />
            )
          }
          // onFocus={onFocusSelect}
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
          onChange={onChange}
          options={items}
          optionRender={({ value, label }) => {
            let v = `${value}`;
            if (valueEnum && typeof v != 'undefined' && valueEnum[v].text) return valueEnum[v].text;
            return label;
          }}
          labelRender={({ value, label }) => {
            let v = `${value}`;
            if (valueEnum && typeof v != 'undefined' && valueEnum[v].text) return valueEnum[v].text;
            return label;
          }}
        />
      )}
    </>
  );
};

export default AsyncSelect;
