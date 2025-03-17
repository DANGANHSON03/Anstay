import React from "react";
import "./Event.css";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: "https://dimg04.tripcdn.com/images/0a12012000imsyq8b46A5.png",
      name: "Event1",
    },
    {
      src: "https://dimg04.tripcdn.com/images/0a11z12000ix3oemyEA51.jpg",
      name: "Event2",
    },
    {
      src: "https://dimg04.tripcdn.com/images/0a10j12000ixpxp4506FE.png",
      name: "Event3",
    },
    {
      src: "https://dimg04.tripcdn.com/images/0a14v12000imz2x9tFD6C.png",
      name: "Event4",
    }, // xóa dấu phẩy thừa
  ];

  const handleGoToEvent = () => {
    const eventName = images[currentIndex].name;
    navigate(`/event?name=${eventName}`);
  };

  return (
    <div className="event-wrapper">
      <div className="event-container">
        <div className="event-title-main">
          <h2>Sự kiện nổi bật</h2>
          <p>Một số sự kiện nổi bật mà bạn có thể tham khả</p>
        </div>

        <Carousel
          ref={carouselRef}
          slidesToShow={3}
          centerMode={false}
          infinite={true}
          dots={true}
          beforeChange={(from, to) => setCurrentIndex(to)}
        >
          {images.map((item, index) => (
            <div key={index} className="event-slide">
              <img
                src={item.src}
                alt={item.name}
                className="event-image"
                onClick={handleGoToEvent}
              />
            </div>
          ))}
        </Carousel>

        <Button
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => carouselRef.current.prev()}
          className="nav-button nav-button-prev"
        />

        <Button
          type="primary"
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => carouselRef.current.next()}
          className="nav-button nav-button-next"
        />
      </div>
    </div>
  );
};

export default Event;
