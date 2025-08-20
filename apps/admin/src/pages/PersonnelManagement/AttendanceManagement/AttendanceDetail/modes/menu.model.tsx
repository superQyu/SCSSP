import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { useRoute } from 'hooks';

type MenusPropsType = {
  server?: any;
  // month?: Date;
  month?: string;
};

export default ({
  month: searchMonth,
  server,
  callback,
}: MenusPropsType) => {
  const { tabNavigate } = useRoute();
  const [params] = useSearchParams();

  const { subContractor: S, person: P, group: G } = server;

  const [subcontractorList, setSubcontractorList] = useState([]);
  const [laborList, setLaborList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const init = async () => {
    const res1 = await S.getAllSubContractor();
    const list1 = res1.map((item: any) => {
      return { label: item.realName, value: `${item.id}` };
    });

    setSubcontractorList(list1);

    const { list } = await P.workType({
      pageSize: -1,
    });
    const options = list.map((item: any) => {
      return {
        label: item.name,
        value: `${item.id}`,
      };
    });
    setLaborList(options);

    // const res2 = await G.getGroupList({ pageSize: '100' });

    // const list2 = res2.list.map((item: any) => {
    //   return {
    //     label: item.teamName,
    //     value: item.id,
    //   };
    // });
    // setGroupList(list2);
  };

  useEffect(() => {
    init();
  }, []);

  const startOfMonth = dayjs(searchMonth, 'YYYY-MM').startOf(
    'month'
  );
  const endOfMonth = dayjs(searchMonth, 'YYYY-MM').endOf(
    'month'
  );

  const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;
  const days: ProColumns[] = [...Array(daysInMonth).keys()].map(
    (i: number) => {
      const day = i + 1;
      const date = `${searchMonth}-${day
        .toString()
        .padStart(2, '0')}`;
      return {
        // width: 35,
        hideInSearch: true,
        title: day + '号',
        dataIndex: date,
        align: 'center',
        render: (dom: any, row) => {
          let color;
          switch (dom) {
            // 考勤正常(进出场均有)
            case 1:
              color = '#0fc184';
              break;
            // 考勤异常(进出场只有一端)
            case 2:
              color = '#fa8d23';
              break;
            // 没有考勤数据(没有进出场)
            default:
              // color = '#FF0000';
              color = '#d6dae1';
              break;
          }
          return (
            <a onClick={callback}>
              22
              {/* <span
                className="inline-block w-20px h-20px line-height-20px rd-50%"
                style={{ background: color }}
              /> */}
            </a>
          );
        },
      };
    }
  );

  const columns: ProColumns[] = [
    {
      width: 80,
      title: '人员名称',
      dataIndex: 'username',
      fixed: 'left',
      align: 'center',
    },
    {
      width: 60,
      title: '合计/h',
      hideInSearch: true,
      dataIndex: 'workingHours',
      fixed: 'left',
      align: 'center',
    },
    ...days,
  ];

  return columns;
};
