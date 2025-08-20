import {
  TableDropdown,
  type ProColumns,
} from '@ant-design/pro-components';
import { Popconfirm } from 'antd';
type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export default ({ server }: MenusPropsType) => {
  const { menus: M } = server as objJson;

  const first: ProColumns[] = [
    {
      title: '类别码',
      dataIndex: 'firstLevelCode',
      ellipsis: true,
      editable: false,
      width: 70,
    },
    {
      title: '类别名称',
      dataIndex: 'firstLevelName',
      ellipsis: true,
      // width: 48,
    },
  ];
  const second: ProColumns[] = [
    {
      title: '类别码',
      dataIndex: 'secondLevelCode',
      ellipsis: true,
      editable: false,
      width: 70,
    },
    {
      title: '类别名称',
      dataIndex: 'secondLevelName',
      ellipsis: true,
      // width: 48,
    },
  ];
  const third: ProColumns[] = [
    {
      title: '类别码',
      dataIndex: 'thirdLevelCode',
      ellipsis: true,
      editable: false,
      width: 70,
    },
    {
      title: '类别名称',
      dataIndex: 'thirdLevelName',
      ellipsis: true,
      // width: 48,
    },
  ];
  const option: ProColumns = {
    title: '操作',
    width: 70,
    fixed: 'right',
    valueType: 'option',
    dataIndex: 'option',
    render: (_text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          // console.log('点击了编辑')
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,

    ],
  };

  const leftColumns: Record<string, ProColumns[]> = {
    firstColumns: [...first, option],
    secondColumns: [...second, option],
    thirdColumns: [...third, option],
  };

  const columnWidth = 128;

  const rightColumns: ProColumns[] = [
    {
      title: '材料编码',
      dataIndex: 'materialCode',
      ellipsis: true,
      width: columnWidth,
      // editable: false,
      hideInSearch: true,
    },
    {
      title: '材料名称',
      dataIndex: 'materialName',
      ellipsis: true,
      width: columnWidth,
    },
    {
      title: '规格',
      dataIndex: 'specification',
      ellipsis: true,
      hideInSearch: true,
      width: columnWidth,
    },
    {
      title: '计量单位',
      dataIndex: 'measuringUnit',
      ellipsis: true,
      hideInSearch: true,
      width: columnWidth,
    },
    {
      title: '价格',
      dataIndex: 'price',
      ellipsis: true,
      hideInSearch: true,
      width: columnWidth,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      hideInSearch: true,
      width: columnWidth,
    },
    {
      title: '说明',
      dataIndex: 'description',
      ellipsis: true,
      hideInSearch: true,
      width: columnWidth,
    },
    {
      title: '初始八位码',
      dataIndex: 'initialEightBitCode',
      ellipsis: true,
      hideInSearch: true,
      width: columnWidth,
    },
    {
      title: '原六位码',
      dataIndex: 'originalSixBitCode',
      ellipsis: true,
      hideInSearch: true,
      width: columnWidth,
    },
    {
      title: '原省十位码',
      dataIndex: 'originalProvinceTenBitCode',
      ellipsis: true,
      hideInSearch: true,
      width: columnWidth,
    },
    option,
  ];

  return { leftColumns, rightColumns };
};
