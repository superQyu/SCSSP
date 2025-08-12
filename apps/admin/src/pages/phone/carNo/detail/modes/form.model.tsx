import React, { useState, useEffect } from 'react';
import { Space, Image } from 'antd-mobile';

export interface FormColumnVO {
  label: string;
  key: string;
  disabled?: boolean;
  formProp?: React.FC;
}

export default () => {
  const formColumns: FormColumnVO[] = [
    {
      label: '车牌号',
      key: 'carNo',
      disabled: true,
    },
    {
      label: '是否安装GPS',
      key: 'isGps',
      disabled: true,
    },
    {
      label: '车辆类型',
      key: 'carType',
      disabled: true,
    },
    {
      label: '车载容量(升)',
      key: 'carStorage',
      disabled: true,
    },
    {
      label: '保险保单照片',
      key: 'attachment',
      disabled: true,
      formProp: (item: any) => {
        return (
          <>
            {item.attachment ? (
              item.attachment.split('@').map((el,i) => {
                return (
                  <Space wrap key={i}>
                    <Image
                      className="mr-5px"
                      src={el}
                      width={100}
                      height={100}
                      fit="fill"
                    />
                  </Space>
                );
              })
            ) : (
              <div className="adm-input-disabled">暂无图片</div>
            )}
          </>
        );
      },
    },
    {
      label: '物料进场记录',
      key: 'materialEnterName',
      disabled: true,
    },
  ];

  return { formColumns };
};
