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
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const animationFrameIdRef = useRef(null);
  const endTimeRef = useRef(null);
  const holdTimeoutRef = useRef(null);

  // Bắt đầu hoặc reset bộ đếm 10 phút
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

  // Khi mount, load đồng hồ nếu có hoặc bắt đầu mới
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

  // Reset bộ đếm khi bookingData thay đổi (ví dụ đổi ngày)
  useEffect(() => {
    if (bookingData) {
      startCountdown();
      setRoomHeld(false);
      setHoldResult(null);
    }
  }, [bookingData]);

  // Lấy params URL, gồm roomId, location, các thông tin booking
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
      // Use http instead of https for local API to avoid SSL errors
      fetch(`http://localhost:8085/api/apartments/search?name=${locationParam}`)
        .then((res) => res.json())
        .then((data) => setApartments(data))
        .catch((err) => {
          console.error("Error fetching apartments:", err);
          // Set fallback apartment data if fetch fails
          setApartments([
            {
              id: 1,
              name: locationParam || "Default Apartment",
              rooms: [{ id: roomIdParam ? Number(roomIdParam) : 1 }],
            },
          ]);
        });
    } else {
      // Set fallback apartment data if no location param
      setApartments([
        {
          id: 1,
          name: "Default Apartment",
          rooms: [{ id: roomIdParam ? Number(roomIdParam) : 1 }],
        },
      ]);
    }
  }, []);

  // Modified function to hold room with better error handling
  const holdRoom = async () => {
    if (!bookingData || roomHeld || isLoading) return;

    setIsLoading(true);

    let selectedApartment = null;
    let selectedRoomId = bookingData.roomId;

    // Find the apartment that has the room
    for (const apt of apartments) {
      if (apt.rooms && apt.rooms.some((r) => r.id === selectedRoomId)) {
        selectedApartment = apt;
        break;
      }
    }

    // If apartment not found, use the first one or create a default
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
      guestName: "",
      guestPhone: "",
      guestEmail: "",
      guestIdentityNumber: "",
      guestBirthday: "",
      guestNationality: "Việt Nam",
    };

    console.log("Sending booking payload:", bookingPayload);

    try {
      // Try the local endpoint first with http (not https)
      const response = await axios({
        method: "post",
        url: "http://localhost:8085/api/apartment-bookings",
        data: bookingPayload,
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 8000, // 8 second timeout
        withCredentials: false,
      });

      console.log("Booking success:", response.data);
      setRoomHeld(true);
      setHoldResult({ success: true, message: "Giữ phòng thành công!" });
    } catch (localErr) {
      console.error("Local booking error:", localErr);

      try {
        // If local endpoint fails, try the remote endpoint
        console.log("Trying remote endpoint...");
        const response = await axios({
          method: "post",
          url: "https://anstayapi.onrender.com/api/apartment-bookings",
          data: bookingPayload,
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout for Render (which might be slow to wake up)
          withCredentials: false,
        });

        console.log("Remote booking success:", response.data);
        setRoomHeld(true);
        setHoldResult({ success: true, message: "Giữ phòng thành công!" });
      } catch (remoteErr) {
        console.error("Remote booking error:", remoteErr);

        // Try one more time with a direct XMLHttpRequest fallback
        try {
          console.log("Trying XMLHttpRequest fallback...");
          const xhrResult = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:8085/api/apartment-bookings");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.timeout = 5000; // 5 second timeout

            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                reject(new Error(`XHR Error: ${xhr.statusText}`));
              }
            };

            xhr.onerror = function () {
              reject(new Error("Network Error in XHR"));
            };

            xhr.ontimeout = function () {
              reject(new Error("XHR Timeout"));
            };

            xhr.send(JSON.stringify(bookingPayload));
          });

          console.log("XHR booking success:", xhrResult);
          setRoomHeld(true);
          setHoldResult({ success: true, message: "Giữ phòng thành công!" });
        } catch (xhrErr) {
          console.error("All booking attempts failed");
          let errorMsg = "Có lỗi xảy ra khi đặt phòng! Vui lòng thử lại sau.";

          // Extract error message from the error chain
          if (remoteErr.response?.data) {
            errorMsg =
              typeof remoteErr.response.data === "object"
                ? remoteErr.response.data.message ||
                  JSON.stringify(remoteErr.response.data)
                : remoteErr.response.data;
          } else if (remoteErr.message) {
            errorMsg = `Lỗi: ${remoteErr.message}`;
          } else if (localErr.message) {
            errorMsg = `Lỗi: ${localErr.message}`;
          }

          setHoldResult({ success: false, message: errorMsg });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Modified effect to call holdRoom
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

  // Format thời gian đếm ngược thành mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Tính phí phụ thu thêm người lớn và trẻ em
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

  // Cập nhật số lượng khách
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

  // Format ngày sang định dạng dd/mm/yyyy
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

  // Added function to manually retry holding the room
  const retryHoldRoom = () => {
    setRoomHeld(false);
    setHoldResult(null);
    holdRoom();
  };

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
              <button className="proceed-payment">Tiếp tục</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
