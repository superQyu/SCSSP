import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Card,
  Space,
  InfiniteScroll,
  Button,
} from 'antd-mobile';
import {
  InfoCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DictSelect from '@/components/DictSelect';
import { setToken } from 'utils';
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

  .btn {
    padding-top: 11px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: flex-end;
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
  const navigate = useNavigate();

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

  const handleClick = () => {};

  // 点击详情
  const handleDetail = (detail: any) => {
    console.log(1, JSON.stringify(detail));
    navigate(
      `/phone/material-enter-detail?detail=${JSON.stringify(
        detail
      )}`
    );
    setToken('PHONETITLE', '详情');
  };

  // 点击验收
  const handleCheck =(detail: any)=>{
    navigate(
      `/phone/material-enter-detail?type=check&detail=${JSON.stringify(
        detail
      )}`
    );
    setToken('PHONETITLE', '验收');
  }

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
          <Card
            className="mt-10px"
            key={i}
            onClick={() => handleClick(item)}
          >
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

            <div
              className="btn"
              onClick={(e) => e.stopPropagation()}
            >
              <Space>
                <Button size="mini">编辑</Button>
                <Button
                  size="mini"
                  onClick={() => {
                    handleDetail(item);
                  }}
                >
                  详情
                </Button>
                <Button
                  size="mini"
                  onClick={() => {
                    handleCheck(item);
                  }}
                >
                  验收
                </Button>
              </Space>
            </div>
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
