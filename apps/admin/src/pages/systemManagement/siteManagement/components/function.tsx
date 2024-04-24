import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button, message, Modal, Collapse, Upload, Flex, Select } from 'antd';
import type { CollapseProps } from 'antd';

import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { AdForm, FormColumnsTypes } from 'components';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import siteModel from '../modes/info.model';
import styles from '../index.module.scss';
import type { ModesApi } from '../modes/model';

interface Props {
  /** 表单初始化 */
  subForm: Record<string, any>;
  /** 监听Modal状态变化 */
  onStateChange: (any) => void;
  /** 监听确定按钮提交 */
  onSubmit: (state: ModesApi.PersonnelCertificateSaveReqVO[]) => void;
}

type MenusType = {
  [key: string]: any;
};

const FunctionCom: React.FC<Props> = ({ onStateChange, subForm, onSubmit }: Props, ref) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { server } = useBasicConfiguration();
  const formRef = useRef<FormInstance>(null);

  const [title] = useState<string>('所属工种');
  const [columns, setColumns] = useState<FormColumnsTypes[]>([]);
  const [options, setOptions] = useState([]);

  const [formData, setFormData] = useState({});
  const [ifcertificate, setIfcertificate] = useState<boolean>(false);
  const [collapseItem, setCollapseItem] = useState<CollapseProps['items']>([]);
  const countRef = useRef(collapseItem);

  const certificateRef = useRef([]);
  const [activeKey, setActiveKey] = useState(0);

  //  api server
  const { user: U, basic: B, person: P } = server;

  const { certificateColumns } = siteModel();

  const init = async () => {
    if (subForm.workerType == '0') {
      // options= await B.getDictType({ dictType:  });
    } else {
      const { list } = await P.workType();
      const options = list.map((item) => {
        return {
          label: item.name,
          value: `${item.id}`,
          danger: item.isSpecialWorkType,
        };
      });
      setOptions(options);
      setColumns([
        {
          label: '工人类型',
          dataIndex: 'workTypeId',
          formItemProps: {
            rules: [{ required: true, message: '请选择工人类型' }],
          },
          formItem: <Select options={options} placeholder="请选择工人类型" disabled />,
          colNum: 24,
        },
      ]);
    }

    // const res = await B.getDictType({ dictType: dictKey });
  };

  // 选择工种
  const workTypeClick = ({ value, danger = false }) => {
    const otherInfo = {
      ...formData,
      workTypeId: value,
    };
    setFormData(otherInfo);
    onStateChange(otherInfo);
    setIfcertificate(danger);
    formRef.current?.setFieldsValue({
      workTypeId: value,
    });
  };
  const [file, setFiles] = useState<any[]>([]);
  // 上传证书
  const uploadFile = (info: any) => {
    console.log(info.file);
    setFiles([...file, info]);
  };

  // 删除证书
  const delCollapseItem = (id: number) => {
    const n = file;
    n.splice(id, 1);
    setFiles([]);
    // return;
    // const newList = [...collapseItem];
    // newList.splice(index, 1);
    // setCollapseItem(newList)
  };

  useEffect(() => {
    file.map(({ file: f }, index) => {
      const isExsit = collapseItem?.filter((item) => item.key == f.uid);
      if (!isExsit || isExsit.length === 0) {
        setCollapseItem([
          ...collapseItem,
          {
            key: `${f.uid}`,
            label: <span className="h-44px font-700 color-#458FFF">{f.name}</span>,
            children: (
              <>
                <AdForm
                  layout="horizontal"
                  formRef={(el) => (certificateRef.current[`${f.uid}`] = el)}
                  columns={certificateColumns}
                />
                <Flex justify="flex-end">
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={async () => delCollapseItem(index)}
                  >
                    {file.length}删除
                  </Button>
                </Flex>
              </>
            ),
          },
        ]);

        setActiveKey(file.uid);
      }
    });
    if (file.length === 0) setCollapseItem([]);

    console.log(file);
  }, [file]);

  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    formRef.current?.resetFields();
    onStateChange(open, {});
  };

  // 点击确定按钮
  const handleOk = async () => {
    let arr = [];
    if (ifcertificate && !certificateRef.current.length) {
      message.warning('该工人类型需上传证书信息');
      return;
    }
    if (certificateRef.current.length) {
      certificateRef.current.forEach(async (el) => {
        const elValue: MenusType = await el.validateFields();
        arr.push(elValue);
        onSubmit(arr);
        setOpen(false);
      });
    } else {
      setOpen(false);
    }
  };

  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    setOpen(false);
  };

  // 重置所有
  const resetAll = () => {
    formRef.current?.resetFields();
    setFormData({});
    setIfcertificate(false);
    setCollapseItem([]);
  };

  const setFormModal = (value: boolean) => setOpen(value);

  useEffect(() => {
    init();
  }, [subForm]);

  useImperativeHandle(ref, () => ({
    resetAll,
    setFormModal,
  }));

  return (
    <Modal
      open={open}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          确定
        </Button>,
        <Button key="back" onClick={handleCancel} disabled={loading}>
          取消
        </Button>,
      ]}
      width={'50%'}
    >
      <AdForm
        loadingTitle="提交中..."
        formRef={formRef}
        loading={loading}
        labelAlign="left"
        columns={columns}
      />
      <Flex wrap="wrap" gap="middle">
        {options.map((item) => {
          return (
            <Button
              key={item.value}
              type="default"
              danger={item.danger || false}
              style={
                formData.workTypeId == item.value
                  ? { color: '#379E04', background: 'rgba(103,194,58,0.2', border: 'none' }
                  : {}
              }
              onClick={() => workTypeClick(item)}
            >
              {item.label}
            </Button>
          );
        })}
      </Flex>

      <div className={styles.infoTitle}>
        证书信息
        <Upload
          name="file"
          showUploadList={false}
          customRequest={(info) => uploadFile(info, collapseItem)}
        >
          <Button>{collapseItem?.length}上传证书</Button>
        </Upload>
      </div>

      <Collapse
        activeKey={activeKey}
        items={collapseItem}
        bordered={false}
        style={{ background: '#fff' }}
        expandIconPosition="end"
        expandIcon={({ isActive, panelKey }) => (
          <LeftOutlined
            rotate={isActive ? 90 : 0}
            onClick={() => {
              if (!isActive) {
                setActiveKey(panelKey);
              } else {
                setActiveKey(-1);
              }
            }}
          />
        )}
      />
    </Modal>
  );
};
export default forwardRef(FunctionCom);
