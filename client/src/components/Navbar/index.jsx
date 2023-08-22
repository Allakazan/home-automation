import React, { useState } from "react";
import { Layout, Drawer, Button, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

import logo from "/vite.svg"
import "./styles.css"

const NavBar = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header className="navbar" style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(prev => !prev)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Layout.Header>
  );
};

export default NavBar;