import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormQr.css";

const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbwSgiBKS3f1Kk9TAN8_1XOS7NGN5OpL8VG1mtzk9cI7gUGVqAVLAXtaOzuiDdBYcNID/exec";

const FormQr = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {
      fullName: formData.fullName.trim() ? "" : "Vui lòng nhập họ và tên",
      email: formData.email.trim() ? "" : "Vui lòng nhập email",
    };
    setErrors(newErrors);

    if (newErrors.fullName || newErrors.email) return;

    // Prepare data payload
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    };

    try {
      // Send data via no-cors
      await fetch(SHEET_API_URL.trim(), {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      alert("Đã gửi thông tin thành công!");
      navigate("/hiden-page");
    } catch (error) {
      console.error("Lỗi khi gửi:", error);
      alert("Không thể lưu dữ liệu. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="form-page-background">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h1 className="form-titleqr">Thông tin khách hàng</h1>
            <div className="form-divider" />
            <div className="form-description">
              <p className="light-text">Mô tả biểu mẫu</p>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="fullName">
              Họ và tên : <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Vui lòng nhập họ và tên"
              required
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email : <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Vui lòng nhập email"
              required
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="phoneNumber">Số điện thoại :</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Vui lòng nhập số điện thoại"
            />
          </div>

          <button type="submit" className="submit-button">
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormQr;
