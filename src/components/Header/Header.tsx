import { useState, useEffect, useContext, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { CircleHelp, Earth, BriefcaseBusiness, UserRound } from "lucide-react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import LoginPopup from "../Login/LoginPopup";
import { AuthContext } from "../../Context/AuthContext";

type MenuItem = {
  key: string;
  label: string | React.ReactNode;
  children?: MenuItem[];
};

const items: MenuItem[] = [
  {
    key: "1",
    label: "Ha Noi",
    children: [
      {
        key: "1-1",
        label: (
          <Link to="/tour" state={{ location: "HA_NOI" }}>
            Tour Hà Nội
          </Link>
        ),
      },
      {
        key: "1-2",
        label: (
          <Link to="/apartment" state={{ location: "HA_NOI" }}>
            Căn hộ Hà Nội
          </Link>
        ),
      },
    ],
  },
  {
    key: "2",
    label: "Ha Long",
    children: [
      {
        key: "2-1",
        label: (
          <Link to="/tour" state={{ location: "HA_LONG" }}>
            Tour Hạ Long
          </Link>
        ),
      },
      {
        key: "2-2",
        label: (
          <Link to="/apartment" state={{ location: "HA_LONG" }}>
            Căn hộ Hạ Long
          </Link>
        ),
      },
    ],
  },
];

const Header: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loggedInFullname, setLoggedInFullname] = useState<string | null>(null);
  const [userMenuActive, setUserMenuActive] = useState(false); // State for user-menu dropdown
  const auth = useContext(AuthContext);
  const navRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null); // Ref for user-menu dropdown
  const [userName, setUserName] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  if (!auth) return null;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      setLoggedInFullname(user.fullname);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.fullName);
    }
  }, []);

  useEffect(() => {
    // Check for user data when component mounts and when auth.user changes
    const checkUserLogin = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setLoggedInUser(userData);
        setLoggedInFullname(userData.fullName);
      } else {
        setLoggedInUser(null);
        setLoggedInFullname(null);
      }
    };

    checkUserLogin();
    // Add event listener for storage changes
    window.addEventListener("storage", checkUserLogin);

    return () => {
      window.removeEventListener("storage", checkUserLogin);
    };
  }, [auth.user]);

  const handleLogout = () => {
    auth.logout();
    setLoggedInUser(null);
    setLoggedInFullname(null);
    setUserMenuActive(false);
  };

  const handleSignInClick = () => {
    setShowPopup(true);
  };

  const handleLoginSuccess = (fullname: string) => {
    setLoggedInFullname(fullname);
    setShowPopup(false);
  };

  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const toggleUserMenu = () => {
    setUserMenuActive(!userMenuActive); // Toggle dropdown on click
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      navRef.current &&
      !navRef.current.contains(event.target as Node) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target as Node) &&
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target as Node)
    ) {
      setNavActive(false);
      setUserMenuActive(false); // Close user-menu dropdown when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="header">
      {navActive && (
        <div
          className="header-nav-overlay active"
          onClick={() => setNavActive(false)}
        ></div>
      )}
      <div className="header-container">
        <div className="header-logo-container">
          <Link to="/">
            <img
              src="https://i.ibb.co/35SyTcnX/Anstay.png"
              alt="logo"
              className="header-logo"
            />
          </Link>
        </div>
        <div className="hamburger" onClick={toggleNav} ref={hamburgerRef}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div
          className={`header-nav-container ${navActive ? "active" : ""}`}
          ref={navRef}
        >
          <div className="header-select">
            <div className="select-nav">
              <CircleHelp size={18} className="header-icon" />
              <Link to="help">Trợ giúp</Link>
            </div>
            <div className="select-nav">
              <Earth size={18} className="header-icon" />
              <Link to="#">Ngôn ngữ</Link>
            </div>
            <div className="select-nav">
              <BriefcaseBusiness size={18} className="header-icon" />
              <Link to="#">Chuyến đi của tôi</Link>
            </div>
            <div
              className={`user-menu ${userMenuActive ? "active" : ""}`} // Add active class when dropdown is open
              ref={userMenuRef}
            >
              {loggedInFullname ? (
                <div>
                  <div className="user-info" onClick={toggleUserMenu}>
                    <UserRound size={18} className="header-icon" />
                    <span className="user-fullname">{loggedInFullname}</span>
                    <DownOutlined />
                  </div>
                  {userMenuActive && (
                    <div className="dropdown">
                      <Link to="/dashbroad">
                        <button className="btn-login information-btn">
                          Thông tin cá nhân
                        </button>
                      </Link>
                      <Link to="#">
                        {" "}
                        <button
                          onClick={handleLogout}
                          className="btn-login logout-btn"
                        >
                          Đăng xuất
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <button className="btn-login" onClick={handleSignInClick}>
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
          <div className="header-nav">
            {/* <Dropdown
              menu={{ items }}
              overlayClassName="ant-dropdown" // Add a custom class for styling
              trigger={["hover"]} // Change trigger to hover
              placement="bottomLeft" // Ensure dropdown is placed below
            >
              <a>
                <Space>
                  Tour & Căn hộ
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown> */}
            <div
              className={
                isMobile ? "dropdown-container mobile" : "dropdown-container"
              }
            >
              {isMobile ? (
                <div className="dropdown-mobile">
                  <button
                    onClick={() => setOpen(!open)}
                    className="dropdown-btn"
                  >
                    Tour và căn hộ <DownOutlined />
                  </button>
                  {open && (
                    <ul className="dropdown-menu">
                      {items.map((item: MenuItem) => (
                        <li key={item.key} className="dropdown-item">
                          <button
                            className="dropdown-submenu-btn"
                            onClick={() =>
                              setOpenSubMenu(
                                openSubMenu === item.key ? null : item.key
                              )
                            }
                          >
                            {item.label} <DownOutlined />
                          </button>
                          {openSubMenu === item.key && (
                            <ul className="dropdown-submenu">
                              {item.children?.map((subItem: MenuItem) => (
                                <li
                                  key={subItem.key}
                                  className="dropdown-submenu-item"
                                  onClick={() => setNavActive(false)}
                                >
                                  {subItem.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Dropdown
                  menu={{ items }}
                  trigger={["hover"]}
                  placement="bottomLeft"
                >
                  <a className="dropdown-link">
                    <Space>
                      Tour và căn hộ
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              )}
            </div>
            <Link to="/coperate" onClick={() => setNavActive(false)}>
              Hợp tác
            </Link>
            <Link to="/about-us" onClick={() => setNavActive(false)}>
              Thông tin về chúng tôi
            </Link>
            <Link to="/food" onClick={() => setNavActive(false)}>
              Ẩm thực
            </Link>
            <Link to="/explore&experience" onClick={() => setNavActive(false)}>
              Khám phá & Trải nghiệm
            </Link>
          </div>
        </div>
      </div>
      {showPopup && (
        <LoginPopup
          onClose={() => setShowPopup(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </header>
  );
};

export default Header;
