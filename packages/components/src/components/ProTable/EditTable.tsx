import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { message } from 'antd';
import type { ActionType } from '@ant-design/pro-components';
import { EditableProTable, useRefFunction } from '@ant-design/pro-components';

import { useTableScroll } from './useTableScroll';
import DefModel from './model';

// 点击删除的相关方法
const loopDataSourceFilter = (data: readonly any[], id: React.Key | undefined): any[] => {
  return data
    .map((item) => {
      if (item.id !== id) {
        if (item.children) {
          const newChildren = loopDataSourceFilter(item.children, id);
          return {
            ...item,
            children: newChildren.length > 0 ? newChildren : undefined,
          };
        }
        return item;
      }
      return null;
    })
    .filter(Boolean) as any[];
};

export default forwardRef((props: any, ref: any) => {
  const actionRef = useRef<ActionType>();
  const domRef = useRef(null);
  const [srcollY, setSrcollY] = useState<string>('');

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly Record<string, any>[]>([]);

  // 初始化 表格列表项
  const initColumns = DefModel();

  // 重置 scroll
  const initSrcollY = () => {
    setSrcollY(
      useTableScroll({
        extraHeight: props.pagination ? 50 : 0,
        tableDom: domRef.current,
      })
    );
  };
  const scroll = () => {
    const { x, y } = props.scroll || {};
    let _y = !y ? undefined : y == 'auto' ? srcollY : y;
    return { x: x || undefined, y: _y };
  };

  // 删除行
  const removeRow = useRefFunction((record: any) => {
    setDataSource(loopDataSourceFilter(dataSource, record.id));
  });
  // 获取所有表格数据
  const getTableData = () => {
    return dataSource;
  };
  // 获取当前的正在编辑的行
  const getCurrentRow = () => {
    return editableKeys[0];
  };
  // 将删除方法暴露到 外部 ref 上
  useImperativeHandle(ref, () => {
    return {
      removeRow,
      getTableData,
      getCurrentRow,
    };
  });

  useEffect(() => {
    initSrcollY();
  }, [domRef]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      initSrcollY();
    });

    return () => {
      window.removeEventListener('resize', () => {
        initSrcollY();
      });
    };
  }, []);

  return (
    <div ref={domRef} style={{ width: '100%', height: '100%' }}>
      <EditableProTable<Record<string, any>>
        className={props.className}
        showHeader={props.showHeader}
        recordCreatorProps={false}
        columns={props.columns || initColumns}
        value={dataSource}
        onChange={setDataSource}
        params={props.params || {}}
        request={props.request || false}
        actionRef={props.actionRef || actionRef}
        editableFormRef={props.editableFormRef}
        toolbar={props.toolBar || {}}
        toolBarRender={props.toolBarRender}
        cardBordered
        editable={{
          // type: 'multiple',
          // onSave,
          editableKeys,
          onChange: (keys: any[], rows: any) => {
            // console.log('rows', keys, rows);
            setEditableRowKeys(keys);
          },
          actionRender: (...args: any[]) => {
            const [, config, defaultDom] = args;
            return [
              // cloneElement(defaultDom.save as React.ReactElement, {
              //   onSave: onSave.bind(null, config),
              // }),
              defaultDom.save,
              defaultDom.cancel,
            ];
          },
        }}
        rowKey={props.rowKey || 'id'}
        search={
          props.search
            ? {
                ...props.search,
                onCollapse: (v) => initSrcollY(),
              } || {
                labelWidth: 'auto',
                onCollapse: (v) => initSrcollY(),
              }
            : false
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
                return { ...values };
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
        scroll={{ ...scroll() }}
        expandable={props.expandable}
        onRow={props.onRow}
      />
    </div>
  );
});
