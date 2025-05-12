import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
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
    </div>
  );
};

export default SearchResults;
