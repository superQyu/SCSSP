import { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Button, message, Popconfirm, Form } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { type ActionType } from '@ant-design/pro-components';
import { AdForm, ProUpload } from 'components';
import dayjs from 'dayjs';
import EditTable from './Table';
import initColumns from '../models/form.model';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

// 代表任意对象
type MenusType = {
  [key: string]: any;
};
interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 监听 Modal 状态变化 */
  onStateChange: (state: boolean) => void;
  // 当为详情表单时, 有该属性
  detail?: MenusType;
  /**
   * 当前点击的哪个按钮
   * 0: 点击编辑按钮, 此时仅有验收数量不可编辑
   * 1: 点击验收按钮, 此时仅有验收数量和两个图片可编辑
   */
  status: string;
}
export default (props: Props) => {
  const { openModal, onStateChange, detail = {} } = props;
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialExit } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState([]);

  // 表单 DOM
  const formRef = useRef<FormInstance>(null);
  // 自定义的表格 ref,主要用来抛出自定义的方法
  const tableRef = useRef<any>();
  // 可编辑表格的 Form 的 DOM
  const editableFormRef = useRef<any>();

  const { formColumns, tableColumns } = initColumns(
    tableRef,
    editableFormRef,
    props.status
  );

  // 单位信息表单的默认值
  const [formData, setFormData] = useState<MenusType>({
    exitDate: detail.exitDate && dayjs(detail.exitDate),
    exitPersonnel: detail.exitPersonnel,
    witnessPersonnel: detail.witnessPersonnel,
    supplierDepartment: detail.supplierDepartment,
    manufacturer: detail.manufacturer,
    purchaserDepartment: detail.purchaserDepartment,
    exitReason: detail.exitReason,
  });

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  useEffect(() => {
    const list =
      detail.materialsExitDetailsWithInventoryRespVOS?.map(
        (item: any) => {
          return {
            ...item,
            attachment: item.attachment?.split('@'),
          };
        }
      );
    setTableData(list);
    // console.log('detail', detail)
  }, []);

  // 点击重置
  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    formRef.current?.resetFields();
  };

  // 点击保存
  const handleOk = async () => {
    const editRow = tableRef.current.getCurrentRow();
    if (editRow) {
      message.error('有未保存行, 请先保存');
      return;
    }
    const materialsExitSaveReqVO: MenusType =
      await formRef.current?.validateFields();
    materialsExitSaveReqVO.id = detail.id;

    const table = tableRef.current?.getTableData();
    if (!table.length) {
      message.error(
        '当前未填写物料信息, 请至少添加一条物料信息'
      );
      return;
    }
    const materialsExitDetailsSaveReqVOS = table.map(
      (item: any) => {
        return {
          ...item,
          materialExitId: detail.id,
          attachment: item.attachment?.join('@'),
        };
      }
    );

    // 清点时需要进行的校验
    if (props.status == '1') {
      try {
        materialsExitDetailsSaveReqVOS.map((item: any) => {
          if (!item.trueExitNumber) {
            throw new Error(
              '有物料的清点数量未填写, 请完善数据'
            );
          }
        });
      } catch (error: any) {
        message.error(error.message);
        return;
      }
    }

    const values = {
      materialsExitSaveReqVO,
      materialsExitDetailsSaveReqVOS,
    };
    setLoading(true);

    if (props.status == '11') {
      materialExit
        .materialExamine({
          materialsEnterId: detail.id,
          isConfirm: '通过',
        })
        .then(() => {
          message.success('操作成功！');
          setLoading(false);
          onStateChange(false);
          onReset();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      let api;
      if (props.status == '0') {
        api = detail.id ? 'updateExit' : 'createExit';
      } else {
        api = 'materialAccept';
      }
      console.log('values', values);
      materialExit[api](values)
        .then(() => {
          message.success('操作成功！');
          setLoading(false);
          onStateChange(false);
          onReset();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  // 点击取消
  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    setOpen(false);
    onReset();
    onStateChange(false);
  };

  return (
    <>
      <Modal
        open={open}
        title={detail.id ? '编辑' : '新增'}
        width={'100%'}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            disabled={loading}
          >
            取消
          </Button>,
          <Button
            key="reset"
            htmlType="reset"
            onClick={onReset}
            disabled={loading}
          >
            重置
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {detail.id ? '更新' : '提交'}
          </Button>,
        ]}
      >
        <div
          className="h-70vh p-inline-4"
          style={{ overflow: 'hidden auto' }}
        >
          <div className="flex justify-center">
            <div className="w-1000px">
              <AdForm
                loadingTitle="提交中..."
                formRef={formRef}
                initialValues={formData}
                loading={loading}
                labelAlign="left"
                columns={formColumns}
              />
            </div>
          </div>
          <EditTable
            tableRef={tableRef}
            editableFormRef={editableFormRef}
            columns={tableColumns}
            tableData={tableData}
            status={props.status}
          />
        </div>
      </Modal>
    </>
  );
};
