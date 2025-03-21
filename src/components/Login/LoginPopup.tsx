import React, { useState,useContext } from "react";
import "./LoginPopup.css"; // Import file CSS
import {AuthContext} from "../../Context/AuthContext";
interface LoginPopupProps {
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}
interface User {
    email: string;
    password: string;
  }

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onLoginSuccess }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
 
  const handleSubmit = (event: React.FormEvent) => {
    const fakeUsers : User[]=[
        { email: "test@example.com", password: "123456" },
        { email: "a@gmail.com", password: "1" },
      ];
    event.preventDefault();
    const user = fakeUsers.find((u) => u.email === email && u.password === password);

    if (user && auth) {
      localStorage.setItem("user", JSON.stringify(user)); // Lưu vào Local Storage
      auth.login(user);  // Lưu user vào context
      onLoginSuccess(user.email); // Gọi function và truyền email
      alert("Đăng nhập thành công! ✅");
      onClose(); // Close the popup after successful login
    } else {
      alert("Sai email hoặc mật khẩu ❌");
    }
  };

  const handleRegisterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Đăng ký thành công!"); // Xử lý đăng ký tại đây
  };

  const handleForgotPasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Yêu cầu đặt lại mật khẩu đã được gửi!"); // Xử lý quên mật khẩu tại đây
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
          <h2>{showRegister ? "Đăng ký" : showForgotPassword ? "Quên mật khẩu" : "Đăng nhập"}</h2>
        </div>

        {!showRegister && !showForgotPassword ? (
          <form className="popup-form" onSubmit={handleSubmit}>
            <label>Email *</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" required />

            <label>Mật khẩu *</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" required />

            <div className="options">
              <div className="option-child">
                <input type="checkbox" />
                <label> Ghi nhớ tài khoản</label>
              </div>
              <div className="option-child">
                <label>Quên mật khẩu?</label>
                <a href="#" onClick={() => setShowForgotPassword(true)}>Click vô đây</a>
              </div>
            </div>

            <button type="submit" className="login-btn">Đăng nhập</button>
            <div className="register-text">
              Bạn chưa có tài khoản? <a href="#" onClick={() => setShowRegister(true)}>Đăng ký</a>
            </div>
          </form>
        ) : showRegister ? (
          <form className="popup-form" onSubmit={handleRegisterSubmit}>
            <label>Họ và tên *</label>
            <input type="text" placeholder="Họ và tên" required />

            <label>Email *</label>
            <input type="email" placeholder="Nhập email" required />

            <label>Mật khẩu *</label>
            <input type="password" placeholder="Nhập mật khẩu" required />

            <label>Xác nhận mật khẩu *</label>
            <input type="password" placeholder="Xác nhận mật khẩu" required />

            <label>Ngày tháng năm sinh *</label>
            <input type="date" required onKeyDown={(e) => e.preventDefault()} />

            <label>Địa chỉ *</label>
            <input type="text" placeholder="Nhập địa chỉ" required />

            <button type="submit" className="login-btn">Đăng ký</button>
            <div className="register-text">
              Bạn đã có tài khoản? <a href="#" onClick={() => setShowRegister(false)}>Đăng nhập</a>
            </div>
          </form>
        ) : (
          <form className="popup-form" onSubmit={handleForgotPasswordSubmit}>
            <label>Email *</label>
            <input type="email" placeholder="Nhập email" required />

            <button type="submit" className="login-btn">Gửi đi</button>
            <div className="register-text">
              <a href="#" onClick={() => setShowForgotPassword(false)}>Quay lại</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;