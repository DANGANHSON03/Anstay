import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";
import img2 from '../../assets/Images/N009585.jpg'
import img3 from '../../assets/Images/N009586.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FaStar} from 'react-icons/fa';
import RoomCard from '../../components/RoomCard/RoomCard'

 

const SearchResults = () => {


  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("2025-05-10");
  const [checkOut, setCheckOut] = useState("2025-05-11");
  const [room, setRoom] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const getNights = () => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = (outDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24);
    return diff;
  };
  const propertyData = {
  name: "SAZIHOME LE THANH TONG HANOI",
  rating: 4,
  address: "No.9 Alley 6 Le Thanh Tong street, Hoan Kiem district, Hanoi, Vietnam",
   images : [
 'https://i.ibb.co/35J3zmZn/3.jpg',img2,img3
  ],
  };

  const rooms = [
  {
    id: 1,
    name: "CĂN BỒN TẮM GỖ",
    image: img2,
    imageCount: "1/17",
    guests: 2,
    beds: 1,
    children: 0,
    size: "25 m²",
    bedType: "Queen-size",
    price: "3,674,430",
    priceOriginal: "3,951,000",
    nights: 7,
    roomsLeft: 2,
    promotions: ["SALE OFF", "1WEEKOFF"],
    discountText: "1WEEKOFF (-₫276,570)",
    policy: [
      "Full payment is required on the day of booking.",
      "Free cancellation if you cancel 5 days before check-in. After that, 50% fee."
    ]
  },
  // Add more rooms here...
];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/search-results", {
      state: {
        checkIn,
        checkOut,
        room,
        adults,
        children,
      },
    });
  };

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerPadding: "250px",
    centerMode: true,
  
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div>
      <button className="home-button" onClick={handleHomeClick}>
        Về trang chủ
      </button>
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="section dates">
          <div className="date-header">
            <label>Ngày</label>
            <span className="nights">
              {getNights()} Đêm{getNights() > 1 ? "" : ""}
            </span>
          </div>
          <div className="date-display">
            <div>
              <span className="date-number">{new Date(checkIn).getDate()}</span>
              <div className="date-info">
                <small>
                  {new Date(checkIn).toLocaleString("vi-VN", {
                    month: "short",
                  })}
                </small>
                <small>{new Date(checkIn).getFullYear()}</small>
              </div>
            </div>
            <div>
              <span className="date-number">
                {new Date(checkOut).getDate()}
              </span>
              <div className="date-info">
                <small>
                  {new Date(checkOut).toLocaleString("vi-VN", {
                    month: "short",
                  })}
                </small>
                <small>{new Date(checkOut).getFullYear()}</small>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <label>PHÒNG</label>
          <span className="value-display">{room}</span>
        </div>
        <div className="section">
          <label>NGƯỜI LỚN</label>
          <span className="value-display">{adults}</span>
        </div>
        <div className="section">
          <label>TRẺ EM</label>
          <span className="value-display">{children}</span>
        </div>
        <button type="submit">Tìm kiếm</button>
      </form>


    <div className="carousel-wrapper">
      <Slider {...settings}>
        {propertyData.images.map((src, i) => (
          <div key={i} className="carousel-slide">
            <div className="image-wrapper">
              <img src={src} alt={`Slide ${i}`} />
            </div>
          </div>
        ))}
      </Slider>
        {/* PHẦN THÔNG TIN BÊN DƯỚI */}
        <div className="carousel-info">
          <h3 className="carousel-title">{propertyData.name}</h3>
          <div className="carousel-stars"> {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`star ${i < propertyData.rating ? "filled" : ""}`} />
            ))}</div>
          <div className="carousel-address">
            🗺️ {propertyData.address}
          </div>
        </div>
    </div>
    <div>
      {rooms.map((room) => (
        <RoomCard key={room.id} data={room} />
      ))}
    </div>

    </div>
  );
};

export default SearchResults;
