// src/Layout/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Button, Drawer, Grid, Badge } from "antd";
import {
  HomeOutlined,
  PlusOutlined,
  UserOutlined,
  AppstoreOutlined,
  TeamOutlined,
  DollarCircleOutlined,
  MenuOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Components/Providers/AuthProviders";


const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

/**
 * MediCamps Dashboard - AntD version
 * - Responsive Sider (desktop) + Drawer (mobile)
 * - Bottom nav for small screens
 * - Uses your MediCamps color tokens
 */

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();
   const { user } = useContext(AuthContext);

  // Sider collapsed state for desktop
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
  if (location.pathname === "/dashboard") {
    if (isAdmin) {
      navigate("/dashboard/organizers", { replace: true });
    } else {
      navigate("/dashboard/analytics", { replace: true });
    }
  }
}, [location.pathname, isAdmin, navigate]);
  // Drawer (mobile menu) visibility
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Build menu data conditionally based on role
  const menuItems = isAdmin
    ? [
        { key: "/dashboard/organizers", icon: <TeamOutlined />, label: "Organizer Profile" },
        { key: "/dashboard/addcamps", icon: <PlusOutlined />, label: "Add a Camp" },
        { key: "/dashboard/managecamps", icon: <AppstoreOutlined />, label: "Manage Camps" },
        { key: "/dashboard/manageregister", icon: <UserOutlined />, label: "Manage Registrations" },
      ]
    : [
        { key: "/dashboard/analytics", icon: <AppstoreOutlined />, label: "Analytics" },
        { key: "/dashboard/participantprofile", icon: <UserOutlined />, label: "Profile" },
        { key: "/dashboard/registeredcamps", icon: <AppstoreOutlined />, label: "Registered Camps" },
        { key: "/dashboard/paymenthistory", icon: <DollarCircleOutlined />, label: "Payment History" },
      ];

  // Add Home link at bottom of menu
  menuItems.push({ key: "/", icon: <HomeOutlined />, label: "Back to Home" });

  // Derive current selected key from location pathname (first matching)
  const selectedKey = menuItems.find((i) => location.pathname.startsWith(i.key))?.key || menuItems[0].key;

  // Mobile detection (treat width < 992 as mobile/tablet)
  const isMobile = !screens.lg;

  return (
    <Layout className="medicamps-dashboard" style={{ minHeight: "100vh", background: "#F5F9FA" }}>
      {/* Sider for desktop */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(val) => setCollapsed(val)}
          width={260}
          collapsedWidth={80}
          style={{
            background: "#0A2540",
            boxShadow: "2px 0 8px rgba(10,37,64,0.06)",
          }}
        >
          <div className="mc-brand" style={{ padding: "20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div className="mc-logo" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar size={collapsed ? 36 : 44} style={{ backgroundColor: "#26a6eb", color: "#fff" }} icon={<UserOutlined />} />
              {!collapsed && (
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 700, fontSize: 18 }}>
                    Medi<span style={{ color: "#26a6eb" }}>Camps</span>
                  </div>
                  <div style={{ color: "#9fb6c6", fontSize: 12 }}>Health camps & registrations</div>
                </div>
              )}
            </div>
          </div>

          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[selectedKey]}
            style={{
              background: "transparent",
              borderRight: "none",
              paddingTop: 6,
            }}
            items={menuItems.map((it) => ({
              key: it.key,
              icon: React.cloneElement(it.icon, { style: { color: "#ffffff", fontSize: 18 } }),
              label: <NavLink to={it.key}>{it.label}</NavLink>,
            }))}
          />

          <div style={{ marginTop: "auto", padding: 18 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Avatar style={{ backgroundColor: "#26a6eb" }} icon={<UserOutlined />} />
              {!collapsed && (
                <div style={{ color: "#cfeaf4", fontSize: 13 }}>
                  <div style={{ fontWeight: 700 }}>Hello, {user?.displayName}</div>
                  <div style={{ fontSize: 12 }}>{isAdmin ? 'Organizer' : 'Participant'}</div>
                </div>
              )}
            </div>
          </div>
        </Sider>
      )}

      {/* Drawer for mobile menu */}
      {isMobile && (
        <Drawer
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar style={{ backgroundColor: "#26a6eb" }} icon={<UserOutlined />} />
              <div style={{ fontWeight: 700, color: "#0A2540" }}>MediCamps</div>
            </div>
          }
          placement="left"
          closable
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ borderRight: "none" }}
            items={menuItems.map((it) => ({
              key: it.key,
              icon: it.icon,
              label: <NavLink to={it.key} onClick={() => setDrawerOpen(false)}>{it.label}</NavLink>,
            }))}
          />
        </Drawer>
      )}

      <Layout style={{ minHeight: "150vh" }}>
        {/* Header */}
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 20px",
            background: "#fff",
            boxShadow: "0 1px 6px rgba(16,24,40,0.08)",
            zIndex: 2,
          }}
        >
          {isMobile ? (
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 20, color: "#0A2540" }} />}
              onClick={() => setDrawerOpen(true)}
            />
          ) : (
            <Button
              type="text"
              icon={collapsed ? <MenuOutlined style={{ color: "#0A2540", fontSize: 18 }} /> : <LeftOutlined style={{ color: "#0A2540", fontSize: 18 }} />}
              onClick={() => setCollapsed((c) => !c)}
            />
          )}

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#0A2540" }}>
            {!isMobile ?   isAdmin ? "Organizer Dashboard" : "Participant Dashboard" : ""}
            </div>
            
          </div>

          {/* Right side actions */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        
              <Avatar onClick={() => navigate("/dashboard/participantprofile")} size={36} style={{ backgroundColor: "#26a6eb" }} icon={<UserOutlined />} />
  
           <Button
              type="primary"
              className="bg-[#26a6eb] hover:bg-[#55baef]"
              onClick={() => navigate(isAdmin ? "/dashboard/addcamps" : "/avalilablecamps")}
            >
              {isAdmin ? "Add Camp" : "Find Camps"}
            </Button>
          </div>
        </Header>

        {/* Page content */}
        <Content style={{overflow: "auto"  , backgroundColor:'white'}}>
          <div
            style={{
          
              borderRadius: 12,
              padding: isMobile ? 12 : 24,
      
              backgroundColor:'white'
            }}
          >
            <Outlet />
          </div>
        </Content>

        {/* Bottom Nav for mobile */}
        {/* {isMobile && (
          <div className="mc-bottom-nav" style={bottomNavStyle}>
            <NavLink to="/dashboard" className="mc-bottom-link">
              <HomeOutlined />
              <span>Home</span>
            </NavLink>

            <NavLink to="/avalilablecamps" className="mc-bottom-link">
              <AppstoreOutlined />
              <span>Camps</span>
            </NavLink>

            <NavLink to={isAdmin ? "/dashboard/addcamps" : "/dashboard/registeredcamps"} className="mc-bottom-link action">
              <PlusOutlined />
              <span>{isAdmin ? "Add" : "Registered"}</span>
            </NavLink>

            <NavLink to="/dashboard/paymenthistory" className="mc-bottom-link">
              <DollarCircleOutlined />
              <span>Payments</span>
            </NavLink>

            <NavLink to="/dashboard/participantprofile" className="mc-bottom-link">
              <UserOutlined />
              <span>Profile</span>
            </NavLink>
          </div>
        )} */}
      </Layout>
    </Layout>
  );
};

const bottomNavStyle = {
  position: "fixed",
  bottom: 12,
  left: "50%",
  transform: "translateX(-50%)",
  width: "calc(100% - 32px)",
  maxWidth: 740,
  background: "#ffffffaa",
  backdropFilter: "blur(6px)",
  borderRadius: 14,
  padding: "8px 12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  zIndex: 999,
};

export default Dashboard;
