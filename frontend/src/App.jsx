import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import logo from "./assets/logo.svg";
import {
  AimOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  OrderedListOutlined,
  TeamOutlined,
  FlagOutlined,
  PlusOutlined,
  HomeOutlined,
  SearchOutlined,
  BookOutlined,
  HeartOutlined,
  HeartFilled,
  BookFilled,
  HomeFilled,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  ConfigProvider,
  Layout,
  Menu,
  Modal,
  notification,
  Row,
  Space,
  Switch,
  theme,
  Tooltip,
  Typography,
} from "antd";
import Timer from "./components/player/timer/Timer.jsx";
import Player from "./components/player/Player.jsx";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Bibliotheque from "./pages/bibliotheque/Bibliotheque.jsx";
import Likes from "./pages/likes/Likes.jsx";
import Rechercher from "./pages/rechercher/Rechercher.jsx";
import Accueil from "./pages/accueil/Accueil.jsx";
import { utils } from "./utils/_helper.jsx";
import { get } from "./utils/CustomRequests.jsx";
import { API } from "./utils/API.jsx";
import { publish } from "./utils/events.jsx";

const { Header, Footer, Sider, Content } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;
const { Text } = Typography;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("0");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [openUserModal, setOpenUserModal] = useState(false);
  utils.navigate = useNavigate();
  utils.location = useLocation();
  const location = useLocation();
  const playerRef = useRef();
  useEffect(() => {
    utils.player = playerRef;
  }, [playerRef]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    for (const item of items) {
      if (utils.location.pathname === item.url) {
        setSelectedKey(item.key);
      }
    }
    get(API.getUser, {
      success: (data) => {
        setUser(data);
      },
    });
  }, []);

  useEffect(() => {
    for (const item of items) {
      if (utils.location.pathname === item.url) {
        setSelectedKey(item.key);
      }
    }
  }, [location]);

  const checkToken = (element) => {
    if (!localStorage.getItem("token")) {
      return <Login />;
    }
    return element;
  };

  const items = [
    {
      key: "0",
      url: "/",
      icon: selectedKey === "0" ? <HomeFilled /> : <HomeOutlined />,
      label: "Accueil",
    },
    {
      key: "1",
      url: "/rechercher",
      icon: <SearchOutlined />,
      label: "Rechercher",
    },
    {
      key: "2",
      url: "/bibliotheque",
      icon: selectedKey === "2" ? <BookFilled /> : <BookOutlined />,
      label: "Bibliothèque",
    },
    {
      key: "3",
      url: "/likes",
      icon: selectedKey === "3" ? <HeartFilled /> : <HeartOutlined />,
      label: "Titres likés",
    },
  ];
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Modal
        onCancel={() => {
          setOpenUserModal(false);
        }}
        centered={true}
        open={openUserModal}
        footer={[
          <Button
            onClick={() => {
              setOpenUserModal(false);
            }}
          >
            Fermer
          </Button>,
        ]}
      >
        <Space
          size={20}
          style={{
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
          direction={"vertical"}
        >
          <Typography.Title strong={true} level={4}>
            Bienvenue à vous {user?.username}
          </Typography.Title>
          <Typography.Text>{user?.email}</Typography.Text>
          <Tooltip title={"Se déconnecter"}>
            <Button
              danger={true}
              type={"primary"}
              size={"large"}
              onClick={() => {
                localStorage.removeItem("access_token");
                utils.navigate("/login");
              }}
              icon={<DisconnectOutlined></DisconnectOutlined>}
              shape={"circle"}
            ></Button>
          </Tooltip>
        </Space>
      </Modal>
      <Layout style={{ height: "100vh" }}>
        <Layout style={{ height: "100%" }}>
          <Sider
            theme={isDarkMode ? "dark" : "light"}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "1rem",
              }}
            >
              <Content>
                <div
                  className="logo"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "40px 0",
                  }}
                >
                  <img width={"80%"} alt={"logo"} src={logo} />
                </div>
                <Menu
                  theme={isDarkMode ? "dark" : "light"}
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  selectedKeys={[selectedKey]}
                  onSelect={(e) => (
                    setSelectedKey(e.key), utils.navigate(e.item.props.url)
                  )}
                  items={items}
                />
              </Content>
              <Space
                style={{
                  margin: "auto 0 0 0",
                }}
              >
                <Switch
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                  title={isDarkMode ? "Mode clair" : "Mode sombre"}
                />

                <Text strong>Mode sombre</Text>
              </Space>
            </div>
          </Sider>
          <Layout className="site-layout">
            <Header
              style={{
                background: isDarkMode ? "" : "#fff",
                padding: "0 30px",
              }}
              theme={isDarkMode ? "dark" : "light"}
            >
              <Row>
                <Col flex={1}>
                  <Space>
                    <Button
                      onClick={() => {
                        utils.navigate(-1);
                      }}
                      shape={"circle"}
                      icon={<ArrowLeftOutlined></ArrowLeftOutlined>}
                    ></Button>{" "}
                    <Button
                      shape={"circle"}
                      onClick={() => {
                        utils.navigate(1);
                      }}
                      icon={<ArrowRightOutlined></ArrowRightOutlined>}
                    ></Button>
                  </Space>
                </Col>
                <Col>
                  <Button
                    shape={"circle"}
                    onClick={() => {
                      setOpenUserModal(true);
                    }}
                    icon={<UserOutlined></UserOutlined>}
                  ></Button>
                </Col>
              </Row>
            </Header>
            <Content>
              <Routes>
                <Route path="/bibliotheque" element={<Bibliotheque />} />
                <Route path="/likes" element={<Likes />} />
                <Route path="/rechercher" element={<Rechercher />} />
                <Route path="/" element={<Accueil />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
        <Footer
          style={{
            padding: "10px 20px",
            borderTop: "var(--border)",
          }}
        >
          <Player ref={playerRef}></Player>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
