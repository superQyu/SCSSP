import React from 'react';
import { Descriptions, Image } from 'antd';
import type { DescriptionsProps } from 'antd';
import styled from 'styled-components';
const CustomDiv = styled.div`
  position: relative;
  padding: 30px 18px 60px;
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

const column1: DescriptionsProps['items'] = [
  {
    label: '项目名称',
    children: 'Zhou Maomao',
  },
  {
    label: '开工时间',
    children: 'Hangzhou, Zhejiang',
  },
  {
    label: '完工时间',
    children: 'empty',
  },
  {
    label: '建筑面积',
    children: 'No. 18, Wa',
  },
  {
    label: '项目描述',
    children: 'No. 18, Wa',
  },
];

const column2: DescriptionsProps['items'] = [
  {
    label: '建设单位',
    children: 'Zhou Maomao',
  },
  {
    label: '项目经理',
    children: 'Hangzhou, Zhejiang',
  },
  {
    label: '联系方式',
    children: 'empty',
  },
  {
    label: '监理单位',
    children: 'No. 18, Wa',
  },
  {
    label: '设计单位',
    children: 'No. 18, Wa',
  },
  {
    label: '施工单位:',
    children: 'No. 18, Wa',
  },
];

const App: React.FC = () => (
  <>
    <Image
      width={270}
      height={170}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
    <CustomDescriptions
      className="mb-30px"
      bordered={false}
      items={column1}
      column={1}
    />
    <CustomDiv>
      <div className="title">六方责任主体</div>
      <CustomDescriptions
        bordered={false}
        items={column2}
        column={1}
      />
    </CustomDiv>
  </>
);

export default App;
