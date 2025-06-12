import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    List,
    Popup,
    Picker,
    Button,
    DatePicker
} from 'antd-mobile';
import dayjs from 'dayjs';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import PickerPopup from '../components/PickerPopup'

export default function DropdownExample() {
    const { server } = useBasicConfiguration();
    const { materialList, certificate, vehicle, subContractor } =
        server;


    const [form] = Form.useForm();

    //     const carNoOptions = ['京A12345', '沪B67890', '粤C11223']; // 车牌号示例
    // const receiverOptions = ['张三', '李四', '王五']; // 验收人示例
    // const purchaseUnitOptions = ['单位A', '单位B', '单位C']; // 购买单位示例


    const [carNoPopupVisible, setCarNoPopupVisible] = useState(false);
    const [carNoOptions, setCarNoOptions] = useState([]);

    const [enterDateVisible, setEnterDateVisible] = useState(false);

    const [materialManPopupVisible, setMaterialManPopupVisible] = useState(false);

    const [purchaseUnitPopupVisible, setPurchaseUnitPopupVisible] = useState(false);
    const [departmentOptions, setDepartmentOptions] = useState([]);

    const [columns, setColumns] = useState([])

    const [visible, setVisible] = useState(false);

    // 选择器确认回调
    const onConfirm = (value) => {
        form.setFieldsValue({ dropdown: value[0] });
        setVisible(false);
    };

    const init = () => {
        queryCarNo();   // 请求车牌列表
        queryMaterialMan();   // 请求验收人列表

    }
    // const res1 = await subContractor.getAllSubContractor();

    // 请求车牌列表
    const queryCarNo = async () => {
        const { list } = await vehicle.vehicleApproveList({
            carNo: '',
        });
        const res = list.map((item: any) => {
            return {
                label: item.carNo,
                value: item.carNo
            }
        })
        setCarNoOptions([res])
    }

    const queryMaterialMan = async () => {
        const res = await certificate.getPersonInfoList();
        console.log(res)
    }

    // 请求购买单位
    const queryDepartment = async () => {
        const res = await certificate.getPersonInfoList();
        console.log(res)
    }

  


    useEffect(() => {
        init();
    }, [])

    return (
        <>
            <Form form={form} layout="horizontal" >
                <Form.Item label="车牌号" name="carNo" onClick={() => setCarNoPopupVisible(true)} >

                    {/* <Picker
                    title={
                        <Input
                            placeholder='请输入车牌号'
                            value={form.carNo}
                            onClick={() => setCarNoPopupVisible(true)}
                        />
                    }
                    columns={carNoOptions}
                    visible={carNoPopupVisible}
                    onClose={() => {
                        setCarNoPopupVisible(false)
                    }}
                    onConfirm={v => {
                        setCarNoPopupVisible(false)
                    }}
                /> */}
                </Form.Item>
                <Form.Item label="进场时间" name="enterDate" onClick={() => setEnterDateVisible(true)} rules={[{ required: true, message: '进场时间不能为空' }]}>
                    <DatePicker visible={enterDateVisible} onClose={() => {
                        setEnterDateVisible(false)
                    }}
                        onConfirm={v => {
                            setEnterDateVisible(false)
                        }}>
                        {value =>
                            value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
                        }
                    </DatePicker>
                </Form.Item>
                <Form.Item name='deliveryMan' label='送货人' rules={[{ required: true, message: '请输入送货人' }]}>
                    <Input placeholder='请输入送货人' />
                </Form.Item>
                <Form.Item name='deliveryContact' label='送货人联系方式' rules={[{ required: true, message: '请输入请输入送货人联系方式' }]}>
                    <Input placeholder='请输入送货人联系方式' />
                </Form.Item>
                <Form.Item label="验收人" name="materialMan" onClick={() => setMaterialManPopupVisible(true)} >
                    <Picker
                        title={
                            <Input
                                placeholder='请选择验收人'
                                value={form.materialMan}
                                onClick={() => setMaterialManPopupVisible(true)}
                            />
                        }
                        columns={carNoOptions}
                        visible={materialManPopupVisible}
                        onClose={() => {
                            setMaterialManPopupVisible(false)
                        }}
                        onConfirm={v => {
                            setMaterialManPopupVisible(false)
                        }}
                    />
                </Form.Item>
                <Form.Item label="购买单位" name="purchaserDepartment" onClick={() => setMaterialManPopupVisible(true)} >
                    <Picker
                        title={
                            <Input
                                placeholder='请选择购买单位'
                                value={form.purchaserDepartment}
                                onClick={() => setMaterialManPopupVisible(true)}
                            />
                        }
                        columns={carNoOptions}
                        visible={materialManPopupVisible}
                        onClose={() => {
                            setMaterialManPopupVisible(false)
                        }}
                        onConfirm={v => {
                            setMaterialManPopupVisible(false)
                        }}
                    />
                </Form.Item>
                <Button
                    type="submit"
                    onClick={() => form.submit()}
                >
                    提交
                </Button>
            </Form>

            <PickerPopup columns={columns} />
        </>
    );
}
