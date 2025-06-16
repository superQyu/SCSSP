import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Card,
  Space,
  Flex,
  Pagination,
  Row,
  Col,
  Image,
  Empty,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tag } from 'antd';
import styled from 'styled-components';

import DictSelect from '@/components/DictSelect';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import dayjs from 'dayjs';
const CustomContent = styled.div`
  position: relative;
  padding: 10px 20px;
  .btn {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  .content {
    height: calc(100vh - 180px);
    padding-bottom: 80px;
    overflow-y: auto;
  }
  .top {
    padding-bottom: 20px;
    width: 100%;
    border-bottom: 1px solid rgba(153, 153, 153, 0.25);
  }
  .label {
    font-size: 14px;
    color: #666666;
  }
  .value {
    font-family: DINAlternate;
    font-weight: bold;
    font-size: 24px;
    color: #000000;
  }
  .pagination {
    position: absolute;
    bottom: 0px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    padding-block: 10px;
    background: #fff;
  }
`;

interface ItemVO {
  photoLinkNo: string;
  personnelName: string;
  status: string;
  workType: string;
  thisMonthAttendanceCount: string;
  unfreezeCount: string;
  historyAttendanceCount: string;
}

const App: React.FC = () => {
  const { server } = useBasicConfiguration();
  const { attendance: A } = server;

  const [form] = Form.useForm();
  const [list, setList] = useState<ItemVO[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const queryData = async () => {
    const params = form.getFieldsValue();
    const res = await A.getPersonnelStatusControlList({
      ...params,
      pageNo: pageNo,
      pageSize: pageSize,
    });
    setList(res.list);
    setTotal(res.total);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handlePageChange = (
    pageNo: number,
    pageSize: number
  ) => {
    setPageNo(pageNo);
    setPageSize(pageSize);
  };

  useEffect(() => {
    queryData();
  }, [pageNo, pageSize]);

  return (
    <CustomContent>
      <Card className="mb-20px">
        <Form form={form} layout="inline">
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入" allowClear />
          </Form.Item>
          <Form.Item name="status" label="考勤状态">
            <div className="w-200px">
              <DictSelect
                dictKey="personnel_info_status"
                dropdownExtend={false}
                onChange={(value: string) =>
                  form.setFieldsValue({ status: value })
                }
              />
            </div>
          </Form.Item>
          <Form.Item className="btn">
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                onClick={queryData}
              >
                查询
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      {total > 0 ? (
        <>
          <div className="content p-20px bg-#fff">
            <Row className="" gutter={[20, 20]}>
              {list.map((item) => {
                return (
                  <Col
                    xs={{ flex: '100%' }}
                    sm={{ flex: '50%' }}
                    md={{ flex: '50%' }}
                    lg={{ flex: '50%' }}
                    xl={{ flex: '33%' }}
                    xxl={{ flex: '25%' }}
                  >
                    <Card
                      style={{
                        background:
                          item.status == '444'
                            ? 'rgba(212, 42, 42, 0.03)'
                            : item.status == '222'
                            ? 'rgba(212, 136, 6, 0.03)'
                            : '',
                            border:
                            item.status == '444'
                              ? '1px solid #D42A2A'
                              : item.status == '222'
                              ? '1px solid #D48806'
                              : '', 
                      }}
                    >
                      <Space wrap size={16} className="top">
                        <Avatar
                          size={56}
                          icon={<UserOutlined />}
                          src={
                            <Image
                              src={
                                item.photoLinkNo
                                  ? `/src/assets/avatar/${item.photoLinkNo}_1.jpg`
                                  : `/src/assets/avatar/default.png`
                              }
                              fallback={`/src/assets/avatar/default.png`}
                              onError={() => {
                                return true;
                              }}
                            />
                          }
                        />
                        <div>
                          <Space>
                            {item.personnelName}
                            {item.status == '2' ? (
                              <Tag color="success">考勤正常</Tag>
                            ) : item.status == '11' ||
                              item.status == '0' ||
                              !item.status ? (
                              <Tag color="processing">
                                审核中
                              </Tag>
                            ) : item.status == '444' ? (
                              <Tag color="error">
                                考勤异常(连续三天未考勤)
                              </Tag>
                            ) : item.status == '222' ? (
                              <Tag color="gold">已解除限制</Tag>
                            ) : (
                              <Tag color="warning">驳回</Tag>
                            )}
                          </Space>

                          <div className="color-#000 mt-2px">
                            <span className="label">角色</span>：
                            {item.workType}
                          </div>
                        </div>
                      </Space>
                      <Flex
                        wrap
                        className="mt-10px"
                        justify="center"
                        align="center"
                      >
                        <Flex
                          className="item w-33%"
                          vertical={true}
                          justify="center"
                          align="center"
                        >
                          <div className="value">
                            <span className="color-#418CE8">
                              {item.thisMonthAttendanceCount}
                            </span>
                            /{dayjs().daysInMonth()}
                          </div>
                          <div className="label">
                            本月打卡(天)
                          </div>
                        </Flex>
                        <div
                          className="bg-#999 h-35px w-1px"
                          style={{
                            background:
                              'rgba(153, 153, 153, 0.25)',
                          }}
                        ></div>
                        <Flex
                          className="w-33%"
                          vertical={true}
                          justify="center"
                          align="center"
                        >
                          <div className="value">
                            {item.unfreezeCount}
                          </div>
                          <div className="label"> 解除限制 </div>
                        </Flex>
                        <div
                          className="bg-#999 h-35px w-1px"
                          style={{
                            background:
                              'rgba(153, 153, 153, 0.25)',
                          }}
                        ></div>
                        <Flex
                          className="w-33%"
                          vertical={true}
                          justify="center"
                          align="center"
                        >
                          <div className="value">
                            {item.historyAttendanceCount}
                          </div>
                          <div className="label">
                            累计打卡(天)
                          </div>
                        </Flex>
                      </Flex>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
          <div className="pagination">
            <Pagination
              total={total}
              pageSize={pageSize}
              size="small"
              showSizeChanger
              onChange={handlePageChange}
              showTotal={(total) =>
                `第1${
                  Math.ceil(total / pageSize) > 1
                    ? `-${Math.ceil(total / pageSize)}`
                    : ''
                }条/总共${total}条`
              }
            />
          </div>
        </>
      ) : (
        <div className="content p-20px bg-#fff">
          <Empty
            className="mt-200px"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )}
    </CustomContent>
  );
};

export default App;
