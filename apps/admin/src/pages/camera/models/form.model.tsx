import { useState, useEffect, useRef } from 'react';

import { FormColumnsTypes, ProUpload, SearchSelect } from 'components';
import { Select, Button, Input, Radio, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { RefSelectProps } from 'antd';

import DictSelect from '@/components/DictSelect';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (formRef: any) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList } = server;

  // 控制当前选择所需新建的类别
  const [type, setType] = useState('1');
  // 一级分类的值
  const [firstLevelCode, setFirstLevelCode] = useState();

  const firstSelect = useRef<any>();

  useEffect(() => {
    // getSelectOptions(type);
    // console.log('type改变', type, formRef);
    formRef.current?.resetFields(['firstLevelCode', 'secondLevelCode', 'levelCode', 'levelName']);
  }, [type]);

  const formColumns: FormColumnsTypes[] = [
    {
      label: '新建类别',
      dataIndex: 'type',
      formItem: (
        <Radio.Group onChange={(e) => setType(e.target.value)} buttonStyle="solid">
          <Radio.Button value="1">一级类别</Radio.Button>
          <Radio.Button value="2">二级类别</Radio.Button>
          <Radio.Button value="3">三级类别</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      label: '一级类别',
      dataIndex: 'firstLevelCode',
      show: type != '1',
      formItemProps: {
        rules: [{ required: true, message: '请选择一级类别' }],
        validateStatus: 'validating',
        extra: '请输入关键字进行搜索'
      },
      formItem: (
        <SearchSelect
          ref={firstSelect}
          placeholder="请选择一级类别"
          request={async (input) => {
            const res = await materialList.getAllFirstList({
              firstLevelName: input,
            });
            // console.log('一级类别下拉选项', res);
            const options = res.map((item: any) => {
              return {
                label: item.firstLevelName,
                value: item.firstLevelCode,
              };
            });
            return options;
          }}
          onChange={(select: any) => {
            // console.log('当前选项', select)
            setFirstLevelCode(select);
          }}
        />
      ),
    },
    {
      label: '二级类别',
      dataIndex: 'secondLevelCode',
      show: type == '3',
      formItemProps: {
        rules: [{ required: true, message: '请选择二级类别' }],
        validateStatus: 'validating',
        extra: '请输入关键字进行搜索'
      },
      formItem: (
        <SearchSelect
          placeholder="请选择二级类别"
          request={async (input) => {
            const res = await materialList.getAllSecondList({
              firstLevelCode: firstLevelCode,
              secondLevelName: input,
            });
            // console.log('二级类别下拉选项', res);
            const options = res.map((item: any) => {
              return {
                label: item.secondLevelName,
                value: item.secondLevelCode,
              };
            });
            return options;
          }}
          onFocus={(e: any) => {
            if (!formRef.current?.getFieldValue('firstLevelCode')) {
              message.warning('请先选择一级类别');
              // console.log('事件对象', e, firstSelect);
              e.target.blur();
              firstSelect.current?.focus();
            }
          }}
        />
      ),
    },
    {
      label: '类别码',
      dataIndex: 'levelCode',
      formItem: <Input placeholder="请输入类别码" />,
    },
    {
      label: '类别名称',
      dataIndex: 'levelName',
      formItem: <Input placeholder="请输入类别名称" />,
    },
  ];

  return formColumns;
};
