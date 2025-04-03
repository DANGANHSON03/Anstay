import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-main">
        <div className="footer-left">
          <div className="row">
            <div className="row-title">
              <h3>TÀI KHOẢN</h3>
            </div>
            <div className="row-link">
              <div className="list-item">
                <Link to="#">Đăng nhập</Link>
              </div>
              <div className="list-item">
                <Link to="#">Đăng nhập</Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row-title">
              <h3>LIÊN HỆ</h3>
            </div>
            <div className="row-link">
              <div className="list-item">
                <Link to="#">Về Chúng Tôi</Link>
              </div>
              <div className="list-item">
                <Link to="#">Sách Hướng Dẫn</Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row-title">
              <h3>CHÍNH SÁCH</h3>
            </div>
            <div className="row-link">
              <div className="list-item">
                <Link to="#">Chính Sách Bảo Mật</Link>
              </div>
              <div className="list-item">
                <Link to="#">Chương Trình Hợp Tác</Link>
              </div>
              <div className="list-item">
                <Link to="#">Chăm Sóc Khách Hàng</Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row-title">
              <h3>THEO DÕI CHÚNG TÔI</h3>
            </div>
            <div className="row-link">
              <div className="list-item">
                <a href="https://www.facebook.com/AnstayVN">
                  <img
                    src="https://i.ibb.co/dst8XydC/Facebook-Logo-2019.png"
                    alt="face"
                    className="icon-fl"
                  />
                  Facebook
                </a>
              </div>
              <div className="list-item">
                <a href="#">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
                    alt="face"
                    className="icon-fl"
                  />
                  Zalo
                </a>
              </div>
              <div className="list-item">
                <a href="#">
                  <img
                    src="https://i.ibb.co/zhkk3H5Y/1.jpg"
                    alt="tele"
                    className="icon-fl"
                  />
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-right-title">
            <h3>HÌNH THỨC THANH TOÁN</h3>
          </div>
          <div className="footer-right-img ftr-2">
            <img
              src="https://i.ibb.co/1JQm30kz/logo-tp-bank.jpg"
              alt="tpbank"
              className="footer-right-img1"
            />
            <img
              src="https://i.ibb.co/7tPFpkTj/huong-dan-dang-ky-tai-khoan-paypal-1024x512.jpg"
              alt="tpbank"
              className="footer-right-img1"
            />
            <img
              src="https://i.ibb.co/PGR3tdx9/1200x630wa.png"
              alt="tpbank"
              className="footer-right-img1"
            />
            <img
              src="https://i.ibb.co/Hfnd0MDc/tether-usdt-logo-png-seeklogo-323175.png"
              alt="tpbank"
              className="footer-right-img1"
            />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>CÔNG TY CỔ PHẦN ANSTAY VIỆT NAM</div>
        <div>
          Copyright 2025 ©
          <span style={{ fontWeight: 600 }}>Blue Kites Invest</span> All rights
          reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
