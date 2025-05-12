import React from 'react'
import { useState,useEffect } from 'react'
import './Slide.css'


const images = [
  "https://i.ibb.co/WNqjq4qy/N009584.jpg", 
  "https://i.ibb.co/wN4qSSGC/N009584.jpg",
  "https://i.ibb.co/1GjTbNzD/v-nh-H-Long.jpg",
];

const Slide= () => {
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
            <button className="btn primary">Xem Tours →</button>
            <button className="btn secondary">Xem Căn Hộ →</button>
          </div>
        </div>

        <div className="scroll-controls">
          <button className="scroll-btn" onClick={goPrev}>↑</button>
            <div className="scroll-line">
                {images.map((_, index) => (
                    <div
                key={index}
                className={`scroll-segment ${currentIndex === index ? "active" : ""}`}
                ></div>
            ))}
          </div>
          <button className="scroll-btn" onClick={goNext}>↓</button>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default Slide
