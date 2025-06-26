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
import dayjs from 'dayjs';
import styled from 'styled-components';

import { useAppSelector } from 'hooks';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DictSelect from '@/components/DictSelect';
import DictText from '@/components/DictSelect/DictText';
import { setToken } from 'utils';
import InfiniteScrollContent from '../components/InfiniteScrollContent';

const MaterialEnterBox = styled.div`
  height: calc(100vh - 100px);
  padding: 15px;
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
    height: 34px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.07);
    .adm-input-element {
      padding-left: 10px;
      font-size: 14px;
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

const booleanObj = {
  '1': '是',
  '2': '否',
};
const typeArr = [
  {
    label: '土方车',
    value: '1',
  },
  {
    label: '其他',
    value: '2',
  },
  {
    label: '罐车',
    value: '3',
  },
];

function MaterialEnter() {
  const navigate = useNavigate();

  const { server } = useBasicConfiguration();
  const { vehicle: V, materialEnter } = server;
  const [deliveryMan, setDeliveryMan] = useState('');
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [materials, setMaterials] = useState([]);
  const { user } = useAppSelector((state) => state) as {
    user: { menu: any; userInfor: object };
  };
  const { userInfor } = user;

  const queryMaterials = async () => {
    const res = await materialEnter.getEnterList({});
    const options = res.list.map((item: any) => {
      const materials = item.materialsDetailsWithInventoryRespVOS
        .map((el, i) => {
          return `${el.materialName}`;
        })
        .join('和');
      return {
        label: `${dayjs(item.enterDate).format(
          'YYYY-MM-DD HH:mm:ss'
        )} ${materials}`,
        value: item.id,
      };
    });
    setMaterials(options);
  };

  const loadMore = async () => {
    if (!materials.length) {
      await queryMaterials();
    }
    if (!hasMore) return;
    const res = await V.vehicleApproveList({
      carNo: deliveryMan,
      pageSize: 10,
      current: pageNo + 1,
    });

    const newList = res.list.map((item: any) => {
      return {
        ...item,

        carType:
          typeArr.find((el: any) => el.value == item.carType)
            ?.label || '',
      };
    });
    setList([...list, ...newList]);
    setHasMore(newList.length > 0);

    if (hasMore) {
      setPageNo(pageNo + 1);
    }
  };

  // 点击新增
  const handleAdd = () => {
    navigate('/phone/carNo-create');
  };

  // 点击详情
  const handleDetail = (detail: any) => {
    detail = {
      ...detail,
      isGps: booleanObj[detail.isGps],
      materialEnterName:
        materials.find(
          (el: any) => el.value == detail.materialEnterId
        )?.label || '',
    };
    navigate(
      `/phone/carNo-detail?detail=${JSON.stringify(detail)}`
    );
    setToken('PHONETITLE', '详情');
  };

  // 点击编辑
  const handleEditDetail = (detail: any) => {
    detail = {
      ...detail,
      materialEnterName:
        materials.find(
          (el: any) => el.value == detail.materialEnterId
        )?.label || '',
    };
    navigate(
      `/phone/carNo-create?detail=${JSON.stringify(detail)}`
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
              await V.vehicleApproveDel({ id: detail.id });
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

  // 点击确认
  const handleConfirm = (detail: any) => {
    detail = {
      ...detail,
      isGps: booleanObj[detail.isGps],
      materialEnterName:
        materials.find(
          (el: any) => el.value == detail.materialEnterId
        )?.label || '',
    };
    navigate(
      `/phone/carNo-detail?type=confirm&detail=${JSON.stringify(
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
    queryMaterials();
  }, []);

  useEffect(() => {
    setToken('PHONETITLE', '车牌');
  });

  return (
    <MaterialEnterBox>
      {userInfor.roles.includes('plan') && (
        <div className="add" onClick={handleAdd}>
          新增
        </div>
      )}
      <Input
        className="input-box"
        placeholder="请输入车牌号"
        value={deliveryMan}
        onChange={(val) => {
          setDeliveryMan(val);
          reset();
          loadMore();
        }}
      />
      {list.map((item: any, i: number) => {
        return (
          <Card className="mt-10px" key={i}>
            <div className="title">{item.carNo || '--'}</div>
            <div className="adm-list-item-content-main">
              是否安装GPS
              <span className="adm-list-item-description  mx-10px">
                {item.isGps}
                {/* {booleanObj[item.isGps]} */}
                {/* <DictText
                  dictKey={'system_true_false'}
                  value={item.isGps}
                /> */}
              </span>
            </div>
            <div className="adm-list-item-main">
              车辆类型:
              <span className="adm-list-item-description mx-10px">
                {item.carType}
                {/* {
                  typeArr.find((el) => el.value == item.carType)
                    ?.label
                } */}
                {/* <DictText
                  dictKey={'cm_car_type'}
                  value={item.carType}
                /> */}
              </span>
            </div>
            <div className="adm-list-item-content-main">
              车载容量:
              <span className="adm-list-item-description mx-10px">
                {item.carStorage}
              </span>
            </div>

            <Space
              className="btn"
              onClick={(e) => e.stopPropagation()}
            >
              {userInfor.roles.includes('plan') && (
                <Button
                  size="mini"
                  onClick={() => {
                    handleEditDetail(item);
                  }}
                >
                  编辑
                </Button>
              )}
              {userInfor.roles.includes('plan') && (
                <Button
                  size="mini"
                  onClick={() => {
                    handleDelete(item);
                  }}
                >
                  删除
                </Button>
              )}
              <Button
                size="mini"
                onClick={() => {
                  handleDetail(item);
                }}
              >
                详情
              </Button>
              {!item.result &&
                userInfor.roles.includes('project-manager') && (
                  <Button
                    size="mini"
                    onClick={() => {
                      handleConfirm(item);
                    }}
                  >
                    审核
                  </Button>
                )}
            </Space>
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
