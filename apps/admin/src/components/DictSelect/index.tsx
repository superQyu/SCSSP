import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Divider,
  Input,
  Select,
  Space,
  Button,
  Spin,
  Empty,
} from 'antd';
import type { InputRef } from 'antd';

import { useAppSelector } from 'hooks';
import { Tag } from 'antd/lib';

interface Props {
  /** 设置 Select 的模式为多选或标签	multiple | tags */
  mode?: undefined | 'multiple' | 'tags';
  /** 最多显示多少个 tag，响应式模式会对性能产生损耗 */
  maxTagCount?: number;
  /** 监听值状态变化 */
  onChange?: (state: any) => void;
  /** 监听loading状态变化 */
  onLoadingStatus?: (state: boolean) => void;
  /** 新增选项 */
  afterAddItem?: (state: any) => void;
  /** 字典key */
  dictKey?: string;
  /** 格式化下拉菜单样式 */
  valueEnum?: Record<string, any>;
  /** 绑定tree dom */
  ref?: any;
  /** 显示模式
   * 如果需要以文本格式显示，则传 text
   */
  type?: string;
  /** 只有 type 为 text 时生效
   * 控制文本是以 tag 显示，还是仅文本
   */
  isTag?: boolean;
  [key: string]: any;
}

interface SelectOption {
  id?: number | string;
  name?: string;
  type?: string;
  [key: string]: any;
}

const DictSelect: React.FC<Props> = (props, ref) => {
  const {
    value,
    dictKey,
    dropdownExtend,
    onLoadingStatus,
    afterAddItem,
    onChange,
    valueEnum,
    type,
    disabled,
    mode,
    maxTagCount,
  }: Props = props;

  const {
    common: { dictionary },
  } = useAppSelector((state: any) => state) as {
    common: { dictionary: Record<string, any> };
  };

  const [items, setItems] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [showLabel, setShowLabel] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('');

  const loadData = async () => {
    const isExsit = dictionary.get(dictKey);
    console.log('字典返回数据', isExsit);
    setItems(isExsit as SelectOption[]);

    // console.log('传入的value', value);
    const curItem = (isExsit as SelectOption[]).filter(
      (item) => item.value == value
    );
    // console.log('匹配的字典项', curItem);
    const label = curItem[0]?.label || '-';
    const color = (() => {
      const color = curItem[0]?.colorType;
      if (color == 'primary') return 'processing';
      else if (color == 'danger') return 'error';
      else return color;
    })();

    if (type === 'text') {
      setShowLabel(label);
      setTextColor(color);
    }
  };

  const onNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
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
    <span>
      {type && type === 'text' ? (
        props.isTag ? (
          <Tag color={textColor}>{showLabel}</Tag>
        ) : (
          <span>{showLabel}</span>
        )
      ) : (
        <Select
          // defaultValue={value}
          value={value}
          mode={mode}
          maxTagCount={maxTagCount}
          style={{ width: '100%' }}
          disabled={disabled}
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
                    <Space
                      style={{
                        width: '100%',
                        padding: '0 8px 4px',
                      }}
                    >
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
                        // @ts-ignore
                        icon={<PlusOutlined />}
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
            if (
              valueEnum &&
              typeof v != 'undefined' &&
              valueEnum[v].text
            )
              return valueEnum[v].text;
            return label;
          }}
          labelRender={({ value, label }) => {
            let v = `${value}`;
            if (
              valueEnum &&
              typeof v != 'undefined' &&
              valueEnum[v].text
            )
              return valueEnum[v].text;
            return label;
          }}
        />
      )}
    </span>
  );
};

export default DictSelect;
