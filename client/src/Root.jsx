import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import { ConfigProvider, theme, Layout, Space, Breadcrumb } from 'antd';
import NavBar from './components/Navbar';
import SideBar from './components/Sidebar';

function Root() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer } } = theme.useToken();

    const getBreadcumbs = () => {
        return [
            {title: <a href='#'>Home</a>},
            {title: <a href='#'>Users</a>},
            {title: 'Bruno'}
        ]
    }

    return (
        <ConfigProvider>
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                }}>
                <Layout>
                    <SideBar {...{collapsed}}/>
                    <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin 0.2s', minHeight: '100vh' }}>
                        <NavBar {...{collapsed, setCollapsed}}/>
                        <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <Breadcrumb items={getBreadcumbs()} style={{ margin: '0px 0px 24px' }}></Breadcrumb>
                            <div style={{ padding: 24, minHeight: '83vh', background: colorBgContainer }}>
                                <Outlet />
                            </div>
                        </Layout.Content>
                        <Layout.Footer style={{ textAlign: 'center' }}>Allakazan ©2023 Created by Bruno Marques</Layout.Footer>
                    </Layout>
                </Layout>
            </Space>
        </ConfigProvider>
    )
}

export default Root
