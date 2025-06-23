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
      label: '车牌号',
      key: 'carNo',
      disabled: true,
    },
    {
      label: '进场时间',
      key: 'enterDate',
      disabled: true,
    },
    {
      label: '送货人',
      key: 'deliveryMan',
      disabled: true,
    },
    {
      label: '送货人联系方式',
      key: 'deliveryContact',
      disabled: true,
    },
    {
      label: '验收人',
      key: 'materialMan',
      disabled: true,
    },
    {
      label: '验收单位',
      key: 'purchaserDepartment',
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
      label: '是否特种作业',
      key: 'isSpecialWork',
      disabled: true,
      formProp: () => {
        return <div className="adm-input-disabled">否</div>;
      },
    },
    {
      label: '计划进场数量',
      key: 'enterNumber',
      disabled: true,
    },
    {
      label: '实际验收数量',
      key: 'acceptNumber',
      formProp: () => {
        return getToken('PHONETITLE') == '详情' ||
          getToken('PHONETITLE') == '审核' ? (
          <Input disabled={true} />
        ) : (
          <Input placeholder="请输入实际验收数量" />
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
          <UploadImage />
        );
      },
    },
    {
      label: '验收单',
      key: 'acceptAttachment',
      disabled: true,
      formProp: (item: any) => {
        return getToken('PHONETITLE') == '详情' ||
          getToken('PHONETITLE') == '审核' ? (
          <>
            {item.acceptAttachment ? (
              <Space wrap>
                <Image
                  src={item.acceptAttachment}
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
          <UploadImage />
        );
      },
    },
  ];
  return { formColumns, MaterialColumns };
};
