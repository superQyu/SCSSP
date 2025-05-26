import React, { useState, useEffect } from 'react';

import {
  ReloadOutlined,
  UndoOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import {
  Spin,
  Checkbox,
  Divider,
  Button,
  Card,
  Flex,
  message,
} from 'antd';
import type { CheckboxProps } from 'antd';

import styled from 'styled-components';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
const CheckboxGroup = Checkbox.Group;
// 创建样式化的 CheckboxGroup
const StyledCheckboxGroup = styled(CheckboxGroup)`
  width: 520px;
  & .ant-checkbox-group-item {
    width: 100%;
  }
`;

const UpdateLog: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [spinLoading, setSpinLoading] = useState<boolean>(false);
  const [list, setList] = useState<string[]>([]);
  const { server } = useBasicConfiguration();
  const { UpdateLog: G } = server;

  const [checkedList, setCheckedList] = useState<string[]>([]);

  const checkAll = list.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < list.length;

  const onChange = (list: any[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? list : []);
  };

  const updateToServer = async () => {
    if (checkedList.length === 0) return;
    try {
      const result = await G.SynchronizeFiles({
        paths: checkedList,
      });
      message.success('上传成功！');
      if (Array.isArray(result)) {
        const newList = list.filter(
          (item) => !result.includes(item)
        );
        setList(newList);
        setCheckedList([]);
      }
    } catch (err) {
      message.error('上传失败！');
    }
  };

  const pullCode = async () => {
    try {
      setSpinLoading(true);
      const result = await G.PullCode();
      setSpinLoading(false);
      message.success('更新成功！');
      if (result.code == 200) {
        await getList();
      }
    } catch (err) {
      message.error('更新失败！');
    }
  };

  const getList = async () => {
    try {
      setLoading(true);
      const list = await G.UpdateLog();
      setList(list.modifiedFiles);
      setLoading(false);
      message.success('刷新成功！');
    } catch (error) {
      message.success('刷新失败！');
    }
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <Flex gap="middle" align="start" vertical className="p-10">
      <Spin spinning={spinLoading} tip="更新中">
        <Card
          loading={loading}
          actions={[
            <Button
              type="primary"
              onClick={getList}
              icon={<ReloadOutlined />}
            >
              刷新
            </Button>,
            <Button
              type="primary"
              icon={<ArrowDownOutlined />}
              onClick={updateToServer}
              disabled={checkedList.length === 0}
            >
              更新至服务器
            </Button>,
            <Button
              type="primary"
              onClick={pullCode}
              icon={<UndoOutlined />}
            >
              拉取代码
            </Button>,
          ]}
          style={{ minWidth: 500 }}
        >
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            {checkedList.length !== list.length
              ? '全选'
              : '反选'}
          </Checkbox>
          <Divider />
          <StyledCheckboxGroup
            options={list}
            value={checkedList}
            onChange={onChange}
          />
        </Card>
      </Spin>
    </Flex>
  );
};

export default UpdateLog;
