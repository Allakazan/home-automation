import React, { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Space, Row, Button, Table, Form, Modal, Input, Select, notification } from 'antd';

export default function Devices() {
    const [api, contextHolder] = notification.useNotification();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const ItemCreateForm = ({createModalOpen, onCreate, onCancel}) => {
        const [form] = Form.useForm();

        return (
            <Modal
                open={createModalOpen}
                title="Create new device"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_create"
                >
                    <Form.Item
                        name="room"
                        label="Room"
                        rules={[
                            { required: true, message: 'Please input the room name!' },
                        ]}
                    >
                        <Input placeholder="Ex. Bedroom" />
                    </Form.Item>
                    <Form.Item
                        name="device_name"
                        label="Device Name"
                        rules={[
                            { required: true, message: 'Please input the device name!' },
                        ]}
                    >
                        <Input placeholder="Device Name" />
                    </Form.Item>
                    <Form.Item
                        name="device_type"
                        label="Device Type"
                        rules={[
                            { required: true, message: 'Please input the device type!' },
                        ]}
                    >
                        <Select
                            placeholder="Select a option below"
                            allowClear
                            >
                            <Select.Option value="switch">
                                <Space>
                                    <img width={26} src="./icons/smart-switch.svg"/>
                                    Switch
                                </Space>
                            </Select.Option>
                            <Select.Option value="rgb_led">
                                <Space>
                                    <img width={26} src="./icons/smart-bulb.svg"/>
                                    RGB Led
                                </Space>
                            </Select.Option>
                            <Select.Option value="rgbw_led">
                                <Space>
                                    <img width={26} src="./icons/smart-bulb.svg"/>
                                    RGBW Led
                                </Space>
                            </Select.Option>
                            <Select.Option value="plug">
                                <Space>
                                    <img width={26} src="./icons/smart-plug.svg"/>
                                    Plug
                                </Space>
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setData([
                {
                    key: '1',
                    room: 'Bedroom',
                    device_name: 'Lights',
                    device_type: 'switch'
                },
                {
                    key: '2',
                    room: 'Bedroom',
                    device_name: 'Table Leds',
                    device_type: 'rgb_led'
                },
                {
                    key: '3',
                    room: 'Bedroom',
                    device_name: 'Ceiling Leds',
                    device_type: 'rgbw_led'
                }
            ])  
            setLoading(false);
        }, 2000);


    }, []);

    return (
        <div>
            {contextHolder}
            <Row style={{marginBottom: '24px'}} justify={'end'}>
                <Button icon={<PlusOutlined/>} onClick={() => setCreateModalOpen(true)}>
                    New Device
                </Button> 
            </Row>
            <ItemCreateForm
                {...{
                    createModalOpen,
                    onCreate: (values) => {
                        console.log('Received values of form: ', values);
                        setCreateModalOpen(false);
                    },
                    onCancel: () => {
                        setCreateModalOpen(false);
                    }
                }}
            />
            <Table 
                dataSource={data}
                columns={[
                    {
                        title: 'Room',
                        dataIndex: 'room',
                        key: 'room',
                    },
                    {
                        title: 'Name',
                        dataIndex: 'device_name',
                        key: 'device_name',
                    },
                    {
                        title: 'Type',
                        dataIndex: 'device_type',
                        key: 'device_type',
                    },
                ]}
                {...{loading}}
            />
        </div>
    );
    }