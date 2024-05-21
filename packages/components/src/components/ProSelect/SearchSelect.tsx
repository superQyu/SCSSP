import React, { useMemo, useRef, useState, forwardRef } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps, RefSelectProps } from 'antd';
// import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  // fetchOptions: (search: string) => Promise<ValueType[]>;
  fetchOptions: (search: string) => any;
  debounceTimeout?: number;
}

const DebounceSelect = forwardRef(
  (
    { fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps,
    ref: React.Ref<RefSelectProps>
  ) => {
    // 只有第一次输入文字后，才会进行选项的加载
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState<any>([]);
    // const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
      // return debounce(loadOptions, debounceTimeout);
      // 文本框输入值变化时的回调

      const loadOptions = (value: string) => {
        // fetchRef.current += 1;
        // const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);

        fetchOptions(value).then((newOptions: any) => {
          // if (fetchId !== fetchRef.current) {
          //   // for fetch callback order
          //   return;
          // }

          setOptions(newOptions);
          setFetching(false);
        });
      };
      return loadOptions;
    }, [fetchOptions, debounceTimeout]);

    return (
      <Select
        // labelInValue
        ref={ref}
        filterOption={false}
        showSearch={true}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    );
  }
);

interface SelectOption {
  label: string;
  value: string;
}
interface Props {
  placeholder?: string;
  value?: any;
  onChange?: any;
  // request: (search: string) => Promise<SelectOption[]>;
  /* 输入内容发生变化时的回调 */
  request: (search: string) => any;
  /* 获取输入焦点时的回调 */
  onFocus?: any;
  /** 选择器最小宽度 */
  popupMatchSelectWidth?: boolean | number;
}

export default forwardRef((props: Props, ref: React.Ref<RefSelectProps>) => {
  const { value, onChange, onFocus } = props;
  return (
    <DebounceSelect
      ref={ref}
      // mode="multiple"
      style={{ width: '100%' }}
      popupMatchSelectWidth={props.popupMatchSelectWidth}
      placeholder={props.placeholder}
      value={value}
      fetchOptions={props.request}
      onChange={(newValue) => {
        // console.log('当前选择项', newValue)
        // setValue(newValue as SelectOption[]);
        onChange(newValue);
      }}
      onFocus={onFocus}
    />
  );
});
