import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button, message, Modal, Collapse, Upload, Flex, Select } from 'antd';
import { LeftOutlined, DeleteOutlined, AuditOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { AdForm, FormColumnsTypes } from 'components';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import siteModel from '../modes/info.model';
import styles from '../index.module.scss';
import type { ModesApi } from '../modes/model';
import { jobCategoryDanger } from '@/config';

interface Props {
  /** 表单初始化 */
  subForm: Record<string, any>;
  /** 监听Modal状态变化 */
  onStateChange: (any) => void;
  /** 监听确定按钮提交 */
  onSubmit: (state: ModesApi.PersonnelCertificateSaveReqVO[]) => void;
}

interface FileItem {
  uid: string;
  name: string;
  url: string;
}

interface workTypeItem {
  label: string;
  value: string;
  [key: string]: string;
}

interface FormData {
  jobCategory?: string;
  workTypeId?: string;
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

  const [formData, setFormData] = useState<FormData>({});
  const [ifcertificate, setIfcertificate] = useState<boolean>(false);
  const [collapseItem, setCollapseItem] = useState<ModesApi.PersonnelCertificateSaveReqVO[]>([]);
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [delIndex, setDelIndex] = useState<number>(-1);
  const [functionKey, setFunctionKey] = useState<'jobCategory' | 'workTypeId'>('jobCategory');
  const certificateRef = useRef<FormInstance[]>([]);
  const [activeKey, setActiveKey] = useState('');
  //  api server
  const { user: U, basic: B, person: P } = server;

  const { certificateColumns } = siteModel();

  const init = async () => {
    let options = [];
    if (subForm.workerType == '2') {
      const { list } = await B.getDictType({ dictType: 'pm_job_category' });
      options = list.map((item: workTypeItem) => {
        return {
          label: item.label,
          value: `${item.value}`,
          danger: jobCategoryDanger.some((el) => el.label == item.label),
        };
      });
    } else {
      const { list } = await P.workType();
      options = list.map((item: workTypeItem) => {
        return {
          label: item.name,
          value: `${item.id}`,
          danger: item.isSpecialWorkType,
        };
      });
    }
    const label = subForm.workerType == '2' ? '管理岗位' : '工人类型';
    setColumns([
      {
        label: `${label}`,
        dataIndex: `${functionKey}`,
        formItemProps: {
          rules: [{ required: true, message: `请选择${label}` }],
        },
        formItem: <Select options={options} placeholder={'请选择' + label} disabled />,
        colNum: 24,
      },
    ]);
    setOptions(options);
  };

  // 选择工种
  const workTypeClick = ({ value, danger = false }) => {
    const otherInfo = {
      ...formData,
      [functionKey]: value,
    };
    setFormData(otherInfo);
    onStateChange(otherInfo);
    setIfcertificate(danger);
    formRef.current?.setFieldsValue({
      [functionKey]: value,
    });
  };

  // 上传证书
  const uploadFile = (info: any) => {
    const formData = new FormData();
    formData.append('file', info.file);
    fetch('http://192.168.10.77:48081/admin-api/infra/file/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer 4249f7ebad4e4015a44bd4be6a1b8d69',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFileList([
          ...fileList,
          {
            uid: info.file.uid,
            name: info.file.name,
            url: res.data,
          },
        ]);
      });
  };

  const handleAddItem = () => {
    const newFile = fileList.at(-1) as FileItem;
    const collapseItemIdx = fileList.length - 1;
    setCollapseItem([
      ...collapseItem,
      {
        key: newFile.uid,
        label: <span className="h-44px font-700 color-#458FFF">{newFile.name}</span>,
        children: (
          <>
            <AdForm
              layout="horizontal"
              formRef={(el) => (certificateRef.current[collapseItemIdx] = el)}
              columns={certificateColumns}
            />
            <Flex justify="flex-end">
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                danger
                onClick={() => delIconClick(collapseItemIdx)}
              >
                删除
              </Button>
            </Flex>
          </>
        ),
      },
    ]);
    setActiveKey(newFile.uid);
  };

  const handleDelItem = () => {
    const newList = [...collapseItem];
    newList.splice(delIndex, 1);
    certificateRef.current[delIndex] = null;
    setCollapseItem(newList);
  };

  // 点击删除按钮
  const delIconClick = (index: number) => {
    const newList = [...fileList];
    newList.splice(index, 1);
    setDelIndex(index);
    setFileList(newList);
  };

  // 点击确定按钮
  const handleOk = async () => {
    const label = subForm.workerType == '2' ? '管理岗位' : '工人类型';
    let arr = [] as ModesApi.PersonnelCertificateSaveReqVO[];
    const refs = certificateRef.current.filter((item) => item != null);
    if (ifcertificate && !refs.length) {
      message.warning(`该${label}需上传证书信息`);
      return;
    }
    if (refs.length) {
      refs.forEach(async (el, index) => {
        if (el) {
          const elValue: MenusType = await el.validateFields();
          arr.push({ ...elValue, picture: fileList[index].url });
          onSubmit(arr);
          setOpen(false);
        }
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
    if (fileList.length > collapseItem.length) {
      handleAddItem();
    } else {
      handleDelItem();
    }
  }, [fileList]);

  useEffect(() => {
    const key = subForm.workerType == '2' ? 'jobCategory' : 'workTypeId';
    setFunctionKey(key);
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
        {options.map((item: workTypeItem) => {
          return (
            <Button
              key={item.value}
              type="default"
              danger={item.danger || false}
              style={
                formData[functionKey] == item.value
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
        <Flex justify={'space-between'} align={'center'} className="w-full">
          证书信息
          <Upload name="file" showUploadList={false} customRequest={(info) => uploadFile(info)}>
            <Button icon={<AuditOutlined />} className="bg-#67c23a color-#fff" size="large">
              上传证书
            </Button>
          </Upload>
        </Flex>
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
              const index = !isActive ? panelKey : -1;
              setActiveKey(index);
            }}
          />
        )}
      />
    </Modal>
  );
};
export default forwardRef(FunctionCom);
