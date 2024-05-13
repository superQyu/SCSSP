import { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react';

import SingleTitle from '@/components/SingleTitle';

import { InputNumber } from 'antd';

import { EditableProTable } from '@ant-design/pro-components';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';

import DictSelect from '@/components/DictSelect';

type DataSourceType = {
  _id: React.Key;
};

const defaultData: DataSourceType[] = [];

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
  //   const { server, config: C } = useBasicConfiguration();

  const [menus, setMenus] = useState<MenusType>({});
  const [formKey, _] = useState<string>('projectBuildingInfoSaveReqVOList');
  const [getFormKey] = useState<string>('projectBuildingInfoRespVOList');

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const formRef = useRef<ProFormInstance<any>>();
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
    },
    {
      title: '类型',
      dataIndex: 'typeCode',
      valueType: 'select',
      renderFormItem: () => <DictSelect dictKey={`type_name`} dropdownExtend={false} />,
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
      width: 120,
      fixed: 'right',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== record.id),
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  useImperativeHandle(ref, () => ({
    key: formKey,
    sourceKey: getFormKey,
    form: {
      validateFields: () => {
        return new Promise((resolve, _) => {
          resolve(dataSource);
        });
      },
    },
  }));

  return (
    <>
      <SingleTitle label={'单位楼座信息'} />
      <EditableProTable<DataSourceType>
        rowKey="_id"
        recordCreatorProps={{
          position: 'bottom',
          record: () => ({ _id: Date.now() }),
          creatorButtonText: '新增数据',
          onClick: () => {},
        }}
        loading={false}
        toolBarRender={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          // onSave: async (rowKey, data, row) => {
          //   console.log(rowKey, data, row);
          // },
          onChange: setEditableRowKeys,
          onlyAddOneLineAlertMessage: '请先结束上次操作！',
        }}
        // maxLength={5}
        scroll={{
          x: 1200,
        }}
      />
    </>
  );
});
export default DefultForm;
