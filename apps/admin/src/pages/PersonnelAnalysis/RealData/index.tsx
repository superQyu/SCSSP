import { useEffect, useState } from 'react';
import { Flex, Row, Col, Tag, Image } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useAppSelector } from 'hooks';
import styled from 'styled-components';

const CustomImage = styled(Image)(() => ({
  //  background: 'pink',
  //  width: '100%',
}));
export default () => {
  const { site } = useAppSelector((state) => state);
  const { websocket } = site;
  const { server } = useBasicConfiguration();
  const { personAnalysis } = server;

  const [list, setList] = useState<any>([]);

  const queryData = async () => {
    const res =
      await personAnalysis.getLatestFourAttendanceRecord();
    setList(res);
  };

  useEffect(() => {
    queryData();
  }, []);

  useEffect(() => {
    queryData();
  }, [websocket.person]);

  return (
    <div className="position-relative h-full overflow-y-auto overflow-x-hidden">
      <Row gutter={10} className="position-absolute pr-10px">
        {list.map((item: any, index: number) => {
          return (
            <Col
              key={index}
              span={24}
              xxl={!index ? 24 : 8}
              className="mb-2"
            >
              <div
                style={{
                  border: '1px solid #ecf0f6',
                }}
                className="w-full"
              >
                <Row
                  gutter={10}
                  className={`ml-0 p-2px w-full border-rd-2 h-${
                    index ? '170px' : '140px'
                  }`}
                >
                  <CustomImage
                    style={{
                      // maxWidth: '120px',
                      width: !index ? '100px' : '50px',
                      height: index ? '65px' : 'auto',
                    
                    }}
                    src={`/src/assets/avatar/${item.jobNo}_1.jpg`}
                    fallback={
                      new URL(
                        '@/assets/avatar/default.png',
                        import.meta.url
                      ).href
                    }
                  />

                  <Flex
                    vertical
                    justify="space-between"
                    className="py-5px pl-10px"
                    style={{
                      height: index ? '100px' : '140px',
                    }}
                  >
                    <div>
                      <div>{item.companyName}</div>

                      <div className="font-700">
                        {item.teamName}
                      </div>
                      <div> {item.userName}</div>
                    </div>

                    <div>
                      <div className="color-#ff9c00 font-family-ds-digit font-size-16px">
                        {dayjs(item.clockTime).format(
                          'MM-DD HH:mm'
                        )}
                        <div>
                          {item.clockDirection == 0 ? (
                            <Tag
                              icon={<LoginOutlined />}
                              color="#ff9c00"
                            >
                              进场
                            </Tag>
                          ) : (
                            <Tag
                              icon={<LogoutOutlined />}
                              color="#55acee"
                            >
                              出场
                            </Tag>
                          )}
                        </div>
                      </div>
                    </div>
                  </Flex>
                  {/* </Col> */}
                </Row>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
