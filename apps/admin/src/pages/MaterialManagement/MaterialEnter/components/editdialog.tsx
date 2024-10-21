import { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Button, message, Popconfirm, Form } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { type ActionType } from '@ant-design/pro-components';
import { AdForm, ProUpload } from 'components';
import dayjs from 'dayjs';
import EditTable from './Table';
import initColumns from '../models/form.model';
import { toUrlArr } from '@/utils/transform';
import { ReloadButton } from './Styled';

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
  /** 当为详情表单时, 有该属性 */
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
  const { materialEnter } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [storageModalOpen, setStorageModalOpen] =
    useState<boolean>(false);
  const [reloadModalOpen, setReloadModalOpen] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState([]);

  // 表单 DOM
  const formRef = useRef<FormInstance>(null);
  // 自定义的表格 ref,主要用来抛出自定义的方法
  const tableRef = useRef<any>();
  // 主要用来刷新表格
  const actionTableRef = useRef<any>();
  // 可编辑表格的 Form 的 DOM
  const editableFormRef = useRef<any>();

  // 表单项配置
  // 只能放在外面, 因为调用该方法中使用 hook, 只能放在函数式组件的外部
  const { formColumns, tableColumns } = initColumns(
    tableRef,
    editableFormRef,
    props.status
  );

  // 分包商信息表单的默认值
  const [formData, setFormData] = useState<MenusType>({
    carNo: detail.carNo,
    enterDate: detail.enterDate && dayjs(detail.enterDate),
    deliveryMan: detail.deliveryMan,
    deliveryContact: detail.deliveryContact,
    materialMan: toUrlArr(detail.materialMan, ','),
    // supplierDepartment: detail.supplierDepartment,
    // manufacturer: detail.manufacturer,
    purchaserDepartment: detail.purchaserDepartment,
  });

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  useEffect(() => {
    const list =
      detail.materialsDetailsWithInventoryRespVOS?.map(
        (item: any) => {
          return {
            ...item,
            attachment: toUrlArr(item.attachment, '@'),
            acceptAttachment: toUrlArr(
              item.acceptAttachment,
              '@'
            ),
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
    // console.log('当前尚在编辑的行', editRow);
    if (editRow) {
      message.error('有未保存行, 请先保存');
      return;
    }
    const materialsEnterSaveReqVO: MenusType =
      await formRef.current?.validateFields();
    materialsEnterSaveReqVO.enterDate =
      materialsEnterSaveReqVO.enterDate.valueOf();
    materialsEnterSaveReqVO.id = detail.id;
    materialsEnterSaveReqVO.materialMan =
      materialsEnterSaveReqVO.materialMan?.join(',');

    const table = tableRef.current?.getTableData();
    // console.log('所有表格数据', table);
    if (!table.length) {
      message.error(
        '当前车辆未填写物料信息, 请至少添加一条物料信息'
      );
      return;
    }
    const materialsEnterDetailsSaveReqVOS = table.map(
      (item: any) => {
        // console.log('item.attachment', item.attachment)
        return {
          // 如果 id 为number, 则是编辑
          id: typeof item.id == 'number' ? item.id : undefined,
          materialEnterId: detail.id,
          // carNo: item.carNo,
          materialsInventoryId: item.materialsInventoryId,
          materialType: item.materialType,
          enterNumber: item.enterNumber,
          acceptNumber: item.acceptNumber,
          attachment: item.attachment?.join('@'),
          acceptAttachment: item.acceptAttachment?.join('@'),
        };
      }
    );
    // 验收时需要进行的校验
    if (props.status == '1') {
      try {
        materialsEnterDetailsSaveReqVOS.map((item: any) => {
          if (!item.acceptNumber) {
            throw new Error(
              '有物料的实际验收数量未填写, 请完善数据'
            );
          }
        });
      } catch (error: any) {
        message.error(error.message);
        return
      }
    }
    const values = {
      materialsEnterSaveReqVO,
      materialsEnterDetailsSaveReqVOS,
    };
    // console.log('表单提交时的数据', values);
    setLoading(true);
    let api;
    if (props.status == '0') {
      api = detail.id ? 'updateEnter' : 'createEnter';
    } else {
      api = 'materialAccept';
    }
    materialEnter[api](values)
      .then(() => {
        message.success('操作成功！');
        setLoading(false);
        onStateChange(false);
        onReset();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // 点击取消
  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    if (props.status == '0') {
      setStorageModalOpen(true);
    } else {
      setOpen(false);
      onReset();
      onStateChange(false);
    }
  };

  // 暂存表单信息至浏览器
  const handleStorageOk = () => {
    const editRow = tableRef.current.getCurrentRow();
    // console.log('当前尚在编辑的行', editRow);
    if (editRow) {
      message.error('有未保存行, 请先保存');
      return;
    }
    const materialsEnterSaveReqVO: MenusType =
      formRef.current?.getFieldsValue(true);
    materialsEnterSaveReqVO.enterDate =
      materialsEnterSaveReqVO.enterDate.valueOf();
    // materialsEnterSaveReqVO.id = detail.id;
    materialsEnterSaveReqVO.materialMan =
      materialsEnterSaveReqVO.materialMan?.join(',');
    // console.log('所有表单数据', materialsEnterSaveReqVO);

    const table = tableRef.current?.getTableData();
    // console.log('所有表格数据', table);
    const materialsEnterDetailsSaveReqVOS = table.map(
      (item: any) => {
        // console.log('item.attachment', item.attachment)
        return {
          // 如果 id 为number, 则是编辑
          ...item,
          // id 是可编辑表格必备的东西
          // 但是为了加载缓存时取消关联性, 故存为 string
          id: `${item.id}`,
          // materialEnterId: detail.id,
          // carNo: item.carNo,
          materialsInventoryId: item.materialsInventoryId,
          materialType: item.materialType,
          enterNumber: item.enterNumber,
          attachment: item.attachment?.join('@'),
          acceptAttachment: item.acceptAttachment?.join('@'),
        };
      }
    );
    const values = {
      materialsEnterSaveReqVO,
      materialsEnterDetailsSaveReqVOS,
    };
    // console.log('暂存至浏览器的数据', values);
    localStorage.setItem(
      'materialEnter',
      JSON.stringify(values)
    );
    setStorageModalOpen(false);
    setOpen(false);
    onReset();
    onStateChange(false);
  };
  // 不暂存，并删除当前 暂存信息
  const handleStorageCancel = () => {
    localStorage.removeItem('materialEnter');
    setStorageModalOpen(false);
    setOpen(false);
    onReset();
    onStateChange(false);
  };
  // 将暂存信息加载至表单中
  const handleReloadOk = () => {
    const res = localStorage.getItem('materialEnter');
    // console.log('浏览器缓存数据', res);
    if (res) {
      const data = JSON.parse(res);
      // console.log('转换后的数据', data);
      const formData = data.materialsEnterSaveReqVO || {};
      formRef.current?.setFieldsValue({
        carNo: formData.carNo,
        enterDate:
          formData.enterDate && dayjs(formData.enterDate),
        deliveryMan: formData.deliveryMan,
        deliveryContact: formData.deliveryContact,
        materialMan: toUrlArr(formData.materialMan, ','),
        // supplierDepartment: detail.supplierDepartment,
        // manufacturer: detail.manufacturer,
        purchaserDepartment: formData.purchaserDepartment,
      });
      const tableData =
        data.materialsEnterDetailsSaveReqVOS || {};
      const list = tableData.map((item: any) => {
        return {
          ...item,
          attachment: toUrlArr(item.attachment, '@'),
          acceptAttachment: toUrlArr(item.acceptAttachment, '@'),
        };
      });
      setTableData(list);
      actionTableRef.current?.reload();
    }
    setReloadModalOpen(false);
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
          <span key="reload">
            {props.status == '0' && (
              <ReloadButton
                type="primary"
                onClick={() => setReloadModalOpen(true)}
                disabled={loading}
              >
                加载暂存
              </ReloadButton>
            )}
          </span>,
          <Button
            className="ml-8px"
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
            noCreate={props.status == '0' ? false : true}
            actionRef={actionTableRef}
            tableRef={tableRef}
            editableFormRef={editableFormRef}
            columns={tableColumns}
            tableData={tableData}
          />
        </div>
      </Modal>
      <Modal
        title="是否需要暂存当前信息"
        maskClosable={false}
        open={storageModalOpen}
        onOk={handleStorageOk}
        onCancel={handleStorageCancel}
      >
        <h3 className="color-red">注意</h3>
        <p>
          如果点击确定, 系统会暂存当前所有表单信息,
          并覆盖之前暂存的信息;
        </p>
        <p>
          如果点击取消, 系统会刷新暂存信息,
          即之前暂存的内容也会被删除。
        </p>
      </Modal>
      <Modal
        title="是否加载之前暂存的信息"
        maskClosable={false}
        open={reloadModalOpen}
        onOk={handleReloadOk}
        onCancel={() => setReloadModalOpen(false)}
      ></Modal>
    </>
  );
};
