import { useEffect, useState } from 'react';

import { type ProColumns } from '@ant-design/pro-components';
import { Select, Image, Tag } from 'antd';
import DictSelect from '@/components/DictSelect';

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
  const commonWidth = 100;

  const fColumns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      dataIndex: 'index',
      ellipsis: true,
      // width: commonWidth
    },
    {
      title: '车牌号',
      dataIndex: 'carNo',
      ellipsis: true,
      hideInSearch: true,
      // width: commonWidth,
    },
    {
      title: '进场时间',
      dataIndex: 'enterDate',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '送货人',
      dataIndex: 'deliveryMan',
      ellipsis: true,
      // hideInSearch: true,
    },
    {
      title: '送货人联系方式',
      dataIndex: 'deliveryContact',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '验收人',
      dataIndex: 'materialMan',
      ellipsis: true,
      hideInSearch: true,
    },
    // {
    //   title: '供应单位',
    //   dataIndex: 'supplierDepartment',
    //   ellipsis: true,
    //   // hideInSearch: true,
    // },
    // {
    //   title: '生产厂家',
    //   dataIndex: 'manufacturer',
    //   ellipsis: true,
    //   hideInSearch: true,
    // },
    {
      title: '购买单位',
      dataIndex: 'purchaserDepartment',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '流程状态',
      dataIndex: 'status',
      ellipsis: true,
      hideInSearch: true,
      render: (text, record) => {
        return (
          <DictSelect
            value={record.status}
            type="text"
            dictKey="flow_material_enter"
            isTag
          />
        );
      },
    },
    {
      title: '下一节点',
      dataIndex: 'status',
      ellipsis: true,
      hideInSearch: true,
      render: (text, record) => {
        const state = {

          '1': '验收员', //待验收
          '10': '验收员', //驳回
          '444': '验收员', //验收超时
          '2': '', //已验收
          '11': '项目经理', //待确认

        }
        return (record.status == '2' || record.status == '0' ? '--' :
          <Tag color="processing">{state[record.status]}</Tag>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      hideInSearch: true,

    },
  ];

  const cColumns: ProColumns[] = [
    // {
    //   title: '车牌号',
    //   dataIndex: 'carNo',
    //   ellipsis: true,
    //   hideInSearch: true,
    //   // width: commonWidth,
    // },
    {
      title: '物料名称',
      dataIndex: 'materialName',
      ellipsis: true,
      hideInSearch: true,
      // width: commonWidth,
    },
    {
      title: '型号',
      dataIndex: 'materialType',
      ellipsis: true,
      hideInSearch: true,
      // width: commonWidth,
    },
    {
      title: '计量单位',
      dataIndex: 'measuringUnit',
      ellipsis: true,
      hideInSearch: true,
      // width: commonWidth,
    },
    {
      title: '规格',
      dataIndex: 'specification',
      ellipsis: true,
      hideInSearch: true,
      // width: commonWidth,
    },
    {
      title: '物料编号',
      dataIndex: 'materialCode',
      ellipsis: true,
      hideInSearch: true,
      // width: commonWidth,
    },
    {
      title: '进场数量',
      dataIndex: 'enterNumber',
      ellipsis: true,
      editable: false,
      // width: commonWidth,
    },
    {
      title: '实际验收数量',
      dataIndex: 'acceptNumber',
      ellipsis: true,
      editable: false,
      // width: commonWidth,
    },
    {
      title: '合格证件',
      dataIndex: 'attachment',
      ellipsis: true,
      hideInSearch: true,
      render: (text, record) => {
        // console.log('行数据', record)
        const list = record?.attachment?.split('@');
        // console.log('图片列表', list);
        if (list && list[0].length) {
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
    {
      title: '验收单',
      dataIndex: 'acceptAttachment',
      ellipsis: true,
      hideInSearch: true,
      render: (text, record) => {
        // console.log('行数据', record)
        const list = record?.acceptAttachment?.split('@');
        // console.log('图片列表', list);
        if (list && list[0].length) {
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
      // formItemProps: {
      //   rules: [
      //     { required: true, message: '请上传验收单' },
      //   ],
      // },
    },
  ];

  return { fColumns, cColumns };
};
