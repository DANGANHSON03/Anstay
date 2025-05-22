import { useState, useEffect, useContext, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { CircleHelp, Earth, UserRound } from "lucide-react";
import { DownOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { HelpCircle } from "lucide-react";
import LoginPopup from "../Login/LoginPopup";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

type MenuItem = {
  key: string;
  label: string | React.ReactNode;
  children?: MenuItem[];
};

const Header: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loggedInFullname, setLoggedInFullname] = useState<string | null>(null);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const auth = useContext(AuthContext);
  const navRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showApartmentPopup, setShowApartmentPopup] = useState(false);
  const [apartmentList, setApartmentList] = useState<any[]>([]);
  const [loadingApartments, setLoadingApartments] = useState(false);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const apartmentRef = useRef<HTMLDivElement>(null);
  const [locationToFetch, setLocationToFetch] = useState(null);
  const [popupTimer, setPopupTimer] = useState(null);
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  useEffect(() => {
    if (showApartmentPopup && locationToFetch) {
      setLoadingApartments(true);
      fetch(
        `http://localhost:8085/api/apartments/by-area?area=${locationToFetch}&limit=6`
      )
        .then((res) => res.json())
        .then((data) => {
          setApartmentList(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoadingApartments(false);
        });
    }
  }, [showApartmentPopup, locationToFetch]);

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
    setUserMenuActive(!userMenuActive);
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
      setUserMenuActive(false);
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
          key: "1-2",
          label: (
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => {
                if (popupTimer) {
                  clearTimeout(popupTimer); //  huỷ delay ẩn nếu đang đếm
                  setPopupTimer(null);
                }
                setShowApartmentPopup(true);
                setActiveSubItem("1-2");
                setLocationToFetch("HA_NOI");
              }}
              onMouseLeave={() => {
                const timer = setTimeout(() => {
                  setShowApartmentPopup(false);
                  setActiveSubItem(null);
                  setLocationToFetch(null);
                }, 2000);
                setPopupTimer(timer);
              }}
            >
              <Link
                to="/apartments/ha-noi"
                onClick={() => {
                  setShowApartmentPopup(false);
                  setActiveSubItem(null);
                  setLocationToFetch(null);
                }}
              >
                Căn hộ Hà Nội
              </Link>
              {activeSubItem === "1-2" && showApartmentPopup && (
                <div
                  className="apartment-popup"
                  style={{
                    position: "absolute",
                    left: "calc(100% + 6px)",
                    top: 0,
                    zIndex: 1000,
                    minWidth: 220,
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    padding: 12,
                  }}
                  onMouseEnter={() => {
                    if (popupTimer) {
                      clearTimeout(popupTimer);
                      setPopupTimer(null);
                    }
                    setShowApartmentPopup(true);
                    setActiveSubItem("1-2");
                  }}
                  onMouseLeave={() => {
                    const timer = setTimeout(() => {
                      setShowApartmentPopup(false);
                      setActiveSubItem(null);
                      setLocationToFetch(null);
                    }, 2000);
                    setPopupTimer(timer);
                  }}
                >
                  {loadingApartments ? (
                    <p>Đang tải...</p>
                  ) : apartmentList.length === 0 ? (
                    <p>Không có dữ liệu.</p>
                  ) : (
                    apartmentList.map((apt, idx) => (
                      <Link
                        to={{
                          pathname: "/search-results",
                          search: `?location=${encodeURIComponent(
                            apt.name
                          )}&area=${locationToFetch}&checkin=2025-05-17&checkout=2025-05-18&room=1&adults=2&children=0`,
                        }}
                        state={{ hideSearchBar: true }}
                        className="apartment-item"
                        onClick={() => {
                          setShowApartmentPopup(false);
                          setActiveSubItem(null);
                        }}
                        key={apt.id || idx}
                      >
                        {apt.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
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
            <Link to="/tour-ha-long" state={{ location: "HA_LONG" }}>
              Tour Hạ Long
            </Link>
          ),
        },
        {
          key: "2-2",
          label: (
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => {
                if (popupTimer) {
                  clearTimeout(popupTimer);
                  setPopupTimer(null);
                }
                setShowApartmentPopup(true);
                setActiveSubItem("2-2");
                setLocationToFetch("HA_LONG");
              }}
              onMouseLeave={() => {
                const timer = setTimeout(() => {
                  setShowApartmentPopup(false);
                  setActiveSubItem(null);
                  setLocationToFetch(null);
                }, 2000);
                setPopupTimer(timer);
              }}
            >
              <Link
                to="/apartments/ha-long"
                onClick={() => {
                  setShowApartmentPopup(false);
                  setActiveSubItem(null);
                  setLocationToFetch(null);
                }}
              >
                Căn hộ Hạ Long
              </Link>

              {activeSubItem === "2-2" && showApartmentPopup && (
                <div
                  className="apartment-popup"
                  style={{
                    position: "absolute",
                    left: "calc(100% + 6px)",
                    top: 0,
                    zIndex: 1000,
                    minWidth: 220,
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    padding: 12,
                  }}
                  onMouseEnter={() => {
                    if (popupTimer) {
                      clearTimeout(popupTimer);
                      setPopupTimer(null);
                    }
                    setShowApartmentPopup(true);
                    setActiveSubItem("2-2");
                    setLocationToFetch("ha-long");
                  }}
                  onMouseLeave={() => {
                    const timer = setTimeout(() => {
                      setShowApartmentPopup(false);
                      setActiveSubItem(null);
                      setLocationToFetch(null);
                    }, 2000);
                    setPopupTimer(timer);
                  }}
                >
                  {loadingApartments ? (
                    <p>Đang tải...</p>
                  ) : apartmentList.length === 0 ? (
                    <p>Không có dữ liệu.</p>
                  ) : (
                    apartmentList.map((apt, idx) => (
                      <Link
                        to={{
                          pathname: "/search-results",
                          search: `?location=${encodeURIComponent(
                            apt.name
                          )}&area=${locationToFetch}&checkin=2025-05-17&checkout=2025-05-18&room=1&adults=2&children=0`,
                        }}
                        state={{ hideSearchBar: true }}
                        className="apartment-item"
                        onClick={() => {
                          setShowApartmentPopup(false);
                          setActiveSubItem(null);
                        }}
                        key={apt.id || idx}
                      >
                        {apt.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          ),
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
                <div
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <Dropdown
                    menu={{ items }}
                    trigger={["hover"]}
                    placement="bottomLeft"
                    open={dropdownOpen}
                    onOpenChange={setDropdownOpen}
                  >
                    <a className="dropdown-link">
                      <Space>
                        Tour và căn hộ
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
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
function setLoadingApartments(arg0: boolean) {
  throw new Error("Function not implemented.");
}
function setLocationToFetch(arg0: string) {
  throw new Error("Function not implemented.");
}
