import { useEffect, useState } from 'react';

import { type ProColumns } from '@ant-design/pro-components';
import { Select, Tag, Button, Switch } from 'antd';
import { Text } from 'components';
import dayjs from 'dayjs';
import DictSelect from '@/components/DictSelect';
import { useRoute } from 'hooks';

import { type modalType } from './model';

type objJson = Record<string, any>;

interface MenusPropsType {
  /** 表格 DOM */
  actionRef: any;
  /** 用来获取 api */
  server?: objJson;
  /** 控制弹窗的开启和关闭 */
  handleModalStateChange?: ModalState.ModalStateChange<modalType>;
}

export default (props: MenusPropsType) => {
  const { actionRef, server, handleModalStateChange } = props;

  const { tabNavigate, getRouteName } = useRoute();

  const { flowModel } = server as objJson;

  const columnWidth = 208;

  // 分包单位选择下拉
  const [subcontractorList, setSubcontractorList] = useState([]);
  // 班组长选择下拉
  const [personInfoList, setPersonInfoList] = useState([]);

  useEffect(() => {
    getSelectOptions();
  }, []);

  // 通过接口获取下拉框的内容
  const getSelectOptions = async () => {
    // const res1 = await subContractor.getAllSubContractor();
    // // console.log('分包商列表', res1);
    // const list1 = res1.map((item: any) => {
    //   return { label: item.realName, value: item.id };
    // });
    // setSubcontractorList(list1);
    // const res2 = await certificate.getPersonInfoList();
    // // console.log('班组长列表', res2);
    // const list2 = res2.map((item: any) => {
    //   return { label: item.name, value: item.id };
    // });
    // setPersonInfoList(list2);
  };

  // 更新状态操作
  const handleChangeState = async (checked: boolean, row: any) => {
    // console.log('checked', checked);
    const state = checked ? 1 : 2;
    // 修改状态的二次确认
    const id = row.id;
    const statusState = state === 1 ? '激活' : '挂起';
    const content = '是否确认' + statusState + '流程名字为"' + row.name + '"的数据项?';
    const told = confirm(content);
    if (told) {
      // 发起修改状态
      await flowModel.updateModelState({ id, state });
      // 刷新列表
      await actionRef.current?.reload();
    } else {
      // 取消后，进行恢复按钮
      row.processDefinition.suspensionState = state === 1 ? 2 : 1;
    }
  };

  const columns: ProColumns[] = [
    {
      title: '流程标识',
      dataIndex: 'key',
      fixed: 'left',
      ellipsis: true,
      width: 150,
      // hideInSearch: true,
    },
    {
      title: '流程名称',
      dataIndex: 'name',
      ellipsis: true,
      width: columnWidth,
      // hideInSearch: true,
      render: (_, record) => (
        <a
          onClick={() => {
            handleModalStateChange && handleModalStateChange({ state: true, type: 'flowChart' });
            // console.log('点击了编辑')
            // handleModalStateChange(true);
            // action?.startEditable?.(record.id);
            // setDetail(record);
          }}
        >
          {record.name}
        </a>
      ),
    },
    {
      title: '流程分类',
      dataIndex: 'category',
      ellipsis: true,
      width: columnWidth,
      // hideInSearch: true,
      render: (_, record) => (
        <>
          {record.category == '2' ? (
            <Tag color="green">OA</Tag>
          ) : (
            <Tag color="processing">默认</Tag>
          )}
        </>
      ),
      renderFormItem: () => {
        return <DictSelect dictKey="bpm_model_category" />;
      },
    },
    {
      title: '表单信息',
      /**
       * 10 表示流程表单
       * 点击后打开弹窗，弹窗内容和流程表单的详情弹窗一样
       * 20 表示业务表单
       * 点击后跳转至一个新的路由, 即发起流程时的创建路由
       */
      dataIndex: 'formType',
      ellipsis: true,
      width: 280,
      hideInSearch: true,
      render: (_, record) => (
        <>
          {record.formType == 10 ? (
            <a
              key="editable"
              onClick={() => {
                // console.log('点击了编辑')
                handleModalStateChange &&
                  handleModalStateChange({ state: true, type: 'formCreate' });
                // action?.startEditable?.(record.id);
                // setDetail(record);
              }}
            >
              {record.formName}
            </a>
          ) : record.formType == 20 ? (
            <a
              key="editable"
              onClick={() => {
                // console.log('点击了编辑')
                const name = getRouteName(record.formCustomCreatePath);
                tabNavigate({ namePath: name, routePath: record.formCustomCreatePath });
                // handleModalStateChange(true);
                // action?.startEditable?.(record.id);
                // setDetail(record);
              }}
            >
              {record.formCustomCreatePath}
            </a>
          ) : (
            <span>暂无表单</span>
          )}
        </>
      ),
    },
    {
      title: '创建时间',
      valueType: 'dateRange',
      dataIndex: 'createTime',
      ellipsis: {
        showTitle: true,
      },
      width: columnWidth,
      hideInSearch: true,
      render: (_, record) => {
        const text = record.createTime && dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss');
        return <Text ellipsis={{ tooltip: text }}>{text}</Text>;
      },
    },
    {
      title: '最新部署的流程定义',
      // dataIndex: 'createTime',
      ellipsis: {
        showTitle: true,
      },
      width: columnWidth,
      hideInSearch: true,
      children: [
        {
          title: '流程版本',
          dataIndex: ['processDefinition', 'version'],
          ellipsis: {
            showTitle: true,
          },
          width: columnWidth,
          hideInSearch: true,
          render: (_, record) => (
            <>
              {record.processDefinition ? (
                <Tag color="processing">v{record.processDefinition.version}</Tag>
              ) : (
                <Tag color="warning">未部署</Tag>
              )}
            </>
          ),
        },
        {
          title: '激活状态',
          dataIndex: ['processDefinition', 'version'],
          ellipsis: {
            showTitle: true,
          },
          width: columnWidth,
          hideInSearch: true,
          render: (_, record) => {
            const state = record.processDefinition?.suspensionState == 1 ? true : false;
            return (
              <>
                {record.processDefinition && (
                  <Switch
                    checked={state}
                    onChange={(checked: boolean) => handleChangeState(checked, record)}
                  />
                )}
              </>
            );
          },
        },
        {
          title: '部署时间',
          // valueType: 'dateRange',
          dataIndex: 'deploymentTime',
          ellipsis: {
            showTitle: true,
          },
          width: columnWidth,
          hideInSearch: true,
          render: (_, record) => {
            const text =
              record.processDefinition &&
              dayjs(record.processDefinition?.deploymentTime).format('YYYY-MM-DD HH:mm:ss');
            return <Text ellipsis={{ tooltip: text }}>{text}</Text>;
          },
        },
      ],
    },
  ];

  return columns;
};
