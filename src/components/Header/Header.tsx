import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { CircleHelp, Earth, BriefcaseBusiness, UserRound } from "lucide-react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";


const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Ha Noi",
    children: [
      {
        key: "1-1",
        label: <Link to="/tour">Tour Ha Noi</Link>,
      },
      {
        key: "1-2",
        label: <Link to="/apartment">Apartment Ha Noi</Link>,
      },
    ],
  },
  {
    key: "2",
    label: "Ha Long",
    children: [
      {
        key: "2-1",
        label: <Link to="/tour">Tour Ha Long</Link>,
      },
      {
        key: "2-2",
        label: <Link to="/apartment">Apartment Ha Long</Link>,
      },
    ],
  },
];

const Header: React.FC = () => {
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
              <Link to="help">Help</Link>
            </div>
            <div className="select-nav">
              <Earth size={18} className="header-icon" />
              <Link to="#">Language</Link>
            </div>
            <div className="select-nav">
              <BriefcaseBusiness size={18} className="header-icon" />
              <Link to="#">My Trips</Link>
            </div>
            <div className="select-nav">
              <UserRound size={18} className="header-icon" />
              <Link to="#">Sign In</Link>
            </div>
          </div>
          <div className="header-nav">
            <Link to="#"></Link>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Tour & Apartment
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Link to="#">Cooperate</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="#">Instruction Book</Link>
            <Link to="#">Explore & Experience</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
