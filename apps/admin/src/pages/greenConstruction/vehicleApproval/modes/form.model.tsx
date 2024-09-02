import { useState, useEffect } from 'react';

import {
  FormColumnsTypes,
  SearchSelect,
  ProUpload,
} from 'components';
import { type ProColumns } from '@ant-design/pro-components';
import {
  Select,
  DatePicker,
  Input,
  Button,
  InputNumber,
} from 'antd';
import type { UploadFile } from 'antd';
import DictSelect from '@/components/DictSelect';
import dayjs from 'dayjs';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (formRef: any, picture: any[] = []) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList, file, vehicle } = server;

  const [isRequired, setIsRequired] = useState<boolean>(false);

  const formColumns: FormColumnsTypes[] = [
    {
      label: 'OCR 行驶证识别',
      show: false,
      dataIndex: 'passportPhoto',
    },
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
      dataIndex: 'isGps',
      formItem: (
        <DictSelect
          dictKey={'system_true_false'}
          onChange={(val: string) => {
            // console.log('改变后的值', val, typeof val);
            if (val == '1')
              formRef.current.setFieldsValue({ carType: '1' });
            else
              formRef.current.setFieldsValue({
                carType: undefined,
              });
          }}
        />
      ),
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
      label: '保险保单照片',
      dataIndex: 'attachment',
      colNum: 12,
      formItem: (
        <ProUpload
          key={picture.length}
          onRequest={async (params: any) =>
            await file.fileUpload(params)
          }
          onListChange={(res: any) => {
            // console.log('文件列表改变', res);
            const list = res.map((item: any) => item.url);
            formRef.current.setFieldsValue({
              // 保险保单照片图片
              attachment: list,
            });
          }}
          defaultFileList={() =>
            picture.map((item: string, index: number) => {
              return {
                uid: `${index}`,
                name: item?.split('/')?.slice(-1)[0],
                url: item,
              };
            })
          }
        />
      ),
      formItemProps: {
        rules: [
          (form: any) => {
            const isGps = form.getFieldValue('isGps');
            if (isGps == '1')
              return {
                required: true,
                message: '请输入保险保单照片',
              };
            else
              return {
                required: false,
                message: '请输入保险保单照片',
              };
          },
        ],
      },
    },
  ];
  return { formColumns };
};
