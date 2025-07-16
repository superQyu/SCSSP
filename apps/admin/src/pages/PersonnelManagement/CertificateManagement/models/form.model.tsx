import { useState, useEffect } from 'react';

import { FormColumnsTypes, ProUpload } from 'components';
import { Select, DatePicker, Input } from 'antd';
import type { UploadFile } from 'antd';
import dayjs from 'dayjs';
import DictSelect from '@/components/DictSelect';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { ToString } from '@/utils/transform';

export default (
  basicFormRef: any,
  certificateFormRef: any,
  picture: string[],
  type: string,
  detail: any,
  onUploadSuccess: any
) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { certificate, file, subContractor } = server;

  // 隶属人员选择下拉
  const [personInfoList, setPersonInfoList] = useState([]);
  // 单位选择下拉
  const [subcontractorList, setSubcontractorList] = useState([]);
  // 控制 岗位/职位 字段, 使用 workTypeName 还是 jobCategory
  const [jobIndex, setJobIndex] = useState('workTypeName');
  // 控制特殊工种的表单项是否显示
  const [showSpecial, setShowSpecial] = useState(false);
  // 用来初始化图片列表的初始值
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    getSelectOptions();
  }, []);
  useEffect(() => {
    if (type == '2') setShowSpecial(true);
  }, [type]);
  useEffect(() => {
    const list = picture.map((item: string, index: number) => {
      return {
        uid: `${index}`,
        name: item?.split('/')?.slice(-1)[0],
        url: item,
      };
    });
    // console.log('当前list', list);
    setFileList(list);
  }, [picture]);
  useEffect(() => {
    detail.userId && getPersonInfo(detail.userId);
  }, [detail]);

  // 表单交互相关
  // 选择人员后，带出人员相关信息
  const getPersonInfo = async (value: string) => {
    // console.log('选择项改变', value);
    const res = await certificate.getPersonInfoDetail({
      id: value,
    });
    // console.log('人员信息', res);
    basicFormRef.current.setFieldsValue({
      // 所属单位
      companyName: res.personnelInfoRespVO.companyName,
      // 人员类型(建筑工人/管理人员)
      workerType: ToString(res.personnelInfoRespVO.workerType),
      // 工种信息
      workTypeName: res.personnelInfoRespVO.workTypeName,
      // 管理人员职位id
      jobCategory: ToString(res.personnelInfoRespVO.jobCategory),
      // 身份证号
      identityCard: res.personnelInfoRespVO.identityCard,
      // 工龄
      workYears: res.personnelInfoRespVO.workYears,
    });
    // 岗位/职位(如果是建筑工人, 则是 workTypeName, 即工种)
    // 如果是管理人员, 则是 jobCategory
    setJobIndex(
      res.personnelInfoRespVO.workerType == 1
        ? 'workTypeName'
        : 'jobCategory'
    );
  };

  // 通过接口获取下拉框的内容
  const getSelectOptions = async () => {
    const res1 = await subContractor.getAllSubContractor();
    const list1 = res1.map((item: any) => {
      return { label: item.realName, value: item.id };
    });
    setSubcontractorList(list1);
    const res2 = await certificate.getPersonInfoList();
    // console.log('人员列表', res2);
    const list2 = res2.map((item: any) => {
      return { label: item.name, value: item.id };
    });
    setPersonInfoList(list2);
  };

  // 基本信息
  const basicColumns: FormColumnsTypes[] = [
    {
      label: '人员',
      dataIndex: 'userId',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择人员' }],
      },
      formItem: (
        <Select
          placeholder="请选择人员"
          options={personInfoList}
          onChange={getPersonInfo}
          disabled={detail.userId ? true : false}
        />
      ),
    },
    {
      label: '所属单位',
      dataIndex: 'companyName',
      colNum: 12,
      formItem: <Input placeholder="请所属单位" disabled />,
    },
    {
      label: '人员类型',
      dataIndex: 'workerType',
      colNum: 12,
      formItem: (
        <DictSelect dictKey={'pm_worker_type'} disabled />
      ),
    },
    {
      // show: workTypeName.length ? true : false,
      // show: false,
      label: '岗位/职位',
      dataIndex: jobIndex,
      colNum: 12,
      formItem: (
        <>
          {jobIndex == 'workTypeName' ? (
            <Input placeholder="请选择隶属人员" disabled />
          ) : (
            <DictSelect dictKey={'pm_job_category'} disabled />
          )}
        </>
      ),
    },
    {
      label: '身份证号',
      dataIndex: 'identityCard',
      colNum: 12,
      formItem: <Input placeholder="请选择隶属人员" disabled />,
    },
    {
      label: '工龄',
      dataIndex: 'workYears',
      colNum: 12,
      formItem: <Input placeholder="请选择隶属人员" disabled />,
    },
  ];

  // 证件信息
  const certificateColumns: FormColumnsTypes[] = [
    {
      label: '证书名称',
      dataIndex: 'credentialName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入证书名称' }],
      },
    },
    {
      label: '证书编号',
      dataIndex: 'credentialNumber',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择证书编号' }],
      },
    },
    {
      label: '证书种类',
      dataIndex: 'certificateType',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择隶属人员' }],
      },
      formItem: <DictSelect dictKey={'pm_certificate_type'} />,
    },
    {
      label: '证书类型',
      dataIndex: 'certificateCategory',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择隶属人员' }],
      },
      formItem: (
        <DictSelect dictKey={'pm_credential_classification'} />
      ),
    },
    {
      label: '证书等级',
      dataIndex: 'certificateLevel',
      colNum: 12,
    },
    {
      label: '岗位名称',
      dataIndex: 'positionTitle',
      colNum: 12,
    },
    {
      label: '第一次发证日期',
      dataIndex: 'firstIssuedDate',
      colNum: 12,
      // formItem: <DatePicker />,
      formItem: (
        <DatePicker className="w-full" format="YYYY-MM-DD" />
      ),
      formItemProps: {
        rules: [{ required: true, message: '请选择有效期起' }],
        getValueFromEvent: (...[, dateString]) =>
          new Date(dateString).getTime(),
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
      },
    },
    {
      label: '有效期起',
      dataIndex: 'validityStartDate',
      colNum: 12,
      // formItem: <DatePicker />,
      formItem: (
        <DatePicker className="w-full" format="YYYY-MM-DD" />
      ),
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
      },
    },
    {
      label: '有效期止',
      dataIndex: 'validityEndDate',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '发证机关',
      dataIndex: 'issuingAuthority',
      colNum: 12,
    },
    {
      label: '复核日期',
      dataIndex: 'reviewDate',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      // 只有请求特殊工种证件时，出现该字段
      show: showSpecial,
      label: '特工证网络核验日期',
      dataIndex: 'certificateDateSpecialWork',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '备注',
      dataIndex: 'remark',
      colNum: 12,
    },
    {
      label: '图片上传',
      dataIndex: 'picture',
      colNum: 12,
      formItem: (
        <ProUpload
          key={fileList.length}
          onRequest={async (params: any) =>
            await file.fileUpload(params)
          }
          onListChange={(res: any) => {
            // console.log('文件列表改变', res);
            const list = res.map((item: any) => item.url);
            certificateFormRef.current.setFieldsValue({
              // 证件图片
              picture: list,
            });
          }}
          onUploadSuccess={(_, value) => {
            onUploadSuccess(value);
            return;
            const data = certificate.ocrScan({
              picUrl: value,
            });

            const ocrDetail = JSON.parse(data);
            certificateFormRef.current?.setFieldValue(
              'credentialName',
              ocrDetail['证书名称']
            );
            certificateFormRef.current?.setFieldValue(
              'credentialNumber',
              ocrDetail['证书编号'] || ocrDetail['编号']
            );
            console.log(
              'data',
              ocrDetail['有效期始']
                .replace(/年/g, '-')
                .replace(/月/g, '-')
                .replace(/日/g, '')
            );
            console.log(
              '---',
              new Date(
                ocrDetail['有效期始']
                  .replace(/年/g, '-')
                  .replace(/月/g, '-')
                  .replace(/日/g, '')
              ).getTime()
            );
            // certificateFormRef.current?.setFieldValue(
            //   'validityStartDate',
            //   ocrDetail['有效期始']
            //     ? new Date(
            //         ocrDetail['有效期始']
            //           .replace(/年/g, '-')
            //           .replace(/月/g, '-')
            //           .replace(/日/g, '')
            //       ).getTime()
            //     : ''
            // );
            // certificateFormRef.current?.setFieldValue(
            //   'validityEndDate',
            //   ocrDetail['有效期止']
            //     ? new Date(
            //         ocrDetail['有效期止']
            //           .replace(/年/g, '-')
            //           .replace(/月/g, '-')
            //           .replace(/日/g, '')
            //       ).getTime()
            //     : ''
            // );
          }}
          defaultFileList={() => fileList}
        />
      ),
    },
  ];

  return { basicColumns, certificateColumns };
};
