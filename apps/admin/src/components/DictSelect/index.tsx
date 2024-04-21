import React, {
  useImperativeHandle,
  forwardRef,
  createElement,
  useState,
  useRef,
  useEffect,
} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button, Spin, Empty } from 'antd';
import type { InputRef } from 'antd';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  /** 监听值状态变化 */
  onChange?: (state: any) => void;
  /** 监听loading状态变化 */
  onLoadingStatus?: (state: boolean) => void;
  /** 新增选项 */
  afterAddItem?: (state: any) => void;
  /** 字典key */
  dictkey?: string;
  /** 初始化选项 */
  initValue?: any;
  /** 格式化下拉菜单样式 */
  valueEnum?: Record<string, any>;
  /** 绑定tree dom */
  ref?: any;
  [key: string]: any;
}

interface SelectOption {
  id?: number | string;
  name?: string;
  type?: string;
  [key: string]: any;
}

const DictSelect: React.FC<Props> = forwardRef(
  (
    {
      dictKey,
      dropdownExtend,
      onLoadingStatus,
      afterAddItem,
      onChange,
      valueEnum,
      initValue,
    }: Props,
    ref
  ) => {
    const { server } = useBasicConfiguration();
    //  api server
    const { basic: B } = server;

    const [defaultValue, setDefaultValue] = useState(null);
    const [items, setItems] = useState<SelectOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const fetchRemoteData = async (key: string) => {
      try {
        const response = await B.getDictType({ dictType: key });
        return response;
      } catch (error) {
        return [];
      }
    };

    const loadData = async () => {
      const res = await fetchRemoteData(dictKey);
      setItems(res.list as SelectOption[]);
      setLoading(false);
      setDefaultValue(initValue);
    };

    const onFocusSelect = () => {
      if (items.length == 0) {
        setLoading(true);
        // loadData();
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
    }, []);

    useEffect(() => {
      onLoadingStatus && onLoadingStatus(loading);
    }, [loading]);

    // 暴露API
    useImperativeHandle(ref, () => ({
      remoteData: fetchRemoteData,
    }));

    return (
      <>
        <Select
          key={defaultValue}
          style={{ width: '100%' }}
          allowClear
          placeholder="请选择"
          defaultValue={defaultValue}
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
          onChange={onChange}
          options={items}
          optionRender={({ value, label }) => {
            if (valueEnum && value && valueEnum[value].text) return valueEnum[value].text;
            return label;
          }}
          labelRender={(record) => {
            const { value, label } = record;
            if (valueEnum && value && valueEnum[value].text) {
              return valueEnum[value].text;
            }
            return label;
          }}
        />
      </>
    );
  }
);

export default DictSelect;
