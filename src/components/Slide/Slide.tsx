import React from "react";
import { useState, useEffect } from "react";
import "./Slide.css";
import img1 from "../../assets/Images/N009584.jpg";
import img2 from "../../assets/Images/N009585.jpg";
import img3 from "../../assets/Images/N009586.jpg";

const images = [img1, img2, img3];

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="slider-container">
      <div
        className="slider-image"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="slider-dark-overlay">
          <div className="slider-overlay">
            <p className="slider-subtitle">Chào Mừng Bạn Đến Với ANSTAY</p>
            <h1 className="slider-title">
              Hãy Để Chúng Tôi Giúp Bạn Có Một
              <br />
              Kỳ Nghỉ Đáng Nhớ
            </h1>
            <div className="slider-buttons">
              <button className="btn primary">Xem Căn Hộ →</button>
            </div>
          </div>

          <div className="scroll-controls">
            <button className="scroll-btn" onClick={goPrev}>
              ↑
            </button>
            <div className="scroll-line">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`scroll-segment ${
                    currentIndex === index ? "active" : ""
                  }`}
                ></div>
              ))}
            </div>
            <button className="scroll-btn" onClick={goNext}>
              ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
