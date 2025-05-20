import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingPage.css";

const BookingPage = () => {
  const [apartments, setApartments] = useState([]);
  const [bookingData, setBookingData] = useState(null);
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 1,
    babies: 0,
  });
  const [modifiedGuestType, setModifiedGuestType] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [holdResult, setHoldResult] = useState(null);
  const [roomHeld, setRoomHeld] = useState(false);

  // Đồng hồ đếm ngược 10 phút
  useEffect(() => {
    const endTime = localStorage.getItem("bookingEndTime");
    if (!endTime) {
      const newEndTime = Date.now() + 600000;
      localStorage.setItem("bookingEndTime", newEndTime.toString());
    }
    const timer = setInterval(() => {
      const endTime = Number(localStorage.getItem("bookingEndTime"));
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
        localStorage.removeItem("bookingEndTime");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lấy booking info từ URL, giữ nguyên định dạng ngày là "YYYY-MM-DD"
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const locationParam = params.get("location");
    const bookingDataTemp = {
      name: params.get("roomName"),
      address: locationParam,
      checkIn: params.get("startDate"), // GIỮ NGUYÊN, KHÔNG new Date
      checkOut: params.get("endDate"),
      guests: {
        adults: Number(params.get("maxAdults")) || 0,
        children: Number(params.get("maxChildren")) || 0,
        babies: 0,
      },
      price: Number(params.get("totalDiscounted")) || 0,
    };
    setBookingData(bookingDataTemp);
    setGuestCounts({
      adults: Number(params.get("maxAdults")) || 0,
      children: Number(params.get("maxChildren")) || 0,
      babies: 0,
    });
    // Lấy danh sách apartment
    if (locationParam) {
      fetch(`http://localhost:8085/api/apartments/search?name=${locationParam}`)
        .then((response) => response.json())
        .then((data) => setApartments(data))
        .catch((error) => {
          console.error("Error fetching apartments:", error);
        });
    }
  }, []);

  // Gọi API giữ phòng tự động khi có đủ thông tin
  useEffect(() => {
    if (bookingData && apartments.length > 0 && !roomHeld) {
      const selectedApartment = apartments[0];
      let selectedRoomId = selectedApartment?.rooms?.[0]?.id || 1;

      // Lưu ý: checkIn, checkOut giữ nguyên là chuỗi "YYYY-MM-DD"
      const bookingPayload = {
        userId: null,
        apartmentId: selectedApartment?.id || 1,
        roomId: selectedRoomId,
        checkIn: bookingData.checkIn, // KHÔNG new Date
        checkOut: bookingData.checkOut,
        totalPrice: (bookingData.price || 0) + calculateSurcharge(),
        status: "HOLD",
        guestName: "",
        guestPhone: "",
        guestEmail: "",
        guestIdentityNumber: "",
        guestBirthday: "",
        guestNationality: "Việt Nam",
      };
      axios
        .post("http://localhost:8085/api/apartment-bookings", bookingPayload)
        .then((res) => {
          setRoomHeld(true);
          setHoldResult({ success: true, message: "Giữ phòng thành công!" });
        })
        .catch((err) => {
          let errorMsg = "Phòng đã bị giữ chỗ hoặc thông tin không hợp lệ!";
          if (err.response?.data) {
            if (typeof err.response.data === "string") {
              errorMsg = err.response.data;
            } else if (typeof err.response.data === "object") {
              errorMsg =
                err.response.data.message || JSON.stringify(err.response.data);
            }
          }
          setHoldResult({ success: false, message: errorMsg });
        });
    }
    // eslint-disable-next-line
  }, [bookingData, apartments, roomHeld]);

  // Format countdown
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const apartment = bookingData || {
    name: "",
    address: "",
    checkIn: "",
    checkOut: "",
    guests: {
      adults: 0,
      children: 0,
      babies: 0,
    },
    price: 0,
  };

  const updateGuestCount = (type, increment) => {
    if (modifiedGuestType && modifiedGuestType !== type) return;
    setGuestCounts((prev) => {
      const newValue = Math.max(0, prev[type] + increment);
      if (newValue !== prev[type]) setModifiedGuestType(type);
      if (newValue === Number(bookingData?.guests[type]))
        setModifiedGuestType(null);
      return { ...prev, [type]: newValue };
    });
  };

  const calculateSurcharge = () => {
    if (!bookingData) return 0;
    const additionalAdults = Math.max(
      0,
      guestCounts.adults - bookingData.guests.adults
    );
    const additionalChildren = Math.max(
      0,
      guestCounts.children - bookingData.guests.children
    );
    const adultCharge = additionalAdults * 200000;
    const childrenCharge = additionalChildren * 100000;
    return adultCharge + childrenCharge;
  };

  const handlePaymentClick = () => {
    setShowPaymentModal(true);
  };
  const closePaymentModal = () => setShowPaymentModal(false);

  // Helper hiển thị ngày ra giao diện, KHÔNG gửi ngày này lên API
  const formatDateVN = (dateStr) => {
    if (!dateStr) return "Chưa chọn";
    // Tạo object Date đúng giờ local để hiện
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Render
  return (
    <div className="booking-page">
      <p className="expire-warning">
        Đặt phòng của bạn sẽ không còn hiệu lực sau{" "}
        <strong>{formatTime(timeLeft)}</strong>
      </p>
      {holdResult && (
        <div
          style={{
            color: holdResult.success ? "green" : "red",
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          {holdResult.message}
        </div>
      )}
      <div className="booking-grid">
        <div className="booking-left">
          <section className="card hotel-info">
            <h3>Thông tin đặt phòng</h3>
            <h2>{apartment?.address || "Đang tải..."}</h2>
            <h3 style={{ margin: "6px 0", fontWeight: "normal" }}>
              {apartment?.name || "Đang tải..."}
            </h3>
            <div className="summary-box">
              <p>Ngày nhận phòng: {formatDateVN(apartment?.checkIn)}</p>
              <p>Ngày trả phòng: {formatDateVN(apartment?.checkOut)}</p>
            </div>
            <p>
              <strong>
                <div className="guest-controls">
                  <button
                    onClick={() => updateGuestCount("adults", -1)}
                    disabled={
                      modifiedGuestType && modifiedGuestType !== "adults"
                    }
                  >
                    -
                  </button>
                  {guestCounts.adults} người lớn
                  <button
                    onClick={() => updateGuestCount("adults", 1)}
                    disabled={
                      modifiedGuestType && modifiedGuestType !== "adults"
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateGuestCount("children", -1)}
                    disabled={
                      modifiedGuestType && modifiedGuestType !== "children"
                    }
                  >
                    -
                  </button>
                  {guestCounts.children} trẻ em
                  <button
                    onClick={() => updateGuestCount("children", 1)}
                    disabled={
                      modifiedGuestType && modifiedGuestType !== "children"
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateGuestCount("babies", -1)}
                    disabled={
                      modifiedGuestType && modifiedGuestType !== "babies"
                    }
                  >
                    -
                  </button>
                  {guestCounts.babies} em bé
                  <button
                    onClick={() => updateGuestCount("babies", 1)}
                    disabled={
                      modifiedGuestType && modifiedGuestType !== "babies"
                    }
                  >
                    +
                  </button>
                </div>
              </strong>
            </p>
          </section>
        </div>
        {/* Cột phải */}
        <div className="booking-right">
          <section className="card customer-form">
            <h4>Thông tin của bạn</h4>
            <input type="text" placeholder="Họ và tên*" />
            <input type="text" placeholder="Số điện thoại" />
            <input type="email" placeholder="Email*" />
            <input type="text" placeholder="CMND / Hộ chiếu" />
            <input type="date" placeholder="Ngày sinh" />
            <select>
              <option>Việt Nam</option>
              <option>Quốc tịch khác</option>
            </select>
          </section>
        </div>
      </div>
      {/* Phần thanh toán */}
      <div className="payment-section card">
        <h4>Thông tin thanh toán</h4>
        <table>
          <thead>
            <tr>
              <th>Chi tiết</th>
              <th>Giá (₫)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Phòng: {apartment?.name || "Đang tải..."}</td>
              <td>{apartment?.price?.toLocaleString() || "0"}</td>
            </tr>
            <tr>
              <td>Phụ thu</td>
              <td>{calculateSurcharge().toLocaleString()}</td>
            </tr>
            <tr className="total-row">
              <td>
                <strong>Tổng cộng</strong>
              </td>
              <td>
                <strong>
                  {(
                    (apartment?.price || 0) + calculateSurcharge()
                  ).toLocaleString()}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="payment-button">
          <button className="btn-pay" onClick={handlePaymentClick}>
            Thanh toán
          </button>
        </div>
      </div>
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <h3>Chọn phương thức thanh toán</h3>
            <div className="payment-options">
              <button className="payment-option active">
                <img src="/momo-icon.png" alt="Momo" />
                Momo
              </button>
              <button className="payment-option" disabled>
                <img src="/tpbank-icon.png" alt="TPBank" />
                TPBank
              </button>
              <button className="payment-option" disabled>
                <img src="/paypal-icon.png" alt="PayPal" />
                PayPal
              </button>
            </div>
            <div className="modal-actions">
              <button onClick={closePaymentModal}>Hủy</button>
              <button className="proceed-payment">Tiếp tục</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookingPage;
