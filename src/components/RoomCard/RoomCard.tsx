import React, { useState } from "react";
import "./RoomCard.css";
import { FaUser, FaBed, FaChild, FaRulerCombined, FaTag } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

interface RoomData {
  id: number;
  roomsLeft: number;
  name_room: string;
  image: string;
  guests: number;
  beds: number;
  children: number;
  size: string;
  bedType: string;
  price: string; // dạng "1.200.000" - giá gốc
  priceOriginal: string;
  nights: number;
  policy: string[];
  promotions: string[];
  discountText?: string;
  discountPercentage?: number;
  imageCount?: number;
}

const RoomCard = ({ data }: { data: RoomData }) => {
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  console.log("Room ID:", data.id);

  const bookedDates = [
    new Date("2025-05-21"),
    new Date("2025-05-22"),
    new Date("2025-05-25"),
  ];

  const priceOriginalPerNight = parseInt(data.price.replace(/\./g, ""), 10);
  console.log("Original price per night:", priceOriginalPerNight);

  const discountPercent =
    data.discountPercentage ??
    parseInt(data.discountText?.match(/\d+/)?.[0] || "0", 10);
  console.log("Discount percent:", discountPercent);

  const pricePerNight = Math.round(
    priceOriginalPerNight * (1 - discountPercent / 100)
  );
  console.log("Discounted price per night:", pricePerNight);

  const getNightCount = () => {
    if (startDate && endDate) {
      return Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
    }
    return 0;
  };

  const totalNights = getNightCount();
  console.log("Total nights:", totalNights);

  const totalOriginal = priceOriginalPerNight * totalNights;
  const totalDiscounted = pricePerNight * totalNights;
  console.log("Total original:", totalOriginal);
  console.log("Total discounted:", totalDiscounted);
  const amountSaved = totalOriginal - totalDiscounted;

  const filterDate = (date: Date) => {
    const isBooked = bookedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
    if (isBooked) return false;

    if (startDate && !endDate) {
      const nextBooked = bookedDates.find((d) => d > startDate);
      return !nextBooked || date < nextBooked;
    }

    return true;
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="room-card">
        <div className="name-card">
          <h3 className="room-title">{data.name_room}</h3>
        </div>

        <div className="body-card">
          <div className="room-info">
            <div className="room-image">
              <img src={data.image} alt={data.name_room} />
              <div className="room-image-count">{data.imageCount}</div>
            </div>

            <div className="room-details">
              <div className="room-icons">
                <span>
                  <FaUser /> x {data.guests}
                </span>
                <span>
                  <FaBed /> x {data.beds}
                </span>
                <span>
                  <FaChild /> x {data.children}
                </span>
              </div>
              <div className="room-size">
                <FaRulerCombined /> {data.size}
              </div>
            </div>
          </div>

          <div className="room-pricing">
            <div className="room-icons compact">
              <h4>Standard Rate</h4>
              <div className="discount-tag">{data.discountText}</div>
              <div>
                <span>
                  <FaUser /> x {data.guests}
                </span>
                <span>
                  <FaBed /> x {data.beds}
                </span>
                <span>
                  <FaChild /> x {data.children}
                </span>
              </div>
            </div>

            <div className="room-policy">
              <strong>Payment & Cancellation Policy:</strong>
              <ul>
                {data.policy.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="room-promotions">
              <strong>Other promotions and discounts:</strong>
              {data.promotions.map((promo, idx) => (
                <div className="badge purple" key={idx}>
                  <FaTag /> {promo}
                </div>
              ))}
            </div>
          </div>

          <div className="room-actions">
            <div className="date-picker-container">
              <div className="night-info">
                <p>
                  Giá mỗi đêm:{" "}
                  <span
                    style={{ textDecoration: "line-through", color: "#888" }}
                  >
                    {priceOriginalPerNight.toLocaleString("vi-VN")} VND
                  </span>{" "}
                  →{" "}
                  <span style={{ color: "#e60023", fontWeight: "bold" }}>
                    {pricePerNight.toLocaleString("vi-VN")} VND
                  </span>
                </p>
                {startDate && endDate && (
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
                      <span style={{ color: "#e60023", fontWeight: "bold" }}>
                        {totalDiscounted.toLocaleString("vi-VN")} VND
                      </span>
                    </p>
                    <p>
                      Tiết kiệm:{" "}
                      <span style={{ color: "green", fontWeight: 600 }}>
                        {amountSaved.toLocaleString("vi-VN")} VND (
                        {discountPercent}%)
                      </span>
                    </p>
                  </>
                )}
              </div>

              <label>Chọn ngày:</label>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(dates: [Date | null, Date | null]) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                locale="vi"
                dateFormat="dd/MM/yyyy"
                placeholderText="Chọn khoảng ngày"
                excludeDates={bookedDates}
                filterDate={filterDate}
                minDate={new Date()}
                className="date-input"
                isClearable
              />
            </div>

            <div className="btns">
              <button
                className="btn-select"
                onClick={() => {
                  if (startDate && endDate) {
                    setSelected(true);
                  } else {
                    alert("Vui lòng chọn ngày đến và đi trước khi chọn phòng");
                  }
                }}
              >
                SELECT
              </button>

              <button
                className="btn-book"
                onClick={() => {
                  if (startDate && endDate) {
                    const params = new URLSearchParams({
                      id: data.id.toString(),
                      roomName: data.name_room,
                      startDate: startDate.toISOString(),
                      endDate: endDate.toISOString(),
                      quantity: quantity.toString(),
                      totalDiscounted: totalDiscounted.toString(),
                      roomsLeft: data.roomsLeft.toString(),
                      bedType: data.bedType,
                      guests: data.guests.toString(),
                      children: data.children.toString(),
                      size: data.size,
                      pricePerNight: pricePerNight.toString(),
                      priceOriginalPerNight: priceOriginalPerNight.toString(),
                      discountPercent: discountPercent.toString(),
                      totalNights: totalNights.toString(),
                      totalOriginal: totalOriginal.toString(),
                      amountSaved: amountSaved.toString(),
                      image: data.image,
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

      {selected && (
        <div className="bottom-bar">
          <div className="bottom-bar-info">
            🛒 Your selections include:{" "}
            <strong>
              {quantity} Room{quantity > 1 ? "s" : ""}, {totalNights} Night
              {totalNights > 1 ? "s" : ""}
            </strong>
          </div>
          <div className="bottom-bar-price">
            <strong>{totalDiscounted.toLocaleString("vi-VN")} VND</strong>
            <button className="btn-book-now">BOOK NOW</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomCard;
