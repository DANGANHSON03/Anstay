import React, { useEffect, useState, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const animationFrameIdRef = useRef(null);
  const endTimeRef = useRef(null);
  const holdTimeoutRef = useRef(null);

  // ===== Thông tin khách vãng lai (input controlled) =====
  const [guestInfo, setGuestInfo] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    guestIdentityNumber: "",
    guestBirthday: "",
    guestNationality: "Việt Nam",
  });

  // ================== ĐỒNG HỒ ĐẶT PHÒNG ==================
  const startCountdown = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    const newEndTime = Date.now() + 10 * 60 * 1000;
    localStorage.setItem("bookingEndTime", newEndTime.toString());
    endTimeRef.current = newEndTime;
    setTimeLeft(600);

    const updateTime = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((endTimeRef.current - now) / 1000));
      setTimeLeft(diff);
      if (diff <= 0) {
        localStorage.removeItem("bookingEndTime");
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
        return;
      }
      animationFrameIdRef.current = requestAnimationFrame(updateTime);
    };

    animationFrameIdRef.current = requestAnimationFrame(updateTime);
  };

  useEffect(() => {
    const storedEndTime = localStorage.getItem("bookingEndTime");
    if (storedEndTime) {
      endTimeRef.current = Number(storedEndTime);
      const updateTime = () => {
        const now = Date.now();
        const diff = Math.max(0, Math.floor((endTimeRef.current - now) / 1000));
        setTimeLeft(diff);
        if (diff <= 0) {
          localStorage.removeItem("bookingEndTime");
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
          return;
        }
        animationFrameIdRef.current = requestAnimationFrame(updateTime);
      };
      animationFrameIdRef.current = requestAnimationFrame(updateTime);
    } else {
      startCountdown();
    }
    return () => {
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (bookingData) {
      startCountdown();
      setRoomHeld(false);
      setHoldResult(null);
    }
  }, [bookingData]);

  // ================== LẤY DATA BOOKING & PHÒNG ==================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomIdParam = params.get("id");
    const locationParam = params.get("location");
    const bookingDataTemp = {
      name: params.get("roomName") || "",
      address: locationParam || "",
      checkIn: params.get("startDate") || "",
      checkOut: params.get("endDate") || "",
      guests: {
        adults: Number(params.get("maxAdults")) || 0,
        children: Number(params.get("maxChildren")) || 0,
        babies: 0,
      },
      price: Number(params.get("totalDiscounted")) || 0,
      roomId: roomIdParam ? Number(roomIdParam) : null,
    };
    setBookingData(bookingDataTemp);
    setGuestCounts({
      adults: Number(params.get("maxAdults")) || 0,
      children: Number(params.get("maxChildren")) || 0,
      babies: 0,
    });

    if (locationParam) {
      fetch(`http://localhost:8085/api/apartments/search?name=${locationParam}`)
        .then((res) => res.json())
        .then((data) => setApartments(data))
        .catch((err) => {
          setApartments([
            {
              id: 1,
              name: locationParam || "Default Apartment",
              rooms: [{ id: roomIdParam ? Number(roomIdParam) : 1 }],
            },
          ]);
        });
    } else {
      setApartments([
        {
          id: 1,
          name: "Default Apartment",
          rooms: [{ id: roomIdParam ? Number(roomIdParam) : 1 }],
        },
      ]);
    }
  }, []);

  // ================== GIỮ PHÒNG ==================
  const holdRoom = async () => {
    if (!bookingData || roomHeld || isLoading) return;
    setIsLoading(true);

    let selectedApartment = null;
    let selectedRoomId = bookingData.roomId;
    for (const apt of apartments) {
      if (apt.rooms && apt.rooms.some((r) => r.id === selectedRoomId)) {
        selectedApartment = apt;
        break;
      }
    }
    if (!selectedApartment) {
      selectedApartment = apartments[0] || { id: 1 };
      selectedRoomId = selectedApartment?.rooms?.[0]?.id || selectedRoomId || 1;
    }
    const bookingPayload = {
      userId: null,
      apartmentId: selectedApartment?.id || 1,
      roomId: selectedRoomId,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      totalPrice: (bookingData.price || 0) + calculateSurcharge(),
      status: "HOLD",
      guestName: guestInfo.guestName,
      guestPhone: guestInfo.guestPhone,
      guestEmail: guestInfo.guestEmail,
      guestIdentityNumber: guestInfo.guestIdentityNumber,
      guestBirthday: guestInfo.guestBirthday,
      guestNationality: guestInfo.guestNationality,
    };

    try {
      await axios.post(
        "http://localhost:8085/api/apartment-bookings",
        bookingPayload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 8000,
        }
      );
      setRoomHeld(true);
      setHoldResult({ success: true, message: "Giữ phòng thành công!" });
    } catch (err) {
      setHoldResult({
        success: false,
        message: "Có lỗi xảy ra khi đặt phòng! Vui lòng thử lại sau.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!bookingData || apartments.length === 0 || roomHeld) return;
    if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    holdTimeoutRef.current = setTimeout(() => {
      holdRoom();
    }, 1500);
    return () => {
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    };
  }, [bookingData, apartments, roomHeld]);

  // ================== THANH TOÁN MOMO ==================
  const handleMomoPayment = async () => {
    if (!roomHeld) {
      alert("Bạn phải giữ phòng thành công trước khi thanh toán!");
      return;
    }
    // Có thể validate thêm info khách tại đây

    const paymentData = {
      bookingType: "APARTMENT",
      bookingId: bookingData.roomId,
      userId: null,
      amount: (bookingData.price || 0) + calculateSurcharge(),
      paymentMethod: "MOMO",
      guestName: guestInfo.guestName,
      guestPhone: guestInfo.guestPhone,
      guestEmail: guestInfo.guestEmail,
      guestIdentityNumber: guestInfo.guestIdentityNumber,
      guestBirthday: guestInfo.guestBirthday,
      guestNationality: guestInfo.guestNationality,
    };

    try {
      const res = await axios.post(
        "http://localhost:8085/api/payments/momo",
        paymentData
      );
      const payUrl = res.data.payUrl;
      if (payUrl) {
        window.location.href = payUrl;
      } else {
        alert("Không lấy được link thanh toán Momo!");
      }
    } catch (err) {
      alert("Tạo thanh toán thất bại!");
      console.error(err);
    }
  };

  // ================== CÁC HÀM PHỤ ==================
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateSurcharge = () => {
    if (!bookingData) return 0;
    const addAdults = Math.max(
      0,
      guestCounts.adults - bookingData.guests.adults
    );
    const addChildren = Math.max(
      0,
      guestCounts.children - bookingData.guests.children
    );
    const chargeAdults = addAdults * 200000;
    const chargeChildren = addChildren * 100000;
    return chargeAdults + chargeChildren;
  };

  const updateGuestCount = (type, delta) => {
    if (modifiedGuestType && modifiedGuestType !== type) return;
    setGuestCounts((prev) => {
      const newVal = Math.max(0, prev[type] + delta);
      if (newVal !== prev[type]) setModifiedGuestType(type);
      if (newVal === (bookingData?.guests[type] || 0))
        setModifiedGuestType(null);
      return { ...prev, [type]: newVal };
    });
  };

  const formatDateVN = (dateStr) => {
    if (!dateStr) return "Chưa chọn";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const apartment = bookingData || {
    name: "",
    address: "",
    checkIn: "",
    checkOut: "",
    guests: { adults: 0, children: 0, babies: 0 },
    price: 0,
  };

  const handlePaymentClick = () => setShowPaymentModal(true);
  const closePaymentModal = () => setShowPaymentModal(false);
  const retryHoldRoom = () => {
    setRoomHeld(false);
    setHoldResult(null);
    holdRoom();
  };

  // ================== JSX ==================
  return (
    <div className="booking-page">
      <p className="expire-warning">
        Đặt phòng của bạn sẽ không còn hiệu lực sau{" "}
        <strong>{formatTime(timeLeft)}</strong>
      </p>

      {isLoading && (
        <div style={{ color: "blue", fontWeight: "bold", marginBottom: 12 }}>
          Đang xử lý...
        </div>
      )}

      {holdResult && (
        <div
          style={{
            color: holdResult.success ? "green" : "red",
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          {holdResult.message}
          {!holdResult.success && (
            <button
              onClick={retryHoldRoom}
              style={{ marginLeft: 10, padding: "3px 8px" }}
            >
              Thử lại
            </button>
          )}
        </div>
      )}

      <div className="booking-grid">
        <div className="booking-left">
          <section className="card hotel-info">
            <h3>Thông tin đặt phòng</h3>
            <h2>{apartment.address || "Đang tải..."}</h2>
            <h3 style={{ margin: "6px 0", fontWeight: "normal" }}>
              {apartment.name || "Đang tải..."}
            </h3>
            <div className="summary-box">
              <p>Ngày nhận phòng: {formatDateVN(apartment.checkIn)}</p>
              <p>Ngày trả phòng: {formatDateVN(apartment.checkOut)}</p>
            </div>
            <p>
              <strong>
                <div className="guest-controls">
                  {/* Người lớn */}
                  <div className="guest-row">
                    <button
                      onClick={() => updateGuestCount("adults", -1)}
                      disabled={
                        modifiedGuestType && modifiedGuestType !== "adults"
                      }
                    >
                      -
                    </button>
                    <span>{guestCounts.adults} người lớn</span>
                    <button
                      onClick={() => updateGuestCount("adults", 1)}
                      disabled={
                        modifiedGuestType && modifiedGuestType !== "adults"
                      }
                    >
                      +
                    </button>
                  </div>
                  {/* Trẻ em */}
                  <div className="guest-row">
                    <button
                      onClick={() => updateGuestCount("children", -1)}
                      disabled={
                        modifiedGuestType && modifiedGuestType !== "children"
                      }
                    >
                      -
                    </button>
                    <span>{guestCounts.children} trẻ em</span>
                    <button
                      onClick={() => updateGuestCount("children", 1)}
                      disabled={
                        modifiedGuestType && modifiedGuestType !== "children"
                      }
                    >
                      +
                    </button>
                  </div>
                  {/* Em bé */}
                  <div className="guest-row">
                    <button
                      onClick={() => updateGuestCount("babies", -1)}
                      disabled={
                        modifiedGuestType && modifiedGuestType !== "babies"
                      }
                    >
                      -
                    </button>
                    <span>{guestCounts.babies} em bé</span>
                    <button
                      onClick={() => updateGuestCount("babies", 1)}
                      disabled={
                        modifiedGuestType && modifiedGuestType !== "babies"
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </strong>
            </p>
          </section>
        </div>

        <div className="booking-right">
          <section className="card customer-form">
            <h4>Thông tin của bạn</h4>
            <input
              type="text"
              placeholder="Họ và tên*"
              value={guestInfo.guestName}
              onChange={(e) =>
                setGuestInfo((info) => ({ ...info, guestName: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={guestInfo.guestPhone}
              onChange={(e) =>
                setGuestInfo((info) => ({
                  ...info,
                  guestPhone: e.target.value,
                }))
              }
            />
            <input
              type="email"
              placeholder="Email*"
              value={guestInfo.guestEmail}
              onChange={(e) =>
                setGuestInfo((info) => ({
                  ...info,
                  guestEmail: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="CMND / Hộ chiếu"
              value={guestInfo.guestIdentityNumber}
              onChange={(e) =>
                setGuestInfo((info) => ({
                  ...info,
                  guestIdentityNumber: e.target.value,
                }))
              }
            />
            <input
              type="date"
              placeholder="Ngày sinh"
              value={guestInfo.guestBirthday}
              onChange={(e) =>
                setGuestInfo((info) => ({
                  ...info,
                  guestBirthday: e.target.value,
                }))
              }
            />
            <select
              value={guestInfo.guestNationality}
              onChange={(e) =>
                setGuestInfo((info) => ({
                  ...info,
                  guestNationality: e.target.value,
                }))
              }
            >
              <option>Việt Nam</option>
              <option>Quốc tịch khác</option>
            </select>
          </section>
        </div>
      </div>

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
              <td>Phòng: {apartment.name || "Đang tải..."}</td>
              <td>{(apartment.price || 0).toLocaleString()}</td>
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
                    (apartment.price || 0) + calculateSurcharge()
                  ).toLocaleString()}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="payment-button">
          <button
            className="btn-pay"
            onClick={handlePaymentClick}
            disabled={!roomHeld && !holdResult?.success}
          >
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
                <img src="/momo-icon.png" alt="Momo" /> Momo
              </button>
              <button className="payment-option" disabled>
                <img src="/tpbank-icon.png" alt="TPBank" /> TPBank
              </button>
              <button className="payment-option" disabled>
                <img src="/paypal-icon.png" alt="PayPal" /> PayPal
              </button>
            </div>
            <div className="modal-actions">
              <button onClick={closePaymentModal}>Hủy</button>
              <button className="proceed-payment" onClick={handleMomoPayment}>
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
