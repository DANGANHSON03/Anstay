import React, { useState, useEffect } from "react";
import "./RoomCard.css";
import { FaUser, FaBed, FaChild, FaRulerCombined, FaTag } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";

SwiperCore.use([Navigation, Pagination]);

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

const RoomCard = ({ data }: { data: RoomData }) => {
  const [currentIndexes, setCurrentIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationParam = searchParams.get("location");
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [roomImages, setRoomImages] = useState<{ [key: number]: string[] }>({});

  useEffect(() => {
    console.log("Location parameter:", locationParam);

    const fetchData = async () => {
      try {
        const apartmentResponse = await fetch(
          `http://localhost:8085/api/apartments/search?name=${locationParam}`
        );
        const apartmentData = await apartmentResponse.json();

        if (apartmentData && apartmentData.length > 0) {
          const apartmentId = Number(apartmentData[0].id);
          console.log("Apartment ID:", apartmentId);

          const roomsResponse = await fetch(
            `http://localhost:8085/api/rooms/apartment/${apartmentId}`
          );
          const roomsData = await roomsResponse.json();

          setRooms(roomsData);

          const imageMap: { [key: number]: string[] } = {};
          if (Array.isArray(roomsData)) {
            for (const room of roomsData) {
              const imageResponse = await fetch(
                `http://localhost:8085/api/room-images/room/${room.id}`
              );
              const imageData = await imageResponse.json();
              console.log("Ảnh phòng", room.id, imageData);
              imageMap[room.id] = Array.isArray(imageData)
                ? imageData.map((img: any) => img.imageUrl)
                : [];
            }
          }

          setRoomImages(imageMap);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (locationParam) {
      fetchData();
    }
  }, [locationParam]);

  const bookedDates = [
    { start: new Date("2025-05-21"), end: new Date("2025-05-22") },
    { start: new Date("2025-05-25"), end: new Date("2025-05-27") },
  ];

  const getNightCount = () => {
    if (startDate && endDate) {
      return Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
    }
    return 0;
  };
  const totalNights = getNightCount();

  const filterDate = (date: Date) => {
    const isBooked = bookedDates.some(
      (period) => date >= period.start && date <= period.end
    );
    if (isBooked) return false;
    if (startDate && !endDate) {
      return !bookedDates.some(
        (period) => startDate <= period.end && date >= period.start
      );
    }
    return true;
  };
  return (
    <>
      {Array.isArray(rooms) &&
        rooms.map((room) => {
          const price = Number(room.price) || 0;
          const discount = Number(room.discount) || 0;
          const pricePerNight = Math.round(price * (1 - discount / 100));
          const totalNights = getNightCount();
          const totalOriginal = price * totalNights * quantity;
          const totalDiscounted = pricePerNight * totalNights * quantity;
          const amountSaved = totalOriginal - totalDiscounted;
          const images = roomImages[room.id] || [];
          const currentIndex = currentIndexes[room.id] || 0;

          const nextImage = () => {
            setCurrentIndexes((prev) => ({
              ...prev,
              [room.id]:
                images.length > 0 ? (currentIndex + 1) % images.length : 0,
            }));
          };

          const prevImage = () => {
            setCurrentIndexes((prev) => ({
              ...prev,
              [room.id]:
                images.length > 0
                  ? currentIndex === 0
                    ? images.length - 1
                    : currentIndex - 1
                  : 0,
            }));
          };

          return (
            <div className="room-card" key={room.id}>
              <div className="name-card">
                <h3 className="room-title">{room.name}</h3>
              </div>
              <div className="body-card">
                <div className="room-info">
                  <div className="room-image">
                    {images.length > 0 && (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "220px",
                        }}
                      >
                        <img
                          src={images[currentIndex]}
                          alt={`Ảnh ${currentIndex + 1} của ${room.name}`}
                          style={{
                            width: "300px",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                        <button
                          onClick={prevImage}
                          style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          ◀
                        </button>
                        <button
                          onClick={nextImage}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          ▶
                        </button>
                      </div>
                    )}
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
                    <div className="discount-tag">
                      <FaTag /> Giảm giá {discount > 0 ? discount : 0}%
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
                    <strong>Chính sách thanh toán và hủy bỏ:</strong>
                    <ul>
                      <li>Thanh toán khi nhận phòng</li>
                      <li>Hủy phòng trước 24h</li>
                    </ul>
                  </div>

                  <div className="room-promotions">
                    <strong>
                      Các chương trình khuyến mãi và giảm giá khác
                    </strong>
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
                        Giá mỗi đêm:
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                          }}
                        >
                          {price.toLocaleString("vi-VN")} VND
                        </span>
                        {" → "}
                        <span style={{ color: "#e60023", fontWeight: "bold" }}>
                          {pricePerNight.toLocaleString("vi-VN")} VND
                        </span>
                      </p>
                      {startDate && endDate && (
                        <>
                          <p>Số đêm: {totalNights}</p>
                          <p>
                            Tổng giá:
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "#888",
                              }}
                            >
                              {totalOriginal.toLocaleString("vi-VN")} VND
                            </span>{" "}
                            →
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
                              {discount}%)
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
                      b
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn khoảng ngày"
                      includeDates={bookedDates}
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
                          alert(
                            "Vui lòng chọn ngày đến và đi trước khi chọn phòng"
                          );
                        }
                      }}
                    >
                      LỰA CHỌN
                    </button>
                    <button
                      className="btn-book"
                      onClick={() => {
                        if (startDate && endDate) {
                          const params = new URLSearchParams({
                            id: room.id.toString(),
                            roomName: room.name,
                            startDate: startDate.toISOString(),
                            endDate: endDate.toISOString(),
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
                      ĐẶT NGAY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {selected && (
        <div className="bottom-bar">
          <div className="bottom-bar-info">
            🛒Lựa chọn của chúng tôi bao gồm:{" "}
            <strong>
              {quantity} Phòng{quantity > 1 ? "s" : ""}, {totalNights} Đêm
              {totalNights > 1 ? "s" : ""}
            </strong>
          </div>
          <div className="bottom-bar-price">
            <strong>
              {/* Tổng tiền sau giảm ở phòng đầu tiên (tuỳ bạn muốn show chỗ này thế nào) */}
              {rooms.length > 0
                ? Math.round(
                    Number(rooms[0].price) *
                      (1 - (Number(rooms[0].discount) || 0) / 100) *
                      totalNights *
                      quantity
                  ).toLocaleString("vi-VN")
                : 0}{" "}
              VND
            </strong>
            <button
              className="btn-book-now"
              onClick={() => {
                if (startDate && endDate && rooms.length > 0) {
                  const room = rooms[0];
                  const price = Number(room.price) || 0;
                  const discount = Number(room.discount) || 0;
                  const pricePerNight = Math.round(
                    price * (1 - discount / 100)
                  );
                  const totalOriginal = price * totalNights * quantity;
                  const totalDiscounted =
                    pricePerNight * totalNights * quantity;
                  const amountSaved = totalOriginal - totalDiscounted;

                  const params = new URLSearchParams({
                    id: room.id.toString(),
                    roomName: room.name,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
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
              ĐẶT NGAY
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomCard;
