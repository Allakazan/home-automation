import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, theme, Layout, Space, Breadcrumb, Button } from "antd";
import NavBar from "./components/Navbar";
import SideBar from "./components/Sidebar";

const { defaultAlgorithm, darkAlgorithm } = theme;

function Root() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getBreadcumbs = () => {
    return [
      { title: <a href="#">Home</a> },
      { title: <a href="#">Users</a> },
      { title: "Bruno" },
    ];
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          borderRadius: 2,
          colorError: "#ff4d69",
          colorSuccess: "#1ac45b",
          colorWarning: "#FACB14",
          colorPrimary: "#7316FF",
          colorInfo: "#7316FF",
        },
      }}
    >
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Layout>
          <SideBar {...{ collapsed }} />
          <Layout
            style={{
              marginLeft: collapsed ? 80 : 200,
              transition: "margin 0.2s",
              minHeight: "100vh",
            }}
          >
            <NavBar {...{ collapsed, setCollapsed }} />
            <Layout.Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
              }}
            >
              <Breadcrumb
                items={getBreadcumbs()}
                style={{ margin: "0px 0px 24px" }}
              ></Breadcrumb>
              <Button onClick={() => setIsDarkMode((prev) => !prev)}>
                Change
              </Button>
              <div
                style={{
                  padding: 24,
                  minHeight: "83vh",
                }}
              >
                <Outlet />
              </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: "center" }}>
              Made with 💜 by Allakazan
            </Layout.Footer>
          </Layout>
        </Layout>
      </Space>
    </ConfigProvider>
  );
}

export default Root;
