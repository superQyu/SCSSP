import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import DictSelect from '@/components/DictSelect';
type ParamsType = Record<string, any>;

type MenusPropsType = {
  server?: ParamsType;
};

export default (_: MenusPropsType) => {
  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      fixed: 'left',
    },
    {
      hideInSearch: true,
      title: '编号',
      dataIndex: 'carId',
    },
    {
      hideInSearch: true,
      title: '车牌号',
      dataIndex: 'carNo',
    },
    {
      hideInSearch: true,
      title: '车辆颜色',
      dataIndex: 'carColor',
    },
    {
      hideInSearch: true,
      title: '车型',
      dataIndex: 'carType',
      render: (_, record) => (
        <DictSelect
          type={'text'}
          value={record.carType}
          dictKey={'cm_car_type'}
        />
      ),
    },
    // {
    //   hideInSearch: true,
    //   title: '行驶证号',
    //   dataIndex: 'carLicense',
    // },
    // { hideInSearch: true, title: '车辆品牌', width: 120, dataIndex: 'carBrand' },
    // {
    //   hideInSearch: true,
    //   title: '型号',
    //   dataIndex: 'carModel',
    // },
    {
      hideInSearch: true,
      width: 150,
      title: '报警时间',
      render: (_, record) => (
        <>
          {dayjs(record.alarmTime).format('YYYY-MM-DD HH:mm:ss')}
        </>
      ),
    },
    {
      title: '报警类型',
      dataIndex: 'alarmType',
      render: (_, record) => (
        <DictSelect
          type={'text'}
          value={record.alarmType + ''}
          dictKey={'alarm_type'}
        />
      ),
      renderFormItem: () => {
        return <DictSelect dictKey={'alarm_type'} />;
      },
    },
    {
      hideInSearch: true,
      title: '报警内容',
      dataIndex: 'alarmContent',
    },
    {
      hideInSearch: true,
      title: '处理人',
      dataIndex: 'disposeUserName',
    },
    {
      hideInSearch: true,
      width: 150,
      title: '处理内容',
      dataIndex: 'disposeContent',
    },
    {
      hideInSearch: true,
      width: 150,
      title: '处理时间',
      render: (_, record) => (
        <>
          {dayjs(record.disposeTime).format(
            'YYYY-MM-DD HH:mm:ss'
          )}
        </>
      ),
    },
    {
      hideInTable: true,
      title: '报警时间',
      valueType: 'dateTimeRange',
      dataIndex: 'alarmTime',
    },
  ];

  return columns;
};
