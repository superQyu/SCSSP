import { useEffect, useState } from 'react';
import { Flex, Row, Col, Tag } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

import style from './index.module.scss';
// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { personAnalysis } = server;

  const [list, setList] = useState<any>([]);

  const columns = [
    {
      label: '证书编号',
      key: 'certificateNo',
    },
    {
      label: '证书到期时间',
      key: 'expireTime',
    },
    {
      label: '预警内容',
      key: 'content',
    },
  ];

  // const list = [
  //   {
  //     name: '蒋利春',
  //     alertTypeName: '建造师安全B证',
  //     time: '2018-12-13 13:25:34',

  //     id: 'JZ00222333',
  //   },
  //   {
  //     id: 'JZ00222333',
  //     name: '董泳君',
  //     alertTypeName: '安全C证',
  //     time: '2020-07-02 22:01:48',
  //   },
  //   {
  //     id: 'JZ00222333',
  //     name: '蒋利春',
  //     alertTypeName: '建造师安全B证',
  //     time: '2018-12-13 13:25:34',
  //   },
  //   {
  //     id: 'JZ00222333',
  //     name: '董泳君',
  //     alertTypeName: '安全C证',
  //     time: '2020-07-02 22:01:48',
  //   },
  //   {
  //     name: '蒋利春',
  //     alertTypeName: '建造师安全B证',
  //     time: '2018-12-13 13:25:34',

  //     id: 'JZ00222333',
  //   },
  //   {
  //     id: 'JZ00222333',
  //     name: '董泳君',
  //     alertTypeName: '安全C证',
  //     time: '2020-07-02 22:01:48',
  //   },
  //   {
  //     id: 'JZ00222333',
  //     name: '蒋利春',
  //     alertTypeName: '建造师安全B证',
  //     time: '2018-12-13 13:25:34',
  //   },
  //   {
  //     id: 'JZ00222333',
  //     name: '董泳君',
  //     alertTypeName: '安全C证',
  //     time: '2020-07-02 22:01:48',
  //   },
  // ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await personAnalysis.getCertificateWarningList();
    // console.log('res', res);
    setList(res);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        {list.length
          ? list.map((item, index: number) => {
              return (
                <div className={style.contentItem} key={index}>
                  <div className={style.head}>
                    <div className={style.index}>
                      <span>{index + 1}</span>
                    </div>
                    <div className={style.title}>
                      <span className={style.name}>
                        {item.workerName}
                      </span>
                      <span className={style.divid}>|</span>
                      <span>{item.certificateName}</span>
                    </div>
                  </div>
                  <div className={style.info}>
                    {columns.map((el) => {
                      return (
                        <div
                          key={el.key}
                          className={style.infoItem}
                        >
                          <span>{el.label}</span>：
                          <span>{item[el.key] || '--'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          : '暂无数据'}
      </div>
    </div>
  );
};
