import { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react';

import SingleTitle from '@/components/SingleTitle';

import { InputNumber, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { EditableProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import DictSelect from '@/components/DictSelect';

type DataSourceType = {
  _id: React.Key;
  [key: string]: any;
};

type MenusType = {
  [key: string]: any;
};

interface MenusPropsType extends MenusType {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: MenusType;
  /** 监听Modal状态变化 */
  onStateChange: (state: boolean) => void;
}

const DefultForm: React.FC<MenusPropsType> = forwardRef(({ subForm }, ref) => {
  const { server } = useBasicConfiguration();
  //  api server
  const { PMPM: P } = server;

  const [formKey, _] = useState<string>('projectBuildingInfoSaveReqVOList');
  const [getFormKey] = useState<string>('projectBuildingInfoRespVOList');

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [defaultData, setDefaultData] = useState<readonly DataSourceType[]>([]);

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '楼座',
      dataIndex: 'buildingName',
    },
    {
      title: '单元数',
      dataIndex: 'unitsNumber',
      renderFormItem: () => <InputNumber min={0} style={{ width: '100%' }} />,
    },
    {
      title: '地上层数',
      dataIndex: 'abovegroundNumber',
      renderFormItem: () => <InputNumber min={0} style={{ width: '100%' }} />,
    },
    {
      title: '地下层数',
      dataIndex: 'undergroundNumber',
      renderFormItem: () => <InputNumber min={0} style={{ width: '100%' }} />,
    },
    {
      title: '是否公共区域',
      width: 120,
      dataIndex: 'isPublic',
      valueType: 'select',
      renderFormItem: () => <DictSelect dictKey={`is_public`} dropdownExtend={false} />,
      render: (_, { isPublic }) => (
        <DictSelect type={'text'} value={isPublic} dictKey={`is_public`} dropdownExtend={false} />
      ),
    },
    {
      title: '类型',
      dataIndex: 'typeCode',
      valueType: 'select',
      renderFormItem: () => <DictSelect dictKey={`type_name`} dropdownExtend={false} />,
      render: (_, { typeCode }) => (
        <DictSelect type={'text'} value={typeCode} dictKey={`type_name`} dropdownExtend={false} />
      ),
    },
    {
      title: '排序',
      dataIndex: 'sortOrder',
      renderFormItem: () => <InputNumber min={0} style={{ width: '100%' }} />,
    },
    {
      title: '备注',
      width: 220,
      dataIndex: 'remarks',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 140,
      fixed: 'right',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            try {
              Modal.confirm({
                title: `删除操作`,
                icon: <ExclamationCircleFilled />,
                content: `确定删除项目 [${record.buildingName}]?`,
                okText: '删除',
                okType: 'danger',
                cancelText: '取消',
                onOk: async () => {
                  console.log(record)
                  if (record.id || record.id === 0) await P.deleteBuildingInfo({ id: record.id });

                  setDataSource(dataSource.filter((item) => item.id !== record.id || item._id !== record._id));
                },
                onCancel() { },
              });
            } catch (errorInfo) { }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  useEffect(() => {
    if (!!dataSource.length) return
    const isEmpty = !!Object.entries(subForm).length;
    const records =
      isEmpty && subForm.hasOwnProperty(getFormKey) ? [...(subForm[getFormKey] || [])] : [];
    const transRecords = records.map((item: any) => ({
      ...item,
      _id: item.id || item._id,
      isPublic: `${item.isPublic ? '1' : '0'}`,
      typeCode: `${item.typeCode}`,
    }));

    setDataSource(transRecords);
    setDefaultData(transRecords);
  }, [subForm]);


  useImperativeHandle(ref, () => ({
    key: formKey,
    sourceKey: getFormKey,
    form: {
      validateFields: () => {
        return new Promise((resolve, _) => {
          resolve(dataSource);
        });
      },
      resetTables: (isCancel: boolean) => {
        setDataSource(isCancel ? [] : defaultData);
      },
    },
    transform: (data: DataSourceType[]) => {
      return data.map((item) => ({
        ...item,
        isPublic: item.isPublic * 1,
        typeCode: item.typeCode * 1,
      }));
    },
  }));

  return (
    <>
      <SingleTitle label={'单位楼座信息'} />
      <EditableProTable<DataSourceType>
        rowKey="_id"
        actionRef={actionRef}
        recordCreatorProps={{
          position: 'bottom',
          record: () => ({ _id: Date.now() }),
          creatorButtonText: '新增数据',
          onClick: () => { },
        }}
        loading={false}
        toolBarRender={false}
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
          onlyAddOneLineAlertMessage: '请先结束上次操作！',
        }}
        scroll={{
          x: 1200,
        }}
      />
    </>
  );
});
export default DefultForm;
