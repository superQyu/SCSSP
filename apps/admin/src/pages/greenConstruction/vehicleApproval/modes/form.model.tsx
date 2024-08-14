import { useState, useEffect } from 'react';

import { FormColumnsTypes, SearchSelect } from 'components';
import { type ProColumns } from '@ant-design/pro-components';
import {
  Select,
  DatePicker,
  Input,
  Button,
  InputNumber,
} from 'antd';
import DictSelect from '@/components/DictSelect';
import dayjs from 'dayjs';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList, file, vehicle } = server;

  const formColumns: FormColumnsTypes[] = [
    {
      label: '车牌号',
      dataIndex: 'carNo',
      formItemProps: {
        rules: [{ required: true, message: '请输入车牌号' }],
      },
      colNum: 12,
    },
    {
      label: '行驶证号',
      dataIndex: 'carLicense',
      formItemProps: {
        rules: [{ required: true, message: '请输入行驶证号' }],
      },
      colNum: 12,
    },
    {
      label: '车辆品牌',
      dataIndex: 'carBrand',
      formItemProps: {
        rules: [{ required: true, message: '请输入车辆品牌' }],
      },
      colNum: 12,
    },
    {
      label: '车辆型号',
      dataIndex: 'carModel',
      formItemProps: {
        rules: [{ required: true, message: '请输入车辆型号' }],
      },
      colNum: 12,
    },
    {
      label: '是否安装GPS',
      dataIndex: 'hasGPS',
      formItem: <DictSelect dictKey={'system_true_false'} />,
      formItemProps: {
        rules: [{ required: true, message: '请输入车辆型号' }],
      },
      colNum: 12,
    },
    {
      label: '车辆类型',
      dataIndex: 'carType',
      formItem: <DictSelect dictKey={'cm_car_type'} />,
      formItemProps: {
        rules: [{ required: true, message: '车辆类型' }],
      },
      colNum: 12,
    },
    {
      label: '车辆颜色',
      dataIndex: 'carColor',
      formItemProps: {
        rules: [{ required: true, message: '请输入车辆颜色' }],
      },
      colNum: 12,
    },

    {
      label: '车辆识别代号/车架号',
      dataIndex: 'frameNo',
      // formItemProps: {
      //   rules: [{ required: true, message: '请输入车辆识别代号/车架号' }],
      // },
      colNum: 12,
    },
    {
      label: '发动机号',
      dataIndex: 'engineNo',
      // formItemProps: {
      //   rules: [{ required: true, message: '请输入发动机号' }],
      // },
      colNum: 12,
    },
    {
      label: '能源种类',
      dataIndex: 'energyType',
      formItem: <DictSelect dictKey={'cm_energy_type'} />,
      formItemProps: {
        rules: [{ required: true, message: '请输入能源种类' }],
      },
      colNum: 12,
    },
    {
      label: '核定载客',
      dataIndex: 'approvalSeats',
      formItem: (
        <InputNumber
          min={1}
          style={{ width: '100%' }}
          placeholder="请输入核定载荷"
        />
      ),
      formItemProps: {
        rules: [{ required: true, message: '请输入核定载客' }],
      },
      colNum: 12,
    },
    {
      label: '年审时间',
      dataIndex: 'examinedDate',
      formItem: (
        <DatePicker className="w-full" format="YYYY-MM-DD" />
      ),
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value: any) => ({
          value: value ? dayjs(value) : undefined,
        }),
        rules: [{ required: true, message: '请选择年审时间' }],
      },
      colNum: 12,
    },
    {
      label: '保险时间',
      dataIndex: 'insuranceDate',
      formItem: (
        <DatePicker className="w-full" format="YYYY-MM-DD" />
      ),
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value: any) => ({
          value: value ? dayjs(value) : undefined,
        }),
        rules: [{ required: true, message: '请选择保险时间' }],
      },
      colNum: 12,
    },
    {
      // OCR 行驶证识别
      label: '',
      dataIndex: 'passportPhoto',
      formItem: <div className="hidden"></div>,
      colNum: 8,
    },
  ];
  return { formColumns };
};
