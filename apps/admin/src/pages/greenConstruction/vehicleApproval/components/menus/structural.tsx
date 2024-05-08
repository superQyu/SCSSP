import React, { useState, useEffect, useRef } from 'react';
import { Button, InputNumber, message, Modal, DatePicker } from 'antd';
import type { GetProp, TreeSelectProps } from 'antd';

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import dayjs from 'dayjs';

import DictSelect from '@/components/DictSelect';
import { AdForm, FormColumnsTypes } from 'components';

import { RebuildTree, flattenArray, sortMenu } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange: (state: boolean) => void;
}

type MenusType = {
  [key: string]: any;
};

type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

const AddMenus: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  const { server, config } = useBasicConfiguration();

  //  api server
  const { user: U, menus: M, sites: S } = server;
  const { PLATFORMID } = config as Record<string, any>;
  const _DefParams = {
    status: '0',
    parentId: `${PLATFORMID}`,
    type: '1',
  };
  // 字段提示

  // const [formKey,setFormKey] = useState<string>('新建菜单');
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('车辆信息');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
  const [menus, setMenus] = useState<MenusType>({ ..._DefParams });
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const ItemTooltip = (tips: string | Array<string>) => {
    if (typeof tips === 'string') tips = [tips];
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* @ts-ignore  */}
        <ExclamationCircleTwoTone style={{ color: '#1677ff', marginRight: '5px' }} />
        <div style={{ display: 'inline-block' }}>
          {tips.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    );
  };
  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    formRef.current?.resetFields();
  };
  const handleOk = async () => {
    try {
      const values: MenusType = await formRef.current?.validateFields();
      setLoading(true);

      let params = values;
      if (menus.id) params = { ...menus, ...values };

      M[isCreate ? 'createMenu' : 'updateMenu'](JSON.parse(JSON.stringify({ ...params })))
        .then(() => {
          message.success('操作成功！');
          setLoading(false);
          onStateChange(false);
          onReset();
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
  };
  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    setOpen(false);
    onReset();
    onStateChange(false);
  };
  const onFormChange = (_: MenusType) => {};



  const onLoadTreeData = async () => {
    const res = await S.menuList();
    // * 筛选出 华光智慧监管 平台 id:2583  相关菜单表
    const M =
      RebuildTree(res, {
        intercept: (item: { [key: string]: string }) => ({ ...item, children: item.routes }),
      }).filter((item) => item.id === PLATFORMID)[0] || {};
    const roorId = M[0]?.id || 0;
    const menus = RebuildTree(flattenArray([M]), {
      delEmptyRoutes: true,
      intercept: (item: { [key: string]: string }) => {
        return {
          ...item,
          children: item.routes,
          key: item.id,
          value: item.id,
          title: item.name,
        };
      },
      _rootId: roorId,
    });
    setTreeData([...sortMenu(menus)]);
  };

  useEffect(() => {
    setOpen(openModal);
    if (openModal) {
      setMenus({ ..._DefParams, ...(!Object.entries(subForm).length ? {} : subForm) });
      onLoadTreeData();
    } else {
      formRef.current?.resetFields();
    }
  }, [openModal]);

  useEffect(() => {
    setIsCreate(!(menus.id || menus.id === 0));
  }, [menus]);

  useEffect(() => {}, [subForm]);

  useEffect(() => {
    formRef.current?.resetFields(['component']);
  }, [menus.type]);

  const columns: FormColumnsTypes[] = [
    {
      label: '车牌号',
      dataIndex: 'parentId',
      formItemProps: {
        rules: [{ required: true, message: '请输入车牌号' }],
      },
      colNum: 12,
    },
    {
      label: '行驶证号',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入行驶证号' }],
      },
      colNum: 12,
    },
    {
      label: '品牌',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入品牌' }],
      },
      colNum: 12,
    },
    {
      label: '型号',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入型号' }],
      },
      colNum: 12,
    },
    {
      label: '车型',
      dataIndex: 'type',
      formItem: <DictSelect dictKey={'pm_educational'} />,
      formItemProps: {
        rules: [{ required: true, message: '请选择车型' }],
      },
      colNum: 12,
    },
    {
      label: '车辆颜色',
      dataIndex: 'type',
      formItemProps: {
        rules: [{ required: true, message: '请输入车辆颜色' }],
      },
      colNum: 12,
    },

    {
      label: '车辆识别代号/车架号',
      dataIndex: 'sort',

      formItemProps: {
        rules: [{ required: true, message: '请输入车辆识别代号/车架号' }],
      },
      colNum: 12,
    },
    {
      label: '发动机号',
      dataIndex: 'sort',

      formItemProps: {
        rules: [{ required: true, message: '请输入发动机号' }],
      },
      colNum: 12,
    },
    {
      label: '能源种类',
      dataIndex: 'sort',

      formItemProps: {
        rules: [{ required: true, message: '请输入能源种类' }],
      },
      colNum: 12,
    },
    {
      label: '核定载客',
      dataIndex: 'sort222',
      formItem: <InputNumber min={1} style={{ width: '100%' }} />,
      formItemProps: {
        rules: [{ required: true, message: '请输入核定载客' }],
      },
      colNum: 12,
    },
    {
      label: '年审时间',
      dataIndex: 'expiressEnd',
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
        rules: [{ required: true, message: '请选择年审时间' }],
      },
      colNum: 12,
    },
    {
      label: '保险时间',
      dataIndex: 'expiressEnd',
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
        rules: [{ required: true, message: '请选择保险时间' }],
      },
      colNum: 12,
    },
  ];

  return (
    <Modal
      width={'50%'}
      open={open}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={handleCancel} disabled={loading}>
          取消
        </Button>,
        <Button key="reset" htmlType="reset" onClick={onReset} disabled={loading}>
          重置
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          {isCreate ? '提交' : '更新'}
        </Button>,
      ]}
    >
      <AdForm
        key={`${JSON.stringify(subForm)}`}
        loadingTitle="提交中..."
        formRef={formRef}
        initialValues={{ ...menus }}
        loading={loading}
        labelAlign="left"
        onFormChange={onFormChange}
        columns={columns}
      />
    </Modal>
  );
};
export default AddMenus;
