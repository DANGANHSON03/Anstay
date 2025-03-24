import React, { useState, useEffect, useRef,useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { CircleHelp, Earth, BriefcaseBusiness, UserRound } from "lucide-react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import LoginPopup from "../Login/LoginPopup";
import { AuthContext } from "../../Context/AuthContext";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Ha Noi",
    children: [
      {
        key: "1-1",
        label: <Link to="/tour">Tour Hà Nội</Link>,
      },
      {
        key: "1-2",
        label: <Link to="/apartment">Căn hộ Hà Nội</Link>,
      },
    ],
  },
  {
    key: "2",
    label: "Ha Long",
    children: [
      {
        key: "2-1",
        label: <Link to="/tour">Tour Hạ Long</Link>,
      },
      {
        key: "2-2",
        label: <Link to="/apartment">Căn hộ Hạ Long</Link>,
      },
    ],
  },
];

const Header: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loggedInFullname, setLoggedInFullname] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  if (!auth) return null;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      setLoggedInFullname(user.fullname);
    }
  }, []);

  const handleLogout = () => {
    auth.logout(); // Cập nhật lại state trong Context
    localStorage.removeItem("user"); // Xóa user khỏi Local Storage
    setLoggedInFullname(null);
  };

  const handleSignInClick = () => {
    setShowPopup(true);
  };

  const handleLoginSuccess = (fullname: string) => {
    setLoggedInFullname(fullname);
    setShowPopup(false);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
    
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo-container">
          <Link to="/">
            <img
              src="https://i.ibb.co/TqBMd49m/logo.jpg"
              alt="logo"
              className="header-logo"
            />
          </Link>
        </div>
        <div className="header-nav-container">
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
            <div className="select-nav">
             {auth.user ? 
             (
              <>
              <div className="user-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="user-info">
                  <UserRound size={18} className="header-icon" /> 
                  <span className="user-fullname">{loggedInFullname}</span>
                </div>
                <div className={`dropdown ${showDropdown ? "show" : ""}`}>
                  <button className="btn-login information-btn">Thông tin cá nhân</button>
                  <button onClick={handleLogout} className="btn-login logout-btn">Đăng xuất</button>
                </div>
              </div>
                
              </>
             ):
             (
              <>
              <UserRound size={18} className="header-icon" />
              <Link to="#" onClick={handleSignInClick}>Đăng nhập</Link>
              </>
             )}
             
            </div>
          </div>
          <div className="header-nav">
            <Link to="#"></Link>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Tour & Căn hộ
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Link to="/coperate">Hợp tác</Link>
            <Link to="/about-us">Thông tin về chúng tôi</Link>
            <Link to="#">Hướng dẫn</Link>
            <Link to="/explore&experience">Khám phá & Trải nghiệm</Link>
          </div>
        </div>
      </div>
      {showPopup && <LoginPopup   onClose={() => setShowPopup(false)} 
  onLoginSuccess={handleLoginSuccess}  />}
    </header>
  );
};

export default Header;
