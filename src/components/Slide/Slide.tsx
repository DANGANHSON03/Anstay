import React, { useRef } from 'react';
import { Carousel } from 'antd';
import './Slide.css';

const images = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
];

const Slide = () => {
    const carouselRef = useRef<Carousel>(null); // 👈 Khai báo kiểu dữ liệu đúng

    const next = () => {
      carouselRef.current?.next(); // 👈 Kiểm tra null trước khi gọi phương thức
    };
  
    const prev = () => {
      carouselRef.current?.prev();
    };

  return (
    <div className='slide-container'>
      <Carousel autoplay ref={carouselRef} dots={false}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img
              src={image}
              alt={`slide-${index}`}
              className="background-main"
            />
          </div>
        ))}
      </Carousel>
      <button className="custom-arrow custom-prev" onClick={prev}>
        ❮
      </button>
      <button className="custom-arrow custom-next" onClick={next}>
        ❯
      </button>
    </div>
  );
};

export default Slide;
