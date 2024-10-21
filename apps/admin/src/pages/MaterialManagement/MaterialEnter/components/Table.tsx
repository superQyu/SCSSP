import { EditTable, ProUpload } from 'components';
import { useRef, useState, useImperativeHandle } from 'react';
import { type ProColumns } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  /** 表格的列 */
  columns: ProColumns[];
  /** 可编辑表格 DOM */
  actionRef?: any;
  /** 自定义的表格 ref,主要用来抛出自定义的方法 */
  tableRef?: any;
  /** 可编辑表格的 Form 的 DOM */
  editableFormRef?: any;
  /** 表格的静态数据 */
  tableData?: any[];
  /** 是否可以新增表格行 */
  noCreate?: boolean;
}

export default (props: Props) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { file } = server;

  // 可编辑表格 DOM
  const actionRef = useRef<any>();
  useImperativeHandle(props.actionRef, () => actionRef.current);
  // 自定义的表格 ref,主要用来抛出自定义的方法
  const tableRef = useRef<any>();
  useImperativeHandle(props.tableRef, () => tableRef.current);
  // 可编辑表格的 Form 的 DOM
  const editableFormRef = useRef<any>();
  useImperativeHandle(
    props.editableFormRef,
    () => editableFormRef.current
  );

  // 控制上传按钮是否显示
  const [showUploadButton, setShowUploadButton] =
    useState<boolean>(false);
  // 暂存当前编辑行的图片, 用来在取消时重置
  const [attachment, setAttachment] = useState([]);
  // 暂存当前编辑行的图片, 用来在取消时重置
  const [acceptAttachment, setAcceptAttachment] = useState([]);

  // 控制是否刷新ProUpload
  const [refresh, setRefresh] = useState<boolean>(false);

  // 可编辑表格扩展项中表头的显示逻辑
  const expandTitle1 = (record: any) => {
    // 如果点击了编辑, 统一展示合格证件
    if (
      showUploadButton &&
      tableRef.current.getCurrentRow() == record.id
    ) {
      return <div>合格证件</div>;
    } else {
      if (!record.attachment?.length) {
        return <div className="color-red">暂无合格证件</div>;
      } else {
        return <div>合格证件</div>;
      }
    }
  };
  const expandTitle2 = (record: any) => {
    // 如果点击了编辑, 统一展示验收单
    if (
      showUploadButton &&
      tableRef.current.getCurrentRow() == record.id
    ) {
      return <div>验收单</div>;
    } else {
      if (!record.acceptAttachment?.length) {
        return <div className="color-red">暂无验收单</div>;
      } else {
        return <div>验收单</div>;
      }
    }
  };

  return (
    <EditTable
      // key={`${detail.materialsEnterDetailsSaveReqVOS}`}
      ref={tableRef}
      actionRef={actionRef}
      editableFormRef={editableFormRef}
      headerTitle="物料列表"
      columns={[
        ...props.columns,
        {
          title: '操作',
          width: 100,
          valueType: 'option',
          dataIndex: 'option',
          render: (
            _text: any,
            record: any,
            _: any,
            action: any
          ) => [
            <a
              key="editable"
              onClick={async () => {
                // console.log('点击了编辑')
                setAttachment(record.attachment);
                setAcceptAttachment(record.acceptAttachment);
                // 开启行编辑
                await action?.startEditable?.(record.id);
                // 设置是否展示上传按钮
                setShowUploadButton(true);
                // 展开该行
                // 获取当前编辑的行 id
                const id = tableRef.current.getCurrentRow();
                if (record.id == id) {
                  // 如果当前编辑行的id 和 点击编辑的那一行是同一行
                  tableRef.current.setExpandedRow(id);
                }
              }}
            >
              编辑
            </a>,
            <>
              {!props.noCreate && (
                <Popconfirm
                  key="delete"
                  title="删除此项"
                  onConfirm={() => {
                    // console.log('tableRef', tableRef);
                    tableRef.current?.removeRow(record);
                  }}
                  okText="确认"
                  cancelText="取消"
                >
                  <a>删除</a>
                </Popconfirm>
              )}
            </>,
          ],
        },
      ]}
      request={async (params = {}) => {
        // console.log('表格数据', detail);
        return {
          success: true,
          data: props.tableData || [],
          // total: res.total,
        };
      }}
      form={{
        ignoreRules: false,
      }}
      scroll={{ x: '100%' }}
      search={false}
      toolBarRender={() => [
        <>
          {!props.noCreate && (
            <Button
              icon={<PlusOutlined />}
              onClick={async () => {
                let id = (Math.random() * 1000000).toFixed(0);
                await actionRef.current?.addEditRecord(
                  {
                    id: id,
                    // title: '新的一行',
                  },
                  { position: 'top' }
                );
                setShowUploadButton(true);
                tableRef.current.setExpandedRow(id);
              }}
              type="primary"
            >
              新建
            </Button>
          )}
        </>,
      ]}
      editable={{
        onCancel: async (key: any, row: any, o: any, n: any) => {
          // console.log('取消了');
          setShowUploadButton(false);
          // 获取当前行 id
          const id = tableRef.current.getCurrentRow();
          // console.log('缓存的attachment', attachment);
          await editableFormRef.current?.setRowData(id, {
            attachment: attachment,
            acceptAttachment: acceptAttachment,
          });
          // 刷新 ProUpLoad
          setRefresh(!refresh);
        },
      }}
      expandable={{
        expandedRowRender: (record: any) => {
          return (
            <div className="flex">
              <div>
                {expandTitle1(record)}
                <ProUpload
                  key={`${refresh}`}
                  showUploadButton={
                    showUploadButton &&
                    tableRef.current.getCurrentRow() == record.id
                  }
                  onRequest={async (params: any) =>
                    await file.fileUpload(params)
                  }
                  onListChange={async (res: any) => {
                    if (showUploadButton) {
                      // console.log('文件列表改变', res);
                      const list = res.map(
                        (item: any) => item.url
                      );
                      // 获取当前行 id
                      const id =
                        tableRef.current.getCurrentRow();
                      // console.log('获取当前行 id', id, list);
                      id &&
                        (await editableFormRef.current?.setRowData(
                          id,
                          {
                            attachment: list.length
                              ? list
                              : null,
                          }
                        ));
                    }
                  }}
                  defaultFileList={() => {
                    // 用来初始化图片列表的初始值
                    const list = record.attachment?.map(
                      (item: string, index: number) => {
                        return {
                          uid: `${index}`,
                          name: item?.split('/')?.slice(-1)[0],
                          url: item,
                        };
                      }
                    );
                    return list || [];
                  }}
                />
              </div>
              <div className="ml-4">
                {expandTitle2(record)}
                <ProUpload
                  key={`${refresh}`}
                  showUploadButton={
                    showUploadButton &&
                    tableRef.current.getCurrentRow() == record.id
                  }
                  onRequest={async (params: any) =>
                    await file.fileUpload(params)
                  }
                  onListChange={async (res: any) => {
                    if (showUploadButton) {
                      // console.log('文件列表改变', res);
                      const list = res.map(
                        (item: any) => item.url
                      );
                      // 获取当前行 id
                      const id =
                        tableRef.current.getCurrentRow();
                      console.log('id', id, list);
                      id &&
                        (await editableFormRef.current?.setRowData(
                          id,
                          {
                            acceptAttachment: list.length
                              ? list
                              : null,
                          }
                        ));
                    }
                  }}
                  defaultFileList={() => {
                    // 用来初始化图片列表的初始值
                    const list = record.acceptAttachment?.map(
                      (item: string, index: number) => {
                        return {
                          uid: `${index}`,
                          name: item?.split('/')?.slice(-1)[0],
                          url: item,
                        };
                      }
                    );
                    return list || [];
                  }}
                />
              </div>
            </div>
          );
        },
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};
