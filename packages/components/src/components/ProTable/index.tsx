import React, {
  cloneElement,
  useRef,
  useState,
  useEffect,
} from 'react';
import { message } from 'antd';
import type {
  ActionType,
  ProColumns,
  ProTableProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import { useTableScroll } from './useTableScroll';
import DefModel from './model';

interface Props extends ProTableProps<any, any> {
  /** 滚轮的配置, {10, 10} */
  scroll?: any;
  actionRef?: any;
  editable?: {
    onSave: (row: any, originRow?: any) => Promise<any>;
    onDelete?: (id: any) => Promise<any>;
  };
  rowKey?: any;
  columns?: any[];
}

export default (props: Props) => {
  const actionRef = useRef<ActionType>();
  const domRef = useRef(null);
  const [srcollY, setSrcollY] = useState<string>('');

  // 重写save方法 阻止提交失败也退出编辑状态
  const onSave = async (...args: any[]) => {
    const [dom, id, row, originRow, b] = args;

    const onSaveRes = await props.editable
      ?.onSave({ ...row }, originRow)
      .then(async () => {
        message.success('更新成功！');
        await (props.actionRef || actionRef).current?.reload();
      });

    if (onSaveRes === false) {
      message.error('信息更新失败，请重新提交！');
      return false;
    }
    dom.cancelEditable(id);
    return true;
  };

  // 删除行
  const onDelete = async (...args: any[]) => {
    const [C, id, n] = args;
    const onDeleteRes =
      props.editable?.onDelete &&
      props.editable?.onDelete(id).then(async () => {
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
      <ProTable<Record<string, any>>
        className={props.className}
        showHeader={props.showHeader}
        columns={props.columns || initColumns}
        params={props.params || {}}
        beforeSearchSubmit={props.beforeSearchSubmit}
        request={props.request || undefined}
        actionRef={props.actionRef || actionRef}
        toolbar={props.toolbar || {}}
        toolBarRender={props.toolBarRender}
        cardBordered
        editable={{
          type: 'multiple',
          onSave,
          onDelete,
          actionRender: (...args: any[]) => {
            const [, config, defaultDom] = args;
            return [
              cloneElement(
                defaultDom.save as React.ReactElement,
                {
                  onSave: onSave.bind(null, config),
                }
              ),
              defaultDom.cancel,
              // 只有在传入 onDelete 时，才会渲染删除按钮
              props.editable?.onDelete &&
                cloneElement(
                  defaultDom.delete as React.ReactElement,
                  {
                    onDelete: onDelete.bind(null, config),
                  }
                ),
              // defaultDom.delete,
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
        onReset={props.onReset}
        rowClassName={props.rowClassName}
      />
    </div>
  );
};
