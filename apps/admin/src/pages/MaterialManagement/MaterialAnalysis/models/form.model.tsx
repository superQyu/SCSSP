import { useState, useEffect } from 'react';

import { FormColumnsTypes, ProUpload } from 'components';
import { Select, DatePicker, Input } from 'antd';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (subFormRef: any, entryAttachments: [] = [], exitAttachments: [] = []) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { subContractor, certificate, file } = server;

  // 用来初始化图片列表的初始值
  const entryFileList = entryAttachments.map((item: string, index: number) => {
    return {
      uid: `${index}`,
      name: item?.split('/')?.slice(-1)[0],
      url: item,
    };
  });
  const exitFileList = exitAttachments.map((item: string, index: number) => {
    return {
      uid: `${index}`,
      name: item?.split('/')?.slice(-1)[0],
      url: item,
    };
  });

  // 分包单位选择下拉
  const [subcontractorList, setSubcontractorList] = useState([]);
  // 班组长选择下拉
  const [personInfoList, setPersonInfoList] = useState([]);

  useEffect(() => {
    getSelectOptions();
  }, []);

  // 表单交互相关
  // 选择人员后，带出人员相关信息
  const getPersonInfo = async (value: string) => {
    // console.log('选择项改变', value);
    const res = await certificate.getPersonInfoDetail({ id: value });
    // console.log('人员信息', res);
    subFormRef.current.setFieldsValue({
      // 劳务工种
      workTypeName: res.personnelInfoRespVO.workTypeName,
      // 身份证号
      identityCard: res.personnelInfoRespVO.identityCard,
      // 联系方式
      phone: res.personnelInfoRespVO.phone,
      // 进场日期
      entryDate: res.entryInfoRespVO.entryDate,
      // 退场日期
      exitDate: res.entryInfoRespVO.exitDate,
    });
  };

  // 通过接口获取下拉框的内容
  const getSelectOptions = async () => {
    const res1 = await subContractor.getAllSubContractor();
    // console.log('分包商列表', res1);
    const list1 = res1.map((item: any) => {
      return { label: item.realName, value: item.id };
    });
    // console.log('分包商列表', list1);
    setSubcontractorList(list1);
    const res2 = await certificate.getPersonInfoList();
    // console.log('班组长列表', res2);
    const list2 = res2.map((item: any) => {
      return { label: item.name, value: item.id };
    });
    setPersonInfoList(list2);
  };

  const formColumns: FormColumnsTypes[] = [
    {
      label: '班组名称',
      dataIndex: 'teamName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入班组名称' }],
      },
    },
    {
      label: '分包单位',
      dataIndex: 'subcontractorId',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择分包单位' }],
      },
      formItem: <Select placeholder="请选择分包单位" options={subcontractorList} />,
    },
    {
      label: '班组长',
      dataIndex: 'userId',
      colNum: 12,
      formItem: (
        <Select placeholder="请选择班组长" options={personInfoList} onChange={getPersonInfo} />
      ),
    },
    {
      // 缺失字段, 信息采集时应当选择来着
      label: '劳务工种',
      dataIndex: 'workTypeName',
      colNum: 12,
      formItem: <Select placeholder="请选择班组长" disabled />,
    },
    {
      label: '身份证号',
      dataIndex: 'identityCard',
      colNum: 12,
      formItem: <Input placeholder="请选择班组长" disabled />,
    },
    {
      label: '联系方式',
      dataIndex: 'phone',
      colNum: 12,
      formItem: <Input placeholder="请选择班组长" disabled />,
    },
    {
      label: '进场日期',
      dataIndex: 'entryDate',
      colNum: 12,
      formItem: <DatePicker placeholder="请选择班组长" disabled />,
    },
    {
      label: '退场日期',
      dataIndex: 'exitDate',
      colNum: 12,
      formItem: <DatePicker placeholder="请选择班组长" />,
    },
    {
      label: '进场附件',
      dataIndex: 'entryAttachments',
      colNum: 12,
      formItem: (
        <ProUpload
          onRequest={async (params: any) => await file.fileUpload(params)}
          onListChange={(res: any) => {
            // console.log('文件列表改变', res);
            const list = res.map((item: any) => item.url);
            subFormRef.current.setFieldsValue({
              // 进场附件
              entryAttachments: list,
            });
          }}
          defaultFileList={() => entryFileList}
        />
      ),
    },
    {
      label: '退场附件',
      dataIndex: 'exitAttachments',
      colNum: 12,
      formItem: (
        <ProUpload
          onRequest={async (params: any) => await file.fileUpload(params)}
          onListChange={(res: any) => {
            // console.log('文件列表改变', res);
            const list = res.map((item: any) => item.url);
            subFormRef.current.setFieldsValue({
              // 进场附件
              exitAttachments: list,
            });
          }}
          defaultFileList={() => exitFileList}
        />
      ),
    },
  ];
  return formColumns;
};
