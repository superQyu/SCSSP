import { useState, useEffect } from 'react';
import { Select, Space } from 'antd';

import {
  FormColumnsTypes,
  SearchSelect,
  ProUpload,
} from 'components';

import DictSelect from '@/components/DictSelect';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import dayjs from 'dayjs';

export default (formRef: any, picture: any[] = []) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const {
    materialList,
    file,
    vehicle,
    materialEnter: M,
  } = server;

  const [carTypeDisabled, setCarTypeDisabled] =
    useState<boolean>(false);

  const formColumns: FormColumnsTypes[] = [
    // {
    //   label: 'OCR 行驶证识别',
    //   show: false,
    //   dataIndex: 'passportPhoto',
    // },
    {
      label: '车牌号',
      dataIndex: 'carNo',
      formItemProps: {
        rules: [{ required: true, message: '请输入车牌号' }],
      },
      colNum: 12,
    },
    // {
    //   label: '行驶证号',
    //   dataIndex: 'carLicense',
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入行驶证号' }],
    //   },
    //   colNum: 12,
    // },
    // {
    //   label: '车辆品牌',
    //   dataIndex: 'carBrand',
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入车辆品牌' }],
    //   },
    //   colNum: 12,
    // },
    // {
    //   label: '车辆型号',
    //   dataIndex: 'carModel',
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入车辆型号' }],
    //   },
    //   colNum: 12,
    // },
    {
      label: '是否安装GPS',
      dataIndex: 'isGps',
      formItem: (
        <DictSelect
          dictKey={'system_true_false'}
          onChange={(val: string) => {
            // console.log('改变后的值', val, typeof val);
            // 只有土方车有GPS
            if (val == '1') {
              formRef.current.setFieldsValue({ carType: '2' });
              setCarTypeDisabled(true);
            } else {
              formRef.current.setFieldsValue({
                carType: undefined,
              });
              setCarTypeDisabled(false);
            }
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
      formItem: (
        <DictSelect
          dictKey={'cm_car_type'}
          disabled={carTypeDisabled}
        />
      ),
      formItemProps: {
        rules: [{ required: true, message: '车辆类型' }],
      },
      colNum: 12,
    },
    // {
    //   label: '车辆颜色',
    //   dataIndex: 'carColor',
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入车辆颜色' }],
    //   },
    //   colNum: 12,
    // },

    // {
    //   label: '车辆识别代号/车架号',
    //   dataIndex: 'frameNo',
    //   // formItemProps: {
    //   //   rules: [{ required: true, message: '请输入车辆识别代号/车架号' }],
    //   // },
    //   colNum: 12,
    // },
    // {
    //   label: '发动机号',
    //   dataIndex: 'engineNo',
    //   // formItemProps: {
    //   //   rules: [{ required: true, message: '请输入发动机号' }],
    //   // },
    //   colNum: 12,
    // },
    // {
    //   label: '能源种类',
    //   dataIndex: 'energyType',
    //   formItem: <DictSelect dictKey={'cm_energy_type'} />,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入能源种类' }],
    //   },
    //   colNum: 12,
    // },
    // {
    //   label: '核定载客',
    //   dataIndex: 'approvalSeats',
    //   formItem: (
    //     <InputNumber
    //       min={1}
    //       style={{ width: '100%' }}
    //       placeholder="请输入核定载荷"
    //     />
    //   ),
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入核定载客' }],
    //   },
    //   colNum: 12,
    // },
    // {
    //   label: '年审时间',
    //   dataIndex: 'examinedDate',
    //   formItem: (
    //     <DatePicker className="w-full" format="YYYY-MM-DD" />
    //   ),
    //   formItemProps: {
    //     getValueFromEvent: (...[, dateString]) => dateString,
    //     getValueProps: (value: any) => ({
    //       value: value ? dayjs(value) : undefined,
    //     }),
    //     rules: [{ required: true, message: '请选择年审时间' }],
    //   },
    //   colNum: 12,
    // },
    // {
    //   label: '保险时间',
    //   dataIndex: 'insuranceDate',
    //   formItem: (
    //     <DatePicker className="w-full" format="YYYY-MM-DD" />
    //   ),
    //   formItemProps: {
    //     getValueFromEvent: (...[, dateString]) => dateString,
    //     getValueProps: (value: any) => ({
    //       value: value ? dayjs(value) : undefined,
    //     }),
    //     rules: [{ required: true, message: '请选择保险时间' }],
    //   },
    //   colNum: 12,
    // },
    {
      label: '车载容量',
      dataIndex: 'carStorage',
      // formItem: <DictSelect dictKey={'cm_energy_type'} />,
      formItemProps: {
        rules: [{ required: true, message: '请输入车载容量' }],
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
    {
      hiddenInTable: true,
      hiddenInSearch: true,
      label: '物料进场记录',
      dataIndex: 'materialEnterName',
      formItem: (
        <SearchSelect
          placeholder="请选择物料进场记录"
          request={async (input) => {
            const res = await M.getEnterList({});
            const options = res.list.map((item: any) => {
              const materials =
                item.materialsDetailsWithInventoryRespVOS
                  .map((el, i) => {
                    return `${el.materialName}`;
                  })
                  .join('和');
              return {
                label: `${dayjs(item.enterDate).format(
                  'YYYY-MM-DD HH:mm:ss'
                )} ${materials}`,
                value:  `${dayjs(item.enterDate).format(
                  'YYYY-MM-DD HH:mm:ss'
                )} ${materials}`,
              };
            });
            return options;
          }}
        />
      ),
      colNum: 12,
    },
  ];
  return { formColumns };
};
