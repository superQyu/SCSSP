import React, { useEffect, useState } from 'react';
import {
  Popover,
  Badge,
  BellOutlined,
  List,
  Avatar,
  Flex,
} from 'antd';
import {
  BellFilled,
  DoubleRightOutlined,
} from '@ant-design/icons';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const MessageBell: React.FC = () => {
  const { server } = useBasicConfiguration();
  const { sites } = server;
  const navigator = useNavigate();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);

  const queryCount = async () => {
    const res = await sites.getUnreadCount();
    setCount(res);
    if (res) {
      const data = await sites.getUnreadList({
        size: res,
      });
      setList(data);
    }
  };

  const handleNotice = async (item: any) => {
    await sites.updateRead({
      ids: item.id,
    });
    await queryCount();
    const path = item.templateContent.split('@')?.[1];
    if (path) {
      navigator(path);
    }
  };

  useEffect(() => {
    queryCount();
  }, []);

  return (
    <Popover
      content={
        <div
          style={{ width: 300, height: 300, overflow: 'auto' }}
        >
          <List
            // header={<div>未读消息</div>}
            // footer={
            //   <div style={{ textAlign: "center" }}>
            //     <Button type="primary" size="small" onClick={markAsRead}>
            //       标记全部为已读
            //     </Button>
            //   </div>
            // }
            // bordered
            dataSource={list}
            renderItem={(item: Message) => (
              <List.Item>
                <List.Item.Meta
                  title={item.templateNickname}
                  description={
                    <div>
                      <p>{item.templateContent.split('@')[0]}</p>
                      <Flex justify="space-between">
                        <span style={{ color: '#999' }}>
                          {dayjs(item.createTime).format(
                            'YYYY-MM-DD HH:mm:ss'
                          )}
                        </span>
                        <div
                          className="pr-20px cursor-pointer font-size-12px"
                          onClick={() => handleNotice(item)}
                        >
                          去处理
                          <DoubleRightOutlined />
                        </div>
                      </Flex>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      }
      title="未读消息"
      trigger="click"
      visible={visible}
      onVisibleChange={(vis) => setVisible(vis)}
    >
      <Badge
        count={count}
        // dot={unreadCount > 0}
        // style={{
        //   backgroundColor: "red",
        //   position: "absolute",
        //   top: 0,
        //   right: 0,
        // }}
      >
        <BellFilled
          style={{
            fontSize: 20,
            cursor: 'pointer',
            marginTop: 4,
          }}
        />
      </Badge>
    </Popover>
  );
};

export default MessageBell;
