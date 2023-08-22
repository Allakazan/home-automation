import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Divider, notification } from 'antd';

export default function Dashboard() {
    const [api, contextHolder] = notification.useNotification();

    const data = [
        {
            room: 'Bedroom',
            devices: [
                {
                    id: "10ee14f4-d5bb-4ceb-b4b2-2f5aaca7d072",
                    name: "Lights",
                    icon: "./icons/smart-switch.svg"
                },
                {
                    id: "b937fc1c-9380-4aa0-9f12-faaf908a4730",
                    name: "Leds",
                    icon: "./icons/smart-bulb.svg"
                }
            ]
        },
        {
            room: 'Living Room',
            devices: [
                {
                    id: "19fe8562-4a16-421a-a390-0a69385be84d",
                    name: "Lights",
                    icon: "./icons/smart-switch.svg"
                },
                {
                    id: "dc2d1886-b652-4af6-8dfe-0d02066b1d24",
                    name: "Plug #1",
                    icon: "./icons/smart-plug.svg"
                },
                {
                    id: "6efcf306-fb1d-473b-99c8-9f4daa12e5c2",
                    name: "Plug #2",
                    icon: "./icons/smart-plug.svg"
                }
            ]
        }
    ]

    const OnDeviceAction = ({name}, action) => {
        api.info({
            message: 'New Action',
            description: `"${action}" action was send to ${name} device.`,
          });
    }

    const DeviceItem = (device) => {
        const { name, icon } = device;
        const [actionStates, setActionStates] = useState({
            'On': false,
            'Off': false
        })

        const onActionClick = (action) => {
            OnDeviceAction(device, action)
            setActionStates(prev => ({...prev, [action]: true}))

            setTimeout(() => {
                setActionStates(prev => ({...prev, [action]: false}))
            }, 1500)
        }

        return (
            <Card
                style={{ width: 270, margin: '20px' }}
                actions={[
                    <Button type="link" loading={actionStates.On} onClick={() => onActionClick('On')}>On</Button>,
                    <Button type="link" loading={actionStates.Off} onClick={() => onActionClick('Off')}>Off</Button>,
                ]}
            >
                <Card.Meta
                    title={name}
                    style={{textAlign: 'center'}}
                />
                <img alt="smart icon" style={{maxWidth: 130, display: 'block', margin: '20px auto'}} src={icon} />
            </Card>
        )
    }

    return (
        <div>
            {contextHolder}
            {data.map(({room, devices}) => {
                return (
                    <div key={room}>
                        <Divider orientation="left" orientationMargin="0">{room}</Divider>
                        <Space wrap>
                            {devices.map(device => <DeviceItem key={device.id} {...device}/>)}
                        </Space>
                    </div>
                )
            })}
        </div>
    );
    }