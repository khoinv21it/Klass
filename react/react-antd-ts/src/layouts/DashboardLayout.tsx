import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router";

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Menu data separated for easier modification
  const menuData = [
    { key: "1", label: "Home", icon: <UserOutlined />, path: "/" },
    {
      key: "2",
      label: "Manage Employees",
      icon: <VideoCameraOutlined />,
      path: "/employees",
    },
    // { key: '3', label: 'nav 3', icon: <UploadOutlined /> },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey =
    menuData.find((m) => m.path === location.pathname)?.key || "1";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="flex items-center justify-center h-16 ">
          <h1 className="text-lg font-bold text-white transition-all duration-300">
            {collapsed ? "D" : "Dashboard Panel"}
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            const item = menuData.find((m) => m.key === key);
            if (item && item.path) navigate(item.path);
          }}
          items={menuData.map((m) => ({
            key: m.key,
            icon: m.icon,
            label: m.label,
          }))}
        />
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
