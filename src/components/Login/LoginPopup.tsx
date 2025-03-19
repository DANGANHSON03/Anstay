import React, { useState } from "react";
import "./LoginPopup.css"; // Import file CSS

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Đăng nhập thành công!"); // Xử lý đăng nhập tại đây
  };

  const handleRegisterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Đăng ký thành công!"); // Xử lý đăng ký tại đây
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="popup-header">
          <img
            src="https://i.ibb.co/TqBMd49m/logo.jpg"
            alt="logo"
            className="header-logo"/>
          <h2>{showRegister ? "Đăng ký" : "Đăng nhập"}</h2>
        </div>

        {!showRegister ? (
          <form className="popup-form" onSubmit={handleSubmit}>
            <label>Email *</label>
            <input type="email" placeholder="Nhập email" required />

            <label>Mật khẩu *</label>
            <input type="password" placeholder="Nhập mật khẩu" required />

            <div className="options">
              <div className="option-child">
                <input type="checkbox" />
                <label> Ghi nhớ tài khoản</label>
              </div>
              <div className="option-child">
                <label>Quên mật khẩu?</label>
                <a href="#">Click vô đây</a>
              </div>
            </div>

            <button type="submit" className="login-btn">Đăng nhập</button>
            <div className="register-text">
              Bạn chưa có tài khoản? <a href="#" onClick={() => setShowRegister(true)}>Đăng ký</a>
            </div>
          </form>
        ) : (
          <form className="popup-form" onSubmit={handleRegisterSubmit}>
            <label>Tên người dùng *</label>
            <input type="text" placeholder="Nhập tên người dùng" required />

            <label>Email *</label>
            <input type="email" placeholder="Nhập email" required />

            <label>Mật khẩu *</label>
            <input type="password" placeholder="Nhập mật khẩu" required />

            <label>Xác nhận mật khẩu *</label>
            <input type="password" placeholder="Xác nhận mật khẩu" required />

            <label>Ngày tháng năm sinh *</label>
            <input type="date" required />

            <label>Địa chỉ *</label>
            <input type="text" placeholder="Nhập địa chỉ" required />

            <button type="submit" className="login-btn">Đăng ký</button>
            <div className="register-text">
              Bạn đã có tài khoản? <a href="#" onClick={() => setShowRegister(false)}>Đăng nhập</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;