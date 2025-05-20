import React, { useEffect, useState } from "react";
import "./BookingPage.css";

const BookingPage = () => {
  const [apartments, setApartments] = useState([]);
  const [bookingData, setBookingData] = useState(null);
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 1,
    babies: 0,
  });
  const [hasIncreasedGuest, setHasIncreasedGuest] = useState(false);
  const [modifiedGuestType, setModifiedGuestType] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const endTime = localStorage.getItem("bookingEndTime");
    if (!endTime) {
      const newEndTime = Date.now() + 600000; // 10 minutes in milliseconds
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

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const locationParam = params.get("location");

    console.log("URL Parameters:", {
      roomName: params.get("roomName"),
      location: locationParam,
      startDate: params.get("startDate"),
      endDate: params.get("endDate"),
      maxAdults: params.get("maxAdults"),
      maxChildren: params.get("maxChildren"),
      totalDiscounted: params.get("totalDiscounted"),
    });

    // Set booking data from URL parameters
    const bookingDataTemp = {
      name: params.get("roomName"),
      address: locationParam,
      checkIn: params.get("startDate"),
      checkOut: params.get("endDate"),
      guests: {
        adults: Number(params.get("maxAdults")) || 0,
        children: Number(params.get("maxChildren")) || 0,
        babies: 0,
      },
      price: Number(params.get("totalDiscounted")) || 0,
    };

    console.log("Booking Data:", bookingDataTemp);
    setBookingData(bookingDataTemp);

    setGuestCounts({
      adults: Number(params.get("maxAdults")) || 0,
      children: Number(params.get("maxChildren")) || 0,
      babies: 0,
    });

    // Fetch apartments data
    if (locationParam) {
      fetch(`http://localhost:8085/api/apartments/search?name=${locationParam}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Apartment data:", data);
          setApartments(data);
        })
        .catch((error) => {
          console.error("Error fetching apartments:", error);
        });
    }
  }, []);

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
  const firstLocation = apartments[0]?.location || "";
  const updateGuestCount = (type, increment) => {
    if (modifiedGuestType && modifiedGuestType !== type) {
      return;
    }

    setGuestCounts((prev) => {
      const newValue = Math.max(0, prev[type] + increment);
      if (newValue !== prev[type]) {
        setModifiedGuestType(type);
      }
      if (newValue === Number(bookingData?.guests[type])) {
        setModifiedGuestType(null);
      }
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

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className="booking-page">
      <p className="expire-warning">
        Đặt phòng của bạn sẽ không còn hiệu lực sau{" "}
        <strong>{formatTime(timeLeft)}</strong>
      </p>

      <div className="booking-grid">
        <div className="booking-left">
          <section className="card hotel-info">
            <h3>Thông tin đặt phòng</h3>
            <h2>{apartment?.address || "Đang tải..."}</h2>

            <h3 style={{ margin: "6px 0", fontWeight: "normal" }}>
              {apartment?.name || "Đang tải..."}
            </h3>
            <p>{firstLocation || "Đang tải..."}</p>

            <div className="summary-box">
              <p>
                Ngày nhận phòng:{" "}
                {apartment?.checkIn
                  ? new Date(apartment.checkIn).toLocaleDateString("vi-VN")
                  : "Chưa chọn"}
              </p>
              <p>
                Ngày trả phòng:
                {apartment?.checkOut
                  ? new Date(apartment.checkOut).toLocaleDateString("vi-VN")
                  : "Chưa chọn"}
              </p>
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

      {/* Phần thanh toán toàn chiều rộng */}
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
