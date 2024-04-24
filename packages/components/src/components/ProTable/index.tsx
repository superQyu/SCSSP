import React, { cloneElement, useRef } from 'react';
import { message } from 'antd';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import { SearchOutlined } from '@ant-design/icons';
import DefModel from './model';

export default (props: any) => {
  const actionRef = useRef<ActionType>();

  // 重写save方法 阻止提交失败也退出编辑状态
  const onSave = async (...args: any[]) => {
    const [C, id, n, a, b] = args;

    const onSaveRes = await props.editable.onSave({ ...n }).then(async () => {
      message.success('更新成功！');
      await (props.actionRef || actionRef).current?.reload();
    });

    if (onSaveRes === false) {
      message.error('信息更新失败，请重新提交！');
      return false;
    }
    C.cancelEditable(id);
    return true;
  };

  // 删除行
  const onDelete = async (...args: any[]) => {
    const [C, id, n] = args;
    const onDeleteRes = await props.editable.onDelete(id).then(async () => {
      await (props.actionRef || actionRef).current?.reload();
    });
    if (onDeleteRes === false) {
      return false;
    }
    C.cancelEditable(id);
    return true;
  };

  // 初始化 表格列表项
  const initColumns = DefModel();

  return (
    <ProTable<Record<string, any>>
      columns={props.columns || initColumns}
      request={props.request || false}
      actionRef={props.actionRef || actionRef}
      toolBarRender={props.toolBarRender}
      cardBordered
      editable={{
        type: 'multiple',
        onSave,
        onDelete,
        actionRender: (...args: any[]) => {
          const [, config, defaultDom] = args;
          return [
            cloneElement(defaultDom.save as React.ReactElement, {
              onSave: onSave.bind(null, config),
            }),
            defaultDom.cancel,
            cloneElement(defaultDom.delete as React.ReactElement, {
              onDelete: onDelete.bind(null, config),
            }),
            // defaultDom.delete,
          ];
        },
      }}
      rowKey={props.rowKey || 'id'}
      search={
        props.search || {
          labelWidth: 'auto',
        }
      }
      options={
        props.options || {
          setting: {
            listsHeight: 400,
          },
        }
      }
      form={
        props.form || {
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }
      }
      pagination={
        props.hasOwnProperty('pagination')
          ? props.pagination
          : {
              pageSize: 5,
              onChange: (page) => console.log(page),
            }
      }
      dateFormatter="string"
      headerTitle={props.headerTitle}
    />
  );
};
