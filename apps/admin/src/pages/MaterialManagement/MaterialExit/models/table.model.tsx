import { useEffect, useState } from 'react';

import { type ProColumns } from '@ant-design/pro-components';
import { Select, Image } from 'antd';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export interface ColumnsParamsProps extends objJson {
  subcontractorType: string;
  realName: string;
  corpCode: string;
  legalRepresentative: string;
  registeredCapital: string;
  unitAddress: string;
  principal: string;
  principalTel: string;
}

export default ({ server }: MenusPropsType) => {
  const fColumns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      dataIndex: 'index',
      ellipsis: true,
      // width: 50
    },
    {
      title: '退场时间',
      dataIndex: 'exitDate',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '退料人员',
      dataIndex: 'exitPersonnel',
      ellipsis: true,
      // hideInSearch: true,
    },
    {
      title: '见证人员',
      dataIndex: 'witnessPersonnel',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '供应单位',
      dataIndex: 'supplierDepartment',
      ellipsis: true,
      // hideInSearch: true,
    },
    {
      title: '生产厂家',
      dataIndex: 'manufacturer',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '购买单位',
      dataIndex: 'purchaserDepartment',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '退场原因',
      dataIndex: 'exitReason',
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  const cColumns: ProColumns[] = [
    {
      title: '物料名称',
      dataIndex: 'materialName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '型号',
      dataIndex: 'materialType',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '计量单位',
      dataIndex: 'measuringUnit',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '规格',
      dataIndex: 'specification',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '物料编号',
      dataIndex: 'materialCode',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '退场数量',
      dataIndex: 'exitNumber',
      ellipsis: true,
      editable: false,
    },
    {
      title: '相关图片',
      dataIndex: 'attachment',
      ellipsis: true,
      hideInSearch: true,
      render: (text, record) => {
        // console.log('record', record)
        const list = record.attachment?.split('@');
        // console.log('图片列表', list);
        if (list) {
          return (
            <div>
              <Image.PreviewGroup items={list}>
                <Image width={30} height={30} src={list[0]} />
              </Image.PreviewGroup>
            </div>
          );
        } else {
          return <div className="color-red">暂无图片</div>;
        }
      },
    },
  ];

  return { fColumns, cColumns };
};
