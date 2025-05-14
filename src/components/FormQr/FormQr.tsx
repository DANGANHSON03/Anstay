import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormQr.css";
import Notification from "../Notification/Notification";

const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbzLY4ndgNSjQXwoq7xTdwZCgjHr1J2NSVCATORS8dOXSrnckk48BisZ3eHHxNGvt2hT/exec";

const FormQr = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    apartment: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Reset cleaning time if user selects "No" for cleaning
      ...(name === "wantsCleaning" && value === "no"
        ? { cleaningTimeRange: "", cleaningNote: "" }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: formData.fullName.trim()
        ? ""
        : "Vui lòng nhập họ và tên / Please enter your full name",
      email: formData.email.trim()
        ? ""
        : "Vui lòng nhập email / Please enter your email",
    };
    setErrors(newErrors);

    if (newErrors.fullName || newErrors.email) return;

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      apartment: formData.apartment,
    };

    try {
      navigate("/hiden-page", { state: { apartment: formData.apartment } });

      // Send data after navigation starts
      fetch(SHEET_API_URL.trim(), {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).catch((error) => {
        console.error("Lỗi khi gửi:", error);
      });
    } catch (error) {
      console.error("Lỗi khi gửi:", error);
      setNotification({
        show: true,
        message:
          "Có lỗi xảy ra khi gửi thông tin. Xin vui lòng thử lại sau hoặc liên hệ với chúng tôi qua số điện thoại. / An error occurred. Please try again later or contact us by phone.",
        type: "error",
      });
    }
  };

  return (
    <div className="form-page-background">
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h1 className="form-titleqr">Thông tin khách hàng</h1>
            <h3>Customer Information</h3>
            <div className="form-divider" />
            <div className="form-description">
              <p className="light-text">
                Vui lòng điền thông tin để chúng tôi hỗ trợ bạn tour hoặc căn hộ
                nhanh chóng và chính xác.
              </p>
              <p className="light-text">
                Please fill in the information so we can assist you with tours
                or apartments quickly and accurately.
              </p>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="fullName">
              Họ và tên / Full Name: <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email / Email Address: <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="phoneNumber">
              Số điện thoại / Phone Number/We Chat:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="apartment">
              Căn hộ đang lưu trú / Apartment currently staying:{" "}
              <span className="required">*</span>
            </label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Gửi / Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormQr;
