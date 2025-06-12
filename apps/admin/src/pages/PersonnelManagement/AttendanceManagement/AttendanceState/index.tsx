import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tag } from 'antd';
import styled from 'styled-components';
import { Flex } from 'antd';


const CustomContent = styled.div`
padding:10px 20px;

.content {
height: calc(100vh - 60px);
overflow-y: auto;
}

.top {
padding-bottom:20px;
width :100%;
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

`
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};



const App: React.FC = () => {
    const [form] = Form.useForm();
    const [list, setList] = useState([])

    const onFinish = (values: any) => {
        console.log(values);
    };


    // const onFinish = (values: any) => {
    //     console.log(values);
    //   };
    const queryData = () => {
        setList(Array.from({ length: 20 }, (_, i) => {
            return {
                id: i
            }
        }))
    }

    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => {
        queryData()
    })

    return (
        <CustomContent>
            <Form
                {...layout}
                layout="inline"
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['user', 'name']} label="姓名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="考勤状态" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>

                    </Space>
                </Form.Item>
            </Form>
            <div className='content p-20px bg-#fff'>
                <Space wrap size={24}>
                    {
                        list.map(item => {
                            return (
                                <Card style={{ width: 375 }}>
                                    <Space wrap size={16} className='top'>
                                        <Avatar size={56} icon={<UserOutlined />} />
                                        <div>
                                            <div>高僧接  <Tag color="success">success</Tag></div>
                                            <div className='color-#000 mt-2px'>
                                                <span className='label'>
                                                    角色</span> ：
                                                项目经理</div>
                                        </div>
                                    </Space>
                                    <Flex wrap className='mt-10px' justify="center" align='center' >
                                        <Flex className='item w-33%' vertical={true} justify="center" align='center' >
                                            <div className='value'>5/20</div>
                                            <div className='label'> 本月打卡(天) </div>
                                        </Flex>
                                        <div className='bg-#999 h-35px w-1px' style={{ background: 'rgba(153, 153, 153, 0.25)' }}></div>
                                        <Flex className='w-33%' vertical={true} justify="center" align='center'>
                                            <div className='value'>520</div>
                                            <div className='label'> 解除限制 </div>
                                        </Flex>
                                        <div className='bg-#999 h-35px w-1px' style={{ background: 'rgba(153, 153, 153, 0.25)' }}></div>
                                        <Flex className='w-33%' vertical={true} justify="center" align='center'>
                                            <div className='value'>20</div>
                                            <div className='label'>累计打卡(天) </div>
                                        </Flex>
                                    </Flex>
                                </Card>)
                        })
                    }
                </Space>
            </div>
        </CustomContent>
    )
}

export default App;