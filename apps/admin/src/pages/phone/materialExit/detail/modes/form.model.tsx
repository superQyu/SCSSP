import React, { useState, useEffect } from 'react';
import {
  Tag,
  Space,
  Image,
  Input,
  ImageUploader,
} from 'antd-mobile';
import { getToken } from 'utils';
import UploadImage from '@/pages/phone/components/UploadImage';
export interface FormColumnVO {
  label: string;
  key: string;
  disabled?: boolean;
  formProp?: React.FC;
}

export default () => {
  const formColumns: FormColumnVO[] = [
    {
      label: '退场时间',
      key: 'exitDate',
      disabled: true,
    },
    {
      label: '退料人员',
      key: 'exitPersonnel',
      disabled: true,
    },
    {
      label: '见证人员',
      key: 'witnessPersonnel',
      disabled: true,
    },
    {
      label: '供应单位',
      key: 'supplierDepartment',
      disabled: true,
    },
    {
      label: '生产厂家',
      key: 'manufacturer',
      disabled: true,
    },
    {
      label: '购买单位',
      key: 'purchaserDepartment',
      disabled: true,
    },
    {
      label: '退场原因',
      key: 'exitReason',
      disabled: true,
    },
  ];
  const MaterialColumns: FormColumnVO[] = [
    {
      label: '物料名称',
      key: 'materialName',
      disabled: true,
    },
    {
      label: '型号',
      key: 'materialType',
      disabled: true,
    },
    {
      label: '计量单位',
      key: 'measuringUnit',
      disabled: true,
    },
    {
      label: '规格',
      key: 'specification',
      disabled: true,
    },
    {
      label: '物料编号',
      key: 'materialCode',
      disabled: true,
    },
    {
      label: '退场数量',
      key: 'exitNumber',
      disabled: true,
    },
    {
      label: '清点数量',
      key: 'acceptNumber',
      formProp: () => {
        return getToken('PHONETITLE') == '详情' ||
          getToken('PHONETITLE') == '审核' ? (
          <Input disabled={true} />
        ) : (
          <Input placeholder="请输入清点数量" />
        );
      },
    },
    {
      label: '合格证书',
      key: 'attachment',
      formProp: (item: any) => {
        console.log(item);
        return getToken('PHONETITLE') == '详情' ||
          getToken('PHONETITLE') == '审核' ? (
          <>
            {item.attachment ? (
              <Space wrap>
                <Image
                  src={item.attachment}
                  width={100}
                  height={100}
                  fit="fill"
                />
              </Space>
            ) : (
              <div className="adm-input-disabled">暂无图片</div>
            )}
          </>
        ) : (
          <UploadImage initialValue={item.attachment} />
        );
      },
    },
  ];
  return { formColumns, MaterialColumns };
};
