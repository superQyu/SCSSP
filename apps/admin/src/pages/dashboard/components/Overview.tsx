import React, { useEffect, useState } from 'react';
import { Descriptions, Image, Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { getToken } from 'utils';
import * as baseConf from '@/config';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import ExpandableText from '@/components/ExpandableText';
import DictText from '@/components/DictSelect/DictText';

const CustomDiv = styled.div`
  position: relative;
  padding-block: 30px 40px;
  background: rgba(88, 102, 129, 0.08);
  border-radius: 10px;
  .title {
    position: absolute;
    top: 0;
    left: 50%;
    padding: 2px 14px;
    font-weight: bold;
    font-size: 14px;
    color: #26324f;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 10px;
  }
`;
const CustomDescriptions = styled(Descriptions)(() => ({
  '.ant-descriptions-view .ant-descriptions-row .ant-descriptions-item':
    {
      paddingBottom: 5,
    },
}));

const CustomCollapse = styled(Collapse)(() => ({
  '.ant-collapse-item': {
    borderBottom: 0,
    border: '1px solid #EEEEEE',
    margin: '10px',
    boxShadow: '0px 4px 13px 0px rgba(0,0,0,0.07)',
    borderRadius: '10px 10px 10px 10px!important',
    background: '#fff',
  },
}));

const App: React.FC = () => {
  const navigator = useNavigate();
  const { server } = useBasicConfiguration();
  const { PMPM: P, subContractor: S } = server;
  const { PROJECTNAME: DP } = baseConf || {};
  const [detail, setDetail] = useState<any[]>([
    {
      label: '项目名称',
      children: '',
      key: 'projectName',
    },
    {
      label: '开工时间',
      children: '',
      key: 'actualStartTime',
      formatter: (val: number) => {
        return dayjs(val).format('YYYY-MM-DD');
      },
    },
    {
      label: '完工时间',
      children: '',
      key: 'actualEndTime',
      formatter: (val: number) => {
        return dayjs(val).format('YYYY-MM-DD');
      },
    },
    {
      label: '建筑面积',
      children: '',
      key: 'projectArea',
      formatter: (val: number) => {
        return `${val}m²`;
      },
    },
    {
      label: '项目描述',
      children: '',
      key: 'projectProfile',
      formatter: (val: string) => (
        <ExpandableText text={val || ''} maxLines={2} />
      ),
    },
  ]);
  const [imageUrl, setImageUrl] = useState('');
  const [unit, setUnit] = useState<CollapseProps['items']>([]);

  const queryData = async () => {
    const res = await P.getProjectUnity({
      id: getToken(DP),
    });
    const info = detail?.map((item) => {
      return {
        ...item,
        children: item.formatter
          ? item.formatter(res.projectInfoRespVO[item.key])
          : res.projectInfoRespVO[item.key],
      };
    });
    setDetail(info);
    setImageUrl(res.projectInfoRespVO.projectImage);
  };

  // 请求6方责任主体
  const queryUnit = async () => {
    const res = await S.getSubContractorList();
    const list = res.list.map((record: any) => {
      return {
        label: (
          <>
            <div>
              <DictText
                value={record.subcontractorType}
                dictKey="subcontractor_type"
              />
            </div>
            <div>{record.realName}</div>
          </>
        ),
        children: (
          <CustomDescriptions
            className="mb-30px"
            bordered={false}
            items={[
              {
                label: '项目经理',
                children: record.principal,
              },
              // {
              //   label: '项目经理联系方式',
              //   children: record.principalTel,
              // },
              {
                label: '所属省市',
                children: record.province + record.city,
              },
              // {
              //   label: '所属市',
              //   children: record.city,
              // },
              // {
              //   label: '统一社会信用代码',
              //   children: record.corpCode,
              // },
              {
                key: 'corpType',
                label: '参建单位类型',
                children: (
                  <DictText
                    value={record.corpType}
                    dictKey="corp_type"
                  />
                ),
              },
            ]}
            column={1}
          />
        ),
      };
    });
    setUnit(list);
  };

  useEffect(() => {
    queryData();
    queryUnit();
  }, [getToken(DP)]);

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <Image width={270} height={170} src={imageUrl} />
      <CustomDescriptions
        className="mb-30px"
        bordered={false}
        items={detail}
        column={1}
      />
      <CustomDiv>
        <div
          className="title cursor-pointer"
          onClick={() => navigator('/PM/SubM')}
        >
          参建单位
        </div>
        <CustomCollapse
          ghost
          expandIconPosition="end"
          items={unit}
        />
      </CustomDiv>
    </div>
  );
};

export default App;
