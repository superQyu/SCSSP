import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { InfiniteScroll, List, DotLoading } from 'antd-mobile';
import {
  InfoCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DictSelect from '@/components/DictSelect';

import InfiniteScrollContent from '../components/InfiniteScrollContent';
const MaterialEnterBox = styled.div`
  height: calc(100vh - 100px);
  padding: 15px;
  background: #f5f5f5;
  overflow: auto;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    color: #000;
  }
`;

const state = {
  '1': '验收员', //待验收
  '10': '验收员', //驳回
  '444': '验收员', //验收超时
  '2': '', //已验收
  '11': '项目经理', //待确认
};

function MaterialEnter() {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialEnter } = server;
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(0);

  const loadMore = async () => {
    if (!hasMore) return;
    const res = await materialEnter.getEnterList({
      pageSize: 10,
      current: pageNo + 1,
    });
    const newList = res.list.map((item: any) => {
      item.enterDate = dayjs(item.enterDate).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      return item;
    });
    setList([...list, ...newList]);
    setHasMore(newList.length > 0);

    if (hasMore) {
      setPageNo(pageNo + 1);
    }
  };

  //   useEffect(() => {
  //     // loadMore();
  //   }, []);

  return (
    <MaterialEnterBox>
      <Input
        placeholder="请输入送货人"
        prefix={
          <SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
        }
      />
      {list.map((item: any, i: number) => {
        return (
          <Card className="mt-10px" key={i}>
            <div className="title">
              {item.carNo}
              <DictSelect
                value={item.status}
                type="text"
                dictKey="flow_material_enter"
                isTag
              />
            </div>
            <div>进场时间：{item.enterDate}</div>
            <div>
              送货人:
              <span className="mx-10px">{item.deliveryMan}</span>
              {item.deliveryContact}
            </div>
            <div>下一节点：{state?.[item.status] || '--'}</div>
          </Card>
        );
      })}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll>
    </MaterialEnterBox>
  );
}

export default MaterialEnter;
