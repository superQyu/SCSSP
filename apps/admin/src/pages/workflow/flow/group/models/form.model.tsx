import { useState, useEffect } from 'react';

import { FormColumnsTypes, ProUpload } from 'components';
import { Select, DatePicker, Input, Radio } from 'antd';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (subFormRef: any) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { systemUser } = server;

  // 成员选择下拉
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    getSelectOptions();
  }, []);

  // 通过接口获取下拉框的内容
  const getSelectOptions = async () => {
    const res1 = await systemUser.getSimpleUserList();
    // console.log('分包商列表', res1);
    const list1 = res1.map((item: any) => {
      return { label: item.nickname, value: item.id };
    });
    // console.log('分包商列表', list1);
    setUserList(list1);
  };

  const formColumns: FormColumnsTypes[] = [
    {
      label: '组名',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入组名' }],
      },
    },
    {
      label: '描述',
      dataIndex: 'description',
      formItem: <Input.TextArea placeholder="请输入描述" />,
    },
    {
      label: '成员',
      dataIndex: 'memberUserIds',
      formItemProps: {
        rules: [{ required: true, message: '请选择成员' }],
      },
      formItem: (
        <Select mode="multiple" showSearch={false} placeholder="请选择成员" options={userList} />
      ),
    },
    {
      label: '状态',
      dataIndex: 'status',
      formItemProps: {
        rules: [{ required: true, message: '请选择状态' }],
      },
      formItem: (
        <Radio.Group name="radiogroup">
          <Radio value="0">开启</Radio>
          <Radio value="1">关闭</Radio>
        </Radio.Group>
      ),
    },
  ];
  return formColumns;
};
