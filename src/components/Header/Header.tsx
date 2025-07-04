import { useState, useEffect, useContext, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { CircleHelp, Earth, BriefcaseBusiness, UserRound } from "lucide-react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLocation } from "react-router-dom";
import { Dropdown, Space, Spin } from "antd";
import { HelpCircle } from "lucide-react";
import LoginPopup from "../Login/LoginPopup";
import { AuthContext } from "../../Context/AuthContext";
type MenuItem = {
  key: string;
  label: string | React.ReactNode;
  children?: MenuItem[];
};

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
  const location = useLocation();
  const [hnApartments, setHnApartments] = useState([]); // Dữ liệu căn hộ Hà Nội
  const [hlApartments, setHlApartments] = useState([]);
  const [loading, setLoading] = useState({ hn: false, hl: false });
  const [openMenu1, setOpenMenu1] = useState<string | null>(null); // cấp 1
  const [openMenu2, setOpenMenu2] = useState<string | null>(null); // cấp 2
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

  const fetchApartments = async (area: "HA_NOI" | "HA_LONG") => {
    try {
      setLoading((prev) => ({
        ...prev,
        [area === "HA_NOI" ? "hn" : "hl"]: true,
      }));
      const res = await fetch(
        `https://anstay.com.vn/api/apartments/by-area?area=${area}`
      );
      if (!res.ok) throw new Error("Failed to fetch apartments");
      const data = await res.json();

      const mappedItems: MenuProps["items"] = data.map((apt: any) => ({
        key: `${area.toLowerCase()}-apt-${apt.id}`,
        label: (
          <Link
            to={`/apartment/${area.toLowerCase()}/${apt.name}`}
            state={{ apartment: apt.name }}
          >
            {apt.name}
          </Link>
        ),
      }));

      if (area === "HA_NOI") setHnApartments(mappedItems);
      else setHlApartments(mappedItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({
        ...prev,
        [area === "HA_NOI" ? "hn" : "hl"]: false,
      }));
    }
  };

  useEffect(() => {
    fetchApartments("HA_NOI");
    fetchApartments("HA_LONG");
  }, []);
  const items: MenuItem[] = [
    {
      key: "1",
      label: "Ha Noi",
      children: [
        {
          key: "1-1",
          label: (
            <Link to="/tour-ha-noi" state={{ location: "HA_NOI" }}>
              Tour Hà Nội
            </Link>
          ),
        },
        {
          key: "hn-apartment",
          label: "Căn hộ Hà Nội",
          children: loading.hn
            ? [{ key: "hn-loading", label: <Spin size="small" /> }]
            : hnApartments,
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
            <Link to="/tour-ha-long" state={{ location: "HA_LONG" }}>
              Tour Hạ Long
            </Link>
          ),
        },
        {
          key: "hl-apartment",
          label: "Căn hộ Hạ Long",
          children: loading.hl
            ? [{ key: "hl-loading", label: <Spin size="small" /> }]
            : hlApartments,
        },
      ],
    },
  ];

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
              className="header1-logo"
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
              <Link to="/help">Trợ giúp</Link>
            </div>
            <div className="select-nav">
              <Earth size={18} className="header-icon" />
              <Link to="#">Ngôn ngữ</Link>
            </div>
            <div className="select-nav">
              <HelpCircle size={19} color="#555" />
              <Link to="/support">Hướng dẫn</Link>
            </div>
            <div
              className={`user-menu ${userMenuActive ? "active" : ""}`}
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
                      <Link to="/bloguser">
                        <button className="btn-login information-btn">
                          Viết Blog
                        </button>
                      </Link>
                      <Link to="#">
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
                <button
                  className="btn-login"
                  onClick={() => {
                    handleSignInClick(), setNavActive(false);
                  }}
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
          <div className="header-nav">
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
                    <div className="dropdown-wrapper">
                      <ul className="dropdown-menu">
                        {items.map((item) => (
                          <li key={item.key} className="dropdown-item">
                            <button
                              className="dropdown-submenu-btn"
                              onClick={() =>
                                setOpenMenu1(
                                  openMenu1 === item.key ? null : item.key
                                )
                              }
                            >
                              {item.label} <DownOutlined />
                            </button>

                            {openMenu1 === item.key && (
                              <ul className="dropdown-submenu">
                                {item.children?.map((subItem) => (
                                  <li
                                    key={subItem.key}
                                    className="dropdown-submenu-item"
                                  >
                                    {subItem.children ? (
                                      <>
                                        <button
                                          className="dropdown-submenu-btn"
                                          onClick={() =>
                                            setOpenMenu2(
                                              openMenu2 === subItem.key
                                                ? null
                                                : subItem.key
                                            )
                                          }
                                        >
                                          {subItem.label} <DownOutlined />
                                        </button>

                                        {openMenu2 === subItem.key && (
                                          <ul className="dropdown-submenu">
                                            {subItem.children.map((child) => (
                                              <li
                                                key={child.key}
                                                className="dropdown-submenu-item"
                                                onClick={() =>
                                                  setNavActive(false)
                                                }
                                              >
                                                {child.label}
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </>
                                    ) : (
                                      <div onClick={() => setNavActive(false)}>
                                        {subItem.label}
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
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
            {/* Links có hiệu ứng active */}
            <Link
              to="/coperate"
              onClick={() => setNavActive(false)}
              className={location.pathname === "/coperate" ? "active" : ""}
            >
              Hợp tác
            </Link>
            <Link
              to="/about-us"
              onClick={() => setNavActive(false)}
              className={location.pathname === "/about-us" ? "active" : ""}
            >
              Thông tin về chúng tôi
            </Link>
            <Link
              to="/blog"
              onClick={() => setNavActive(false)}
              className={location.pathname === "/blog" ? "active" : ""}
            >
              Blog
            </Link>
            <Link
              to="/explore&experience"
              onClick={() => setNavActive(false)}
              className={
                location.pathname === "/explore&experience" ? "active" : ""
              }
            >
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
