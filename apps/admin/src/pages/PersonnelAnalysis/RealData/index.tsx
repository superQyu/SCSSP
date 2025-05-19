import { useEffect, useState } from 'react';
import { Flex, Row, Col, Tag, Image } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { personAnalysis } = server;

  let timer: any;

  const [list, setList] = useState<any>([]);

  // const list = [
  //   {
  //     personName: '蒋利春',
  //     receiveTime: '05-09 07:02',
  //     certNo: '32102319880301581X',
  //     jobCategory: '安装工',
  //     inAndOutType: '0',
  //     picUri: '',
  //     doorName: '',
  //     companyName: '卢晶建筑\r\n',
  //     orgPicUri: '',
  //   },
  //   {
  //     personName: '董泳君',
  //     receiveTime: '05-09 06:59',
  //     certNo: '510723199911194664',
  //     jobCategory: '木工',
  //     inAndOutType: '1',
  //     picUri: '',
  //     doorName: '',
  //     companyName: '卢晶建筑\r\n',
  //     orgPicUri: '',
  //   },
  //   {
  //     personName: '李新',
  //     receiveTime: '05-09 06:36',
  //     certNo: '320624197009192716',
  //     jobCategory: '其他',
  //     inAndOutType: '1',
  //     picUri: '',
  //     doorName: '',
  //     companyName: '卢晶建筑\r\n',
  //     orgPicUri: '',
  //   },
  //   {
  //     personName: '范炳飞',
  //     receiveTime: '05-09 06:17',
  //     certNo: '320623198511111676',
  //     jobCategory: '其他',
  //     inAndOutType: '0',
  //     picUri: '',
  //     doorName: '',
  //     companyName: '卢晶建筑\r\n',
  //     orgPicUri: '',
  //   },
  // ];

  useEffect(() => {
    personAnalysis
      .getLatestFourAttendanceRecord()
      .then((res: any[]) => {
        setList(res);
      });
  }, []);

  return (
    <div className="position-relative h-full overflow-y-auto overflow-x-hidden">
      <Row gutter={10} className="position-absolute ">
        {list.map((item: any, index: number) => {
          return (
            <Col key={index} span={24} xxl={12} className="mb-2">
              <div
                style={{
                  border: '1px solid #ecf0f6',
                  borderRadius: '5px',
                }}
              >
                <Row
                  gutter={10}
                  className="p-2 h-150px  border-rd-2"
                >
                  <Col span={12} className="h-full">
                    <Flex
                      justify="center"
                      align="center"
                      className="w-full h-full"
                    >
                      <Image
                        className="w-full h-full"
                        src={`/src/assets/avatar/${item.jobNo}_1.jpg`}
                        fallback={
                          new URL(
                            '@/assets/images/PA/person.jpg',
                            import.meta.url
                          ).href
                        }
                      />
                    </Flex>
                  </Col>
                  <Col span={12} className="h-full">
                    <Flex
                      vertical
                      justify="space-between"
                      className="h-full"
                    >
                      <div>{item.companyName}</div>
                      {/* <div> {item.jobCategory}</div> */}
                      <div> {item.teamName}</div>
                      {/* <div> {item.personName}</div> */}
                      <div> {item.userName}</div>
                      <div className="color-#ff9c00 font-family-ds-digit font-size-16px">
                        {/* {item.receiveTime} */}
                        {dayjs(item.clockTime).format(
                          'MM-DD HH:mm'
                        )}
                      </div>
                      {/* {item.inAndOutType == '0' ? ( */}
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
                    </Flex>
                  </Col>
                </Row>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
