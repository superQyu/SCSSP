import { Card, Row, Col, Flex, Space } from 'antd';

import VennChart from '@/components/VennChart';
import TextItem from './components/TextItem';
import TitleItem from './components/TitleItem';
import LaborPie from './components/LaborPie';
import FunctionBar from './components/FunctionBar';
import TeamBar from './components/TeamBar';
import styled from 'styled-components';

const CustomCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  borderRadius: '20px',
  flexDirection: 'column',
  '.ant-card-head': {
    borderBottom: 'none',
  },
  '.ant-card-body': {
    flex: 1,
  },
}));

const CustomTitle = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  margin-top: 20px;
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 17px;
    margin-right: 6px;
    background: #3662ec;
    border-radius: 4px;
  }
`;

export default () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full p-6 bg-#fff ">
      <CustomCard title={<CustomTitle>劳务信息</CustomTitle>}>
        <Row className="h-full pb-10 pt-4">
          <Col span={14} className="h-full">
            <LaborPie />
          </Col>
          <Col span={10} className="h-full">
            <Flex gap="middle" vertical justify="space-between" className="h-full">
              <div className="overflow-hidden grid grid-cols-2 border-rd-4px">
                <TitleItem label="出勤人数" color="#26ff00" />
                <TitleItem label="缺勤人数" color="#0080ff" />
              </div>
              <Space direction="vertical" size={5}>
                <div className="mb-1 font-size-14px font-700 color-#454545">在场状态</div>
                <TextItem label="出勤人数" value={4} unit="人" />
                <TextItem label="总人数" value={4} unit="人" />
                <TextItem label="出勤率" value={25} unit="%" />
              </Space>
            </Flex>
          </Col>
        </Row>
      </CustomCard>
      <CustomCard title={<CustomTitle>全场性别和民族</CustomTitle>}>
        <Row gutter={30} className="h-full  pb-10 pt-4">
          <Col span={12} className="h-full">
            <Flex gap="middle" vertical justify="space-between" align="center" className="h-full">
              <div className="overflow-hidden grid grid-cols-2 w-80% border-rd-4px">
                <TitleItem label="女性人数" color="#cf14ef" />
                <TitleItem label="男性人数" color="#6bd0d3" />
              </div>
              <Flex align="flex-end" justify="center">
                <div className="mr-[-15%]">
                  <VennChart
                    size={134}
                    value={5}
                    styles={{
                      background: 'linear-gradient(195deg, #B600F1 23%, #FF3CEB 90%)',
                      boxShadow: ' 0px 25px 21px 0px rgba(192, 0, 240, 0.2)',
                    }}
                  />
                </div>
                <div className="mr-[-15%]">
                  <VennChart
                    size={180}
                    value={10}
                    styles={{
                      background: 'linear-gradient(90deg, #27B1FE 0%, #1DC560 115%)',
                      boxShadow: '0px 20px 28px 0px rgba(104, 208, 215, 0.3)',
                    }}
                  />
                </div>
              </Flex>
            </Flex>
          </Col>

          <Col span={12} className="h-full">
            <Flex gap="middle" vertical justify="space-between" align="center" className="h-full">
              <div className="overflow-hidden grid grid-cols-1  w-80%  border-rd-4px">
                <TitleItem label="汉族人数" color="#ffc700" />
              </div>
              <VennChart
                size={175}
                value={15}
                styles={{
                  background: 'linear-gradient(195deg, #FF9900 24%, #FFC700 88%)',
                  boxShadow: '0px 25px 50px 0px rgba(255, 153, 0, 0.5)',
                }}
              />
            </Flex>
          </Col>
        </Row>
      </CustomCard>

      <CustomCard title={<CustomTitle>全场工种</CustomTitle>}>
        <FunctionBar />
      </CustomCard>
      <CustomCard title={<CustomTitle>全场班组人数</CustomTitle>}>
        <TeamBar />
      </CustomCard>
    </div>
  );
};
