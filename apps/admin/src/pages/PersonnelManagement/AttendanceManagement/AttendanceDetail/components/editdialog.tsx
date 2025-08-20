import { useState, useEffect, useRef } from 'react';
import {
  Modal,
  Image,
  message,
  Card,
  Table,
  Descriptions,
  Row,
  Col,
} from 'antd';
import { type ProColumns } from '@ant-design/pro-components';
import type { FormInstance } from 'antd/es/form';
import { AdForm } from 'components';
import styled from 'styled-components';
import { ProTable } from 'components';

const CustomDescriptions = styled(Descriptions)(() => ({
  '.ant-descriptions-view': {
    borderRadius: '8px 0 0 8px',
  },
  '.ant-card-body': {
    flex: 1,
    height: 0,
    padding: '10px 20px',
    overflowY: 'hidden',
  },
}));
const CustomDescriptions2 = styled(Descriptions)(() => ({
  height: '100%',
  '.ant-descriptions-view': {
    height: '100%',
    borderLeft: 'none!important',
    borderRadius: '0 8px 8px 0',
    table: {
      height: '100%',
      '.ant-descriptions-item-label': {
        span: {
          whiteSpace: 'nowrap',
        },
      },
    },
  },
}));

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  openModal: boolean;
  onStateChange: (state: boolean) => void;
}

type MenusType = {
  [key: string]: any;
};

export default ({ openModal, onStateChange }: Props) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { job } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = useRef<FormInstance>(null);

  // 表单的默认值
  const [initialValues] = useState<MenusType>({
    sort: 0,
    isSpecialWorkType: '0',
  });

  const columns = [
    {
      title: '考勤标识',
      dataIndex: 'attendanceIdentifier',
      key: 'attendanceIdentifier',
    },
    {
      title: '考勤时间',
      dataIndex: 'attendanceTime',
      key: 'attendanceTime',
    },
    {
      title: '考勤上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: '考勤说明',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  // 人员基础信息，实际应从接口获取
  const personInfo = {
    name: '沈辉',
    position: '普通工人',
    jobType: '其他',
    attendanceDate: '2025-08-12',
    attendanceDuration: '14.36',
    firstAttendanceTime: '06:58:47',
    lastAttendanceTime: '21:20:19',
    idCardPhoto: new URL(
      '../../../../assets/profile.jpg',
      import.meta.url
    ).href, // 这里用占位图，实际替换为真实照片地址
  };
  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

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
    try {
      const values: MenusType =
        await formRef.current?.validateFields();
      // console.log('保存时的值', values);
      setLoading(true);
      job
        .createJob(values)
        .then(() => {
          onStateChange(false);
          message.success('站点创建成功！');
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
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
        width={1200}
        open={openModal}
        title="考勤详情"
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Row className="mb-20px">
          <Col span={18}>
            <CustomDescriptions column={2} bordered>
              <Descriptions.Item label="姓名">
                {personInfo.name}
              </Descriptions.Item>
              <Descriptions.Item label="劳务工种">
                {personInfo.position}
              </Descriptions.Item>
              <Descriptions.Item label="考勤日期">
                {personInfo.attendanceDate}
              </Descriptions.Item>
              <Descriptions.Item label="考勤时长(h)">
                {personInfo.attendanceDuration}
              </Descriptions.Item>
              <Descriptions.Item label="首次考勤时间">
                {personInfo.firstAttendanceTime}
              </Descriptions.Item>
              <Descriptions.Item label="末次考勤时间">
                {personInfo.lastAttendanceTime}
              </Descriptions.Item>
              <Descriptions.Item label="所属单位">
                {personInfo.jobType}
              </Descriptions.Item>
            </CustomDescriptions>
          </Col>
          <Col span={6}>
            <CustomDescriptions2 column={1} bordered>
              <Descriptions.Item
                label="身份证照片"
                style={{ width: '100%' }}
              >
                <Image
                  src={
                    new URL(
                      '@/assets/avatar/profile.jpg',
                      import.meta.url
                    ).href
                  }
                  width={120}
                />
              </Descriptions.Item>
            </CustomDescriptions2>
          </Col>
        </Row>

        <ProTable
          params={
            {
              // groupId: groupId,
              // yearAndMonth: month,
              // username: _paramName,
              // subcontractorId: _subcontractorIde,
              // workTypeId: _workTypeId,
              // jobCategoryId: _jobCategoryId,
            }
          }
          request={async (params: ModesApi.ParamsType) => {
            const list = await A.attendanceDetailList(params);
            const res = list.map((item: any, i: number) => {
              item.workingHours = item.workingHours.toFixed(2);
              return Object.assign(item, ...item.attendances, {
                id: i,
              });
            });
            return {
              ...params,
              data: res || [],
            };
          }}
          columnsState={{
            persistenceKey: 'pro-table-addentance',
            persistenceType: 'localStorage',
            onChange(_: any) {},
          }}
          search={false}
          scroll={{ y: '300px' }}
          columns={columns}
          toolBarRender={false}
          pagination={false} 
        ></ProTable>
      </Modal>
    </>
  );
};
