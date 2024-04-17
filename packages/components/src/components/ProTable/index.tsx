import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

export default (props: any) => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<Record<string, any>>
      columns={props.columns}
      request={props.request || false}
      actionRef={props.actionRef || actionRef}
      toolBarRender={props.toolBarRender}
      cardBordered
      editable={
        props.editable || {
          type: 'multiple',
        }
      }
      columnsState={
        props.columnsState || {
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {},
        }
      }
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
