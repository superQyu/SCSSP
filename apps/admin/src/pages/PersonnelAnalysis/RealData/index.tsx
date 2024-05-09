import { useEffect, useState } from 'react';
import { Flex, Row, Col, Tag } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import TextItem from '../components/TextItem';

export default () => {
  let timer: any;
  const list = [
    {
      personName: '蒋利春',
      receiveTime: '05-09 07:02',
      certNo: '32102319880301581X',
      jobCategory: '安装工',
      inAndOutType: '0',
      picUri: '',
      doorName: '',
      companyName: '卢晶建筑\r\n',
      orgPicUri: '',
    },
    {
      personName: '董泳君',
      receiveTime: '05-09 06:59',
      certNo: '510723199911194664',
      jobCategory: '木工',
      inAndOutType: '1',
      picUri: '',
      doorName: '',
      companyName: '卢晶建筑\r\n',
      orgPicUri: '',
    },
    {
      personName: '李新',
      receiveTime: '05-09 06:36',
      certNo: '320624197009192716',
      jobCategory: '其他',
      inAndOutType: '1',
      picUri: '',
      doorName: '',
      companyName: '卢晶建筑\r\n',
      orgPicUri: '',
    },
    {
      personName: '范炳飞',
      receiveTime: '05-09 06:17',
      certNo: '320623198511111676',
      jobCategory: '其他',
      inAndOutType: '0',
      picUri: '',
      doorName: '',
      companyName: '卢晶建筑\r\n',
      orgPicUri: '',
    },
  ];
  const [time, setTime] = useState<string>();

  const getTime = () => {
    setTime(dayjs().format('YYYY年M月D日 hh:mm:ss'));
    timer = setTimeout(getTime, 1000);
  };

  useEffect(() => {
    getTime();
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="position-relative h-full">
      <Row gutter={10} className="position-absolute overflow-y-auto">
        {list.map((item) => {
          return (
            <Col span={24} xxl={12} className="mb-2">
              <Row gutter={2} className="p-2 h-150px bg-#e6f7ff border-rd-2">
                <Col span={12} className="h-full">
                  照片
                </Col>
                <Col span={12} className="h-full">
                  <Flex vertical justify="space-between" className="h-full">
                    <div>{item.companyName}</div>
                    <div> {item.jobCategory}</div>
                    <div> {item.personName}</div>
                    <div className="color-#ff9c00 font-family-ds-digit font-size-16px">
                      {' '}
                      {item.receiveTime}
                    </div>
                    {item.inAndOutType == '0' ? (
                      <Tag icon={<LoginOutlined />} color="#ff9c00">
                        进场
                      </Tag>
                    ) : (
                      <Tag icon={<LogoutOutlined />} color="#55acee">
                        出场
                      </Tag>
                    )}
                  </Flex>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
