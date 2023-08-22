import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from "antd";
import data from "./data";
import "./styles.css"

const SideBar = ({ collapsed }) => {
  const [selectedKey, setSelectedKey] = useState("0");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedKey(location.pathname)
  }, [location]);

  const SiderMenu = () => {

    const onClickHandle = ({key}) => {
      navigate(key)
    }

    const mapData = data.map(item => ({...item, onClick: onClickHandle}));

    return (
      <Menu mode="inline" theme="dark" selectedKeys={[selectedKey]} items={mapData} />
    );
  }

  return (
    <Layout.Sider
    style={{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
    }}
      breakpoint={"lg"}
      theme="dark"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="demo-logo-vertical" />
      <SiderMenu/>
    </Layout.Sider>
  );
};

export default SideBar;