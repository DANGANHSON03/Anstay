import React, { useState, useEffect, useCallback } from "react";
import "./RoomCard.css";
import { FaUser, FaBed, FaChild, FaRulerCombined, FaTag } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import vi from "date-fns/locale/vi";

registerLocale("vi", vi);

interface RoomData {
  id: number;
  apartmentId: number;
  name: string;
  description: string | null;
  capacity: number;
  price: number;
  maxRooms: number;
  maxAdults: number;
  maxChildren: number;
  discount?: number;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface BookedPeriod {
  start: Date;
  end: Date;
}

const RoomCard = () => {
  const [quantity, setQuantity] = useState(1);
  const [dateRanges, setDateRanges] = useState<{ [roomId: number]: DateRange }>(
    {}
  );
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [bookedDatesByRoom, setBookedDatesByRoom] = useState<{
    [roomId: number]: BookedPeriod[];
  }>({});
  const [loadingBookedDates, setLoadingBookedDates] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationParam = searchParams.get("location");

  // Fetch apartment + room list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartmentResponse = await fetch(
          `http://localhost:8085/api/apartments/search?name=${locationParam}`
        );
        const apartmentData = await apartmentResponse.json();
        if (apartmentData && apartmentData.length > 0) {
          const apartmentId = apartmentData[0].id;
          const roomsResponse = await fetch(
            `http://localhost:8085/api/rooms/apartment/${apartmentId}`
          );
          const roomsData: RoomData[] = await roomsResponse.json();
          setRooms(roomsData);

          // Fetch tất cả ngày đã book của từng room (đã đặt & đang giữ)
          setLoadingBookedDates(true);
          const newBookedDates: { [roomId: number]: BookedPeriod[] } = {};
          for (const room of roomsData) {
            const res = await fetch(
              `http://localhost:8085/api/apartment-bookings/by-room?roomId=${room.id}`
            );
            const bookings = await res.json();
            // Chỉ lấy status HOLD, CONFIRMED, PENDING
            const validStatuses = ["HOLD", "CONFIRMED", "PENDING"];
            const periods: BookedPeriod[] = bookings
              .filter((b: any) => validStatuses.includes(b.status))
              .map((b: any) => ({
                start: new Date(b.checkIn),
                end: new Date(b.checkOut),
              }));
            newBookedDates[room.id] = periods;
          }
          setBookedDatesByRoom(newBookedDates);
          setLoadingBookedDates(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingBookedDates(false);
      }
    };

    if (locationParam) {
      fetchData();
    }
  }, [locationParam]);

  // Lấy ra ngày đã đặt hoặc đang giữ của từng room (hàm này giữ nguyên logic cũ)
  const getExcludedDates = useCallback(
    (roomId: number) => {
      const periods = bookedDatesByRoom[roomId] || [];
      const dates: Date[] = [];
      periods.forEach(({ start, end }) => {
        let current = new Date(start);
        while (current <= end) {
          dates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
      });
      return dates;
    },
    [bookedDatesByRoom]
  );

  // ====== SỬA logic tính số đêm: Không cho phép ở 0 đêm hoặc check-out <= check-in ======
  const getNightCount = (roomId: number) => {
    const range = dateRanges[roomId];
    if (range && range.startDate && range.endDate) {
      const diff =
        (range.endDate.getTime() - range.startDate.getTime()) /
        (1000 * 60 * 60 * 24);
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  // ====== SỬA handleDateChange: Báo lỗi khi chọn ngày không hợp lệ, reset ngày check-out ======
  const handleDateChange = (
    roomId: number,
    dates: [Date | null, Date | null]
  ) => {
    const [start, end] = dates;
    if (start && end) {
      if (start >= end) {
        alert("Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày.");
        setDateRanges((prev) => ({
          ...prev,
          [roomId]: { startDate: start, endDate: null },
        }));
        return;
      }
    }
    setDateRanges((prev) => ({
      ...prev,
      [roomId]: { startDate: start, endDate: end },
    }));
  };

  // So sánh ngày chỉ lấy ngày-tháng-năm (không so sánh giờ)
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // ====== SỬA chuẩn lại filterDate (chỉ cần dùng filterDate, không cần excludeDates) ======
  const filterDate = (roomId: number, date: Date) => {
    const periods = bookedDatesByRoom[roomId] || [];
    for (const period of periods) {
      let current = new Date(period.start);
      while (current <= period.end) {
        if (isSameDay(current, date)) return false;
        current.setDate(current.getDate() + 1);
      }
    }
    return true;
  };

  const pad = (num: number) => String(num).padStart(2, "0");
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      {rooms.map((room) => {
        const price = Number(room.price) || 0;
        const discount = Number(room.discount) || 0;
        const range = dateRanges[room.id] || { startDate: null, endDate: null };
        const totalNights = getNightCount(room.id);
        const pricePerNight = Math.round(price * (1 - discount / 100));
        const totalOriginal = price * totalNights * quantity;
        const totalDiscounted = pricePerNight * totalNights * quantity;
        const amountSaved = totalOriginal - totalDiscounted;

        return (
          <div className="room-card" key={room.id}>
            <div className="name-card">
              <h3 className="room-title">{room.name}</h3>
            </div>
            <div className="body-card">
              <div className="room-info">
                <div className="room-image">
                  <img src="https://placeholder.com/300x200" alt={room.name} />
                </div>
                <div className="room-details">
                  <div className="room-icons">
                    <span>
                      <FaUser /> x {room.maxAdults}
                    </span>
                    <span>
                      <FaBed /> x {room.maxRooms}
                    </span>
                    <span>
                      <FaChild /> x {room.maxChildren}
                    </span>
                  </div>
                  <div className="room-size">
                    <FaRulerCombined /> {room.capacity} m²
                  </div>
                </div>
              </div>

              <div className="room-pricing">
                <div className="room-icons compact">
                  <h4>Standard Rate</h4>
                  <div className="discount-tag">
                    Giảm giá {discount > 0 ? discount : 0}%
                  </div>
                  <div>
                    <span>
                      <FaUser /> x {room.maxAdults}
                    </span>
                    <span>
                      <FaBed /> x {room.maxRooms}
                    </span>
                    <span>
                      <FaChild /> x {room.maxChildren}
                    </span>
                  </div>
                </div>
                <div className="room-policy">
                  <strong>Payment & Cancellation Policy:</strong>
                  <ul>
                    <li>Thanh toán khi nhận phòng</li>
                    <li>Hủy phòng trước 24h</li>
                  </ul>
                </div>
                <div className="room-promotions">
                  <strong>Other promotions and discounts:</strong>
                  <div className="badge purple">
                    <FaTag /> Giảm giá {discount > 0 ? discount : 0}% cho đặt
                    phòng sớm
                  </div>
                </div>
              </div>

              <div className="room-actions">
                <div className="date-picker-container">
                  <div className="night-info">
                    <p>
                      Giá mỗi đêm:{" "}
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#888",
                        }}
                      >
                        {price.toLocaleString("vi-VN")} VND
                      </span>{" "}
                      →{" "}
                      <span style={{ color: "#e60023", fontWeight: "bold" }}>
                        {pricePerNight.toLocaleString("vi-VN")} VND
                      </span>
                    </p>
                    {range.startDate && range.endDate && (
                      <>
                        <p>Số đêm: {totalNights}</p>
                        <p>
                          Tổng giá:{" "}
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#888",
                            }}
                          >
                            {totalOriginal.toLocaleString("vi-VN")} VND
                          </span>{" "}
                          →{" "}
                          <span
                            style={{ color: "#e60023", fontWeight: "bold" }}
                          >
                            {totalDiscounted.toLocaleString("vi-VN")} VND
                          </span>
                        </p>
                        <p>
                          Tiết kiệm:{" "}
                          <span style={{ color: "green", fontWeight: 600 }}>
                            {amountSaved.toLocaleString("vi-VN")} VND (
                            {discount}
                            %)
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                  <label>Chọn ngày:</label>
                  <DatePicker
                    selectsRange
                    startDate={range.startDate}
                    endDate={range.endDate}
                    onChange={(dates: [Date | null, Date | null]) =>
                      handleDateChange(room.id, dates)
                    }
                    locale="vi"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Chọn khoảng ngày"
                    filterDate={(date) => filterDate(room.id, date)}
                    minDate={new Date()}
                    className="date-input"
                    isClearable
                  />
                  {loadingBookedDates && (
                    <div
                      style={{ fontSize: 12, color: "#e60023", marginTop: 4 }}
                    >
                      Đang tải lịch phòng...
                    </div>
                  )}
                </div>

                <div className="btns">
                  <button
                    className="btn-select"
                    onClick={() => {
                      if (range.startDate && range.endDate) {
                        if (range.startDate >= range.endDate) {
                          alert(
                            "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày."
                          );
                          return;
                        }
                        setSelectedRoomId(room.id);
                      } else {
                        alert(
                          "Vui lòng chọn ngày đến và đi trước khi chọn phòng"
                        );
                      }
                    }}
                  >
                    SELECT
                  </button>
                  <button
                    className="btn-book"
                    onClick={() => {
                      if (range.startDate && range.endDate) {
                        if (range.startDate >= range.endDate) {
                          alert(
                            "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày."
                          );
                          return;
                        }
                        const params = new URLSearchParams({
                          id: room.id.toString(),
                          roomName: room.name,
                          startDate: formatDate(range.startDate),
                          endDate: formatDate(range.endDate),
                          quantity: quantity.toString(),
                          totalDiscounted: totalDiscounted.toString(),
                          maxRooms: room.maxRooms.toString(),
                          maxAdults: room.maxAdults.toString(),
                          maxChildren: room.maxChildren.toString(),
                          capacity: room.capacity.toString(),
                          pricePerNight: pricePerNight.toString(),
                          priceOriginalPerNight: price.toString(),
                          discountPercent: discount.toString(),
                          totalNights: totalNights.toString(),
                          totalOriginal: totalOriginal.toString(),
                          amountSaved: amountSaved.toString(),
                          location: locationParam || "",
                        });
                        navigate(`/booking-page?${params.toString()}`);
                      } else {
                        alert("Vui lòng chọn ngày trước khi đặt phòng");
                      }
                    }}
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {selectedRoomId !== null && (
        <div className="bottom-bar">
          <div className="bottom-bar-info">
            🛒 Your selections include:{" "}
            <strong>
              {quantity} Room{quantity > 1 ? "s" : ""},{" "}
              {getNightCount(selectedRoomId)} Night
              {getNightCount(selectedRoomId) > 1 ? "s" : ""}
            </strong>
          </div>
          <div className="bottom-bar-price">
            <strong>
              {rooms.length > 0 && dateRanges[selectedRoomId]
                ? Math.round(
                    Number(
                      rooms.find((r) => r.id === selectedRoomId)?.price || 0
                    ) *
                      (1 -
                        (Number(
                          rooms.find((r) => r.id === selectedRoomId)?.discount
                        ) || 0) /
                          100) *
                      getNightCount(selectedRoomId) *
                      quantity
                  ).toLocaleString("vi-VN")
                : 0}{" "}
              VND
            </strong>
            <button
              className="btn-book-now"
              onClick={() => {
                if (selectedRoomId !== null) {
                  const room = rooms.find((r) => r.id === selectedRoomId);
                  const range = dateRanges[selectedRoomId];
                  if (room && range && range.startDate && range.endDate) {
                    if (range.startDate >= range.endDate) {
                      alert(
                        "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày."
                      );
                      return;
                    }
                    const price = Number(room.price) || 0;
                    const discount = Number(room.discount) || 0;
                    const pricePerNight = Math.round(
                      price * (1 - discount / 100)
                    );
                    const totalNights = getNightCount(selectedRoomId);
                    const totalOriginal = price * totalNights * quantity;
                    const totalDiscounted =
                      pricePerNight * totalNights * quantity;
                    const amountSaved = totalOriginal - totalDiscounted;

                    const params = new URLSearchParams({
                      id: room.id.toString(),
                      roomName: room.name,
                      startDate: formatDate(range.startDate),
                      endDate: formatDate(range.endDate),
                      quantity: quantity.toString(),
                      totalDiscounted: totalDiscounted.toString(),
                      maxRooms: room.maxRooms.toString(),
                      maxAdults: room.maxAdults.toString(),
                      maxChildren: room.maxChildren.toString(),
                      capacity: room.capacity.toString(),
                      pricePerNight: pricePerNight.toString(),
                      priceOriginalPerNight: price.toString(),
                      discountPercent: discount.toString(),
                      totalNights: totalNights.toString(),
                      totalOriginal: totalOriginal.toString(),
                      amountSaved: amountSaved.toString(),
                      location: locationParam || "",
                    });
                    navigate(`/booking-page?${params.toString()}`);
                  } else {
                    alert("Vui lòng chọn ngày trước khi đặt phòng");
                  }
                }
              }}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomCard;
