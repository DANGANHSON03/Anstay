import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormQr.css";
import Notification from "../Notification/Notification";

const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbzdtykmmhIN2G04brK8XiaHJMDEBCZee4i-g-2ClnS-Y9Ps3-_uLKMnBAkTOKt-TlYX/exec";

const FormQr = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    wantsCleaning: "",
    cleaningTimeRange: "",
    cleaningNote: "",
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
      wantsCleaning: formData.wantsCleaning,
      cleaningTimeRange: formData.cleaningTimeRange,
      cleaningNote: formData.cleaningNote,
    };

    console.log("Form data being sent:", payload);

    try {
      await fetch(SHEET_API_URL.trim(), {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setNotification({
        show: true,
        message:
          "Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.",
        type: "success",
      });
      setTimeout(() => navigate("/hiden-page"), 3000);
    } catch (error) {
      console.error("Lỗi khi gửi:", error);
      setNotification({
        show: true,
        message:
          "Có lỗi xảy ra khi gửi thông tin. Xin vui lòng thử lại sau hoặc liên hệ với chúng tôi qua số điện thoại.",
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
            <div className="form-divider" />
            <div className="form-description">
              <p className="light-text">
                Vui lòng điền thông tin để chúng tôi hỗ trợ bạn tour hoặc căn hộ
                nhanh chóng và chính xác.
              </p>
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

          {/* <div className="form-field">
            <label id="cleaning-label">Bạn có muốn dọn phòng không?</label>
            <div
              className="radio-group"
              role="radiogroup"
              aria-labelledby="cleaning-label"
            >
              <label className="radio-label">
                <input
                  type="radio"
                  name="wantsCleaning"
                  value="yes"
                  checked={formData.wantsCleaning === "yes"}
                  onChange={handleChange}
                  aria-label="Có"
                />
                <span>Có</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="wantsCleaning"
                  value="no"
                  checked={formData.wantsCleaning === "no"}
                  onChange={handleChange}
                  aria-label="Không"
                />
                <span>Không</span>
              </label>
            </div>
          </div> */}

          {formData.wantsCleaning === "yes" && (
            <>
              <div className="form-field">
                <label htmlFor="cleaningTimeRange">Thời gian dọn phòng :</label>
                <select
                  id="cleaningTimeRange"
                  name="cleaningTimeRange"
                  value={formData.cleaningTimeRange}
                  onChange={handleChange}
                >
                  <option value="">Chọn thời gian</option>
                  <option value="9:00-11:00">9:00 - 11:00 sáng</option>
                  <option value="14:00-16:00">14:00 - 16:00 chiều</option>
                  <option value="16:00-18:00">16:00 - 18:00 chiều</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="cleaningNote">Ghi chú dọn phòng :</label>
                <textarea
                  id="cleaningNote"
                  name="cleaningNote"
                  value={formData.cleaningNote}
                  onChange={handleChange}
                  placeholder="Nhập yêu cầu đặc biệt về dọn phòng (nếu có)"
                  rows={3}
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-button">
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormQr;
