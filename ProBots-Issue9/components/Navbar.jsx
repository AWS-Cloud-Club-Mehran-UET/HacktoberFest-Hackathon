import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, Layout, Menu, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { createClient } from "@supabase/supabase-js";
import logoImage from '../src/assets/muet.png';

const { Header, Sider } = Layout;


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const StyledHeader = styled(Header)`
  background: #555091;
  padding: 0 16px;
  position: fixed;
  width: calc(100% - 200px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left:200px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  font-family: "Arial", sans-serif;

  &:hover {
    color: #b02915;
    cursor: pointer;
  }
`;

const HeaderContentWrapper = styled.div`
  display: flex;
  left: 92%;
  align-items: center;
  position: fixed;
  right: 6px;
`;

const StyledSider = styled(Sider)`
  background: #555091;
  position: fixed; /* Ensures it stays fixed on the left */
  height: 100vh; /* Takes the full height of the viewport */
  left: 0;
  top: 0;
  z-index: 1000;

  .ant-layout-sider-trigger {
    background: #fff;
  }
`;

const StyledMenu = styled(Menu)`
  background: #555091;
  height: 100%;
  border-right: 0;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

const UserText = styled(Typography.Text)`
  font-size: 16px;
  color: #313260;
  font-weight: 600;
  margin-left: -60px;

  &:hover {
    color: #b02915;
  }
`;
const LayoutWrapper = styled(Layout)`
  margin-left: 200px; /* Ensure the content starts after the sidebar */
  background-color: #ececec; /* Set a background color */
`;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleAvatarClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setIsAuthenticated(false);
      navigate("/");
    } else {
      console.error("Error logging out:", error.message);
    }
  };

  const fetchUserData = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
    } else if (user) {
      setIsAuthenticated(true);
      
      const { data, error: profileError } = await supabase
        .from("users") 
        .select("username")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Error fetching user profile:", profileError.message);
      } else {
        setUsername(data?.username || "Guest");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "1",
      icon: <DesktopOutlined />,
      label: <Link to="/hr">HR Admin</Link>,
    },
    {
      key: "2",
      icon: <ContainerOutlined />,
      label: <Link to="/employee">Employees</Link>,
    },
    {
      key: "profile",
      icon: <LogoutOutlined />,
      label: "Log Out",
      style: { marginTop: "auto" },
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <StyledSider trigger={null} collapsible collapsed={collapsed}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
            position: "absolute",
            top: 16,
            left: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <StyledMenu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          items={menuItems}
        />
      </StyledSider>
      <Layout>
        <StyledHeader>
          <HeaderContent>
          <img src={logoImage} width="50" height="45" alt="Logo" />
            MY MUET- HR Management
          </HeaderContent>
          <HeaderContentWrapper>
            {isAuthenticated ? (
              <UserText>{`Hi, ${username}`}</UserText>
            ) : (
              <Avatar
                size={48}
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
                onClick={handleAvatarClick}
              />
            )}
          </HeaderContentWrapper>
        </StyledHeader>
      </Layout>
    </Layout>
  );
};

export default Navbar;