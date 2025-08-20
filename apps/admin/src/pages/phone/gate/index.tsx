import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Card,
  Space,
  InfiniteScroll,
  Button,
  Tag,
  Toast,
  Dialog,
} from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { useAppSelector } from 'hooks';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DictSelect from '@/components/DictSelect';
import { setToken } from 'utils';
import InfiniteScrollContent from '../components/InfiniteScrollContent';

const MaterialEnterBox = styled.div`
  height: calc(100vh - 100px);
  padding: 55px 15px 15px;
  background: #f5f5f5;
  overflow: auto;
  .add {
    position: fixed;
    top: 0;
    right: 20px;
    line-height: 45px;
    z-index: 9999;
  }
  .input-box {
    z-index: 99;
    position: fixed;
    left: 0;
    right: 0;
    top: 45px;
    padding: 15px 15px 15px;
    background: #f4f4f4;
    .input {
      height: 34px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.07);
      .adm-input-element {
        padding-left: 10px;
        font-size: 14px;
      }
    }
  }

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

function Gate() {
  const navigate = useNavigate();

  const { server } = useBasicConfiguration();
  const { materialEnter } = server;
  const [deliveryMan, setDeliveryMan] = useState('');
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const { user }: { user: any } = useAppSelector(
    (state) => state
  );
  const { userInfor } = user;

  const loadMore = async () => {
    if (!hasMore) return;
    const res = await materialEnter.getEnterList({
      deliveryMan: deliveryMan,
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

  // 点击新增
  const handleAdd = () => {
    navigate('/phone/material-create');
  };

  // 点击详情
  const handleDetail = (detail: any) => {
    navigate(
      `/phone/material-enter-detail?detail=${JSON.stringify(
        detail
      )}`
    );
    setToken('PHONETITLE', '详情');
  };

  // 点击发起申请
  const handleWorkflow = (detail: any) => {
    Dialog.show({
      content: '发起申请后将无法编辑',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'delete',
            text: '确定',
            onClick: async () => {
              await materialEnter.startBpm({
                materialsEnterId: detail.id,
              });
              Toast.show({
                icon: 'success',
                content: '操作成功',
              });
              reset();
              loadMore();
            },
          },
        ],
      ],
    });
  };

  // 点击编辑
  const handleEditDetail = (detail: any) => {
    navigate(
      `/phone/material-create?detail=${JSON.stringify(detail)}`
    );
  };

  // 点击删除
  const handleDelete = async (detail: any) => {
    Dialog.show({
      content: '确认是否删除此项',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'delete',
            text: '确定',
            onClick: async () => {
              await materialEnter.deleteEnter({ id: detail.id });
              Toast.show({
                icon: 'success',
                content: '操作成功',
              });
              reset();
              loadMore();
            },
          },
        ],
      ],
    });
  };

  // 点击验收
  const handleCheck = (detail: any) => {
    navigate(
      `/phone/material-enter-detail?type=check&detail=${JSON.stringify(
        detail
      )}`
    );
    setToken('PHONETITLE', '验收');
  };

  // 点击确认
  const handleConfirm = (detail: any) => {
    navigate(
      `/phone/material-enter-detail?type=confirm&detail=${JSON.stringify(
        detail
      )}`
    );
    setToken('PHONETITLE', '审核');
  };

  const reset = () => {
    setHasMore(true);
    setPageNo(0);
    setList([]);
  };

  useEffect(() => {
    setToken('PHONETITLE', '闸机管理');
  });

  return (
    <MaterialEnterBox>
      <div className="input-box">
        <Input
          className="input"
          placeholder="请输入闸机名称"
          value={deliveryMan}
          onChange={(val) => {
            setDeliveryMan(val);
            reset();
            loadMore();
          }}
        />
      </div>

      {list.map((item: any, i: number) => {
        return (
          <Card className="mt-10px" key={i}>
            <div className="title">
              {item.name || '--'}
              {item.status == '11' ? (
                <Tag round color="#349af1">
                  正常
                </Tag>
              ) : (
                <Tag round color="#4ab205">
                  异常
                </Tag>
              )}
            </div>

            <Space
              className="btn"
              onClick={(e) => e.stopPropagation()}
            >
              是否常开
              {/* {item.status == '11' &&
                userInfor.roles.includes('project-manager') && (
                  <Button
                    size="mini"
                    onClick={() => {
                      handleConfirm(item);
                    }}
                  >
                    审核
                  </Button>
                )} */}
            </Space>
            {/* </div> */}
          </Card>
        );
      })}

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll>
    </MaterialEnterBox>
  );
}

export default Gate;
