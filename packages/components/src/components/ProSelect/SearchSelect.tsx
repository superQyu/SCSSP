import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
// import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  // fetchOptions: (search: string) => Promise<ValueType[]>;
  fetchOptions: (search: string) => any;
  debounceTimeout?: number;
}

const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps) => {
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
      filterOption={false}
      showSearch={true}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
};

interface SelectOption {
  label: string;
  value: string;
}
interface Props {
  placeholder?: string;
  value?: any;
  onChange?: any;
  // request: (search: string) => Promise<SelectOption[]>;
  request: (search: string) => any;
}

export default (props: Props) => {
  const { value, onChange } = props;
  return (
    <DebounceSelect
      // mode="multiple"
      style={{ width: '100%' }}
      placeholder={props.placeholder}
      value={value}
      fetchOptions={props.request}
      onChange={(newValue) => {
        // console.log('当前选择项', newValue)
        // setValue(newValue as SelectOption[]);
        onChange(newValue);
      }}
    />
  );
};
