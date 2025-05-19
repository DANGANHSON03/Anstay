import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchResults.css";
import img2 from "../../assets/Images/N009585.jpg";
import img3 from "../../assets/Images/N009586.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoomCard from "../../components/RoomCard/RoomCard";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [checkIn, setCheckIn] = useState("2025-05-10");
  const [checkOut, setCheckOut] = useState("2025-05-11");
  const [room, setRoom] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const locationParam = searchParams.get("location") || "";
      const checkInParam = searchParams.get("checkIn");
      const checkOutParam = searchParams.get("checkOut");
      const roomParam = searchParams.get("room");
      const adultsParam = searchParams.get("adults");
      const childrenParam = searchParams.get("children");

      console.log("Search Parameters:", {
        location: locationParam,
        checkIn: checkInParam,
        checkOut: checkOutParam,
        room: roomParam,
        adults: adultsParam,
        children: childrenParam,
      });

      // Update state with URL parameters
      if (checkInParam) setCheckIn(checkInParam);
      if (checkOutParam) setCheckOut(checkOutParam);
      if (roomParam) setRoom(Number(roomParam));
      if (adultsParam) setAdults(Number(adultsParam));
      if (childrenParam) setChildren(Number(childrenParam));

      try {
        const response = await fetch(
          `http://localhost:8085/api/apartments/search?name=${locationParam}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API Response Data:", data);
        setSearchResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  const getNights = () => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = (outDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24);
    return diff;
  };

  const propertyData = searchResults[0]
    ? {
        name: searchResults[0].name,
        rating: searchResults[0].description,
        address: searchResults[0].location,
        images: searchResults[0].images.map((img) => img.imageUrl) || [],
      }
    : {
        name: "",
        rating: 0,
        address: "",
        images: [],
      };

  const rooms = searchResults.map((result) => {
    console.log("Description data:", result.description);
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      image: result.images[0]?.imageUrl || img2,
      imageCount: `1/${result.images.length}`,
      guests: result.maxAdults || 2,
      beds: result.max_bed || 1,
      children: result.maxChildren || 0,
      size: result.acreage ? `${result.acreage} m²` : "chưa rõ",
      bedType: "Queen-size",
      price: result.pricePerDay?.toLocaleString() || "",
      priceOriginal: result.pricePerMonth?.toLocaleString() || "",
      nights: getNights(),
      roomsLeft: Number(result.numRooms) || 1,
      promotions: result.discountPercent > 0 ? ["SALE OFF"] : [],
      discountText:
        result.discountPercent > 0 ? `Discount ${result.discountPercent}%` : "",
      policy: [
        "Full payment is required on the day of booking.",
        "Free cancellation if you cancel 5 days before check-in. After that, 50% fee.",
      ],
      name_room: result.name_apartment,
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/search-results", {
      state: {
        id,
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
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div>
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
              <span className="date-number">
                {checkIn ? new Date(checkIn).getDate() : ""}
              </span>
              <div className="date-info">
                <small>
                  {checkIn
                    ? new Date(checkIn).toLocaleString("vi-VN", {
                        month: "short",
                      })
                    : ""}
                </small>
                <small>{checkIn ? new Date(checkIn).getFullYear() : ""}</small>
              </div>
            </div>
            <div>
              <span className="date-number">
                {checkOut ? new Date(checkOut).getDate() : ""}
              </span>
              <div className="date-info">
                <small>
                  {checkOut
                    ? new Date(checkOut).toLocaleString("vi-VN", {
                        month: "short",
                      })
                    : ""}
                </small>
                <small>
                  {checkOut ? new Date(checkOut).getFullYear() : ""}
                </small>
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
          <h3 className="carousel-title">{searchParams.get("location")}</h3>

          <div className="carousel-address">🗺️ {propertyData.address}</div>
          <div className="carousel-address">💬 {propertyData.rating}</div>
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
