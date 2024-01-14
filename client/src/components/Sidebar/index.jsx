import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Flex, Typography, theme } from "antd";
import { ApiFilled } from "@ant-design/icons";
import data from "./data";

const { Title } = Typography;

const SideBar = ({ collapsed }) => {
  const [selectedKey, setSelectedKey] = useState("0");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);

  const SiderMenu = () => {
    const onClickHandle = ({ key }) => {
      navigate(key);
    };

    const mapData = data.map((item) => ({ ...item, onClick: onClickHandle }));

    return <Menu mode="inline" selectedKeys={[selectedKey]} items={mapData} />;
  };

  return (
    <Layout.Sider
      style={{
        background: colorBgContainer,
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      breakpoint={"lg"}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Flex justify="center">
        <Title level={3} style={{ marginTop: ".5em", userSelect: "none" }}>
          <ApiFilled /> Automate
        </Title>
      </Flex>
      <SiderMenu />
    </Layout.Sider>
  );
};

export default SideBar;
