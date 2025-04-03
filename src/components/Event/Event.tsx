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
      src: "https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/487930387_639276562321882_8753357597979277867_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEY9Cofrn-SXUpzhVb3YfGqvvLEWWyc-1m-8sRZbJz7WXP3JG0KJN3X_FH3y9h1V-jeZk9lo8DtsK3JVIhQ__K6&_nc_ohc=N3OhOtEkeOAQ7kNvgHQVhh5&_nc_oc=AdmolxP3ZuokkoVlagDASqg9uWkJN9icSZk7-P5oqZKBZkO0slNy7Ur4MTynpW8F5To&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=h2lY-G7Y82ps3yUq_PKHGw&oh=00_AYGytIPmPlqHfNSKbK5XxqjavfCSC5tzldn8aJsZi0nSKQ&oe=67F41526",
      name: "Event1",
    },
    {
      src: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/487827844_639278792321659_8640400731840140481_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeErLatFe4OVV8_KYh-QmzC106xVKOrJtzLTrFUo6sm3MnBZo4jq4G9LLPMAgeWURbzfQ0t-3Bl3c4dHEB0C9HCz&_nc_ohc=uTnDCabKwIEQ7kNvgHo5yrW&_nc_oc=AdmiaQXlfw-3n2fXzdgaWX8FUE2saCwGP6YqVjDMbKF7VRpYuSPEIQdAKGtdY08Li7M&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=tPIuaxmZAVJACiV3dGaNlg&oh=00_AYHnEKbYpXJ9AbDE4dRk0VUPQnRPT_cw_kD6-pvf-Mcdlg&oe=67F41F50",
      name: "Event2",
    },
    {
      src: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/487819026_639278025655069_4071798293894084331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEcNDT6UMdUaI2ywzimnF7KFBGhctA9fp0UEaFy0D1-nfhwUDUUTEVhMOGbI8HTNA-KjnM6ytBbHhcy-sZvyfey&_nc_ohc=q1DtC1Nu1a8Q7kNvgGsAEPm&_nc_oc=AdloyJK53_nSJaxCYDre1c8y0_nLFuMJNoywFCYKZEb59bt2Wz5MU8CRy_3Emg0kjck&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=hK4OGCd1z_bJ7V2XsllYhg&oh=00_AYGJTKAbKEkYzqFGysoiYDsPBAk2zQ32Epy4zXgy1_gKUQ&oe=67F43303",
      name: "Event3",
    },
    {
      src: "https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/487504436_639271108989094_4191569452573018419_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHzhrastNIfzH_7E4SmtaJL9JuX5CLi2u70m5fkIuLa7rHDrQ1Fgz-WVpBocGzR-_zlXe7P9PP5g9bRYrkzg_KD&_nc_ohc=Kmn9N7pY6aAQ7kNvgHW1M09&_nc_oc=Adk6hRxe1u63Um2JyrgKne1Cd88CoJCEFwZHozfYkgOaB3R2uB3PMq-E1yU16Yf3kds&_nc_zt=23&_nc_ht=scontent.fsgn5-11.fna&_nc_gid=2lo11LBlXLtkqRI6sNDPTQ&oh=00_AYH16ERExpOqSsTHXS685ISWRnjS1agntmu1spaaGOgL4A&oe=67F3FFB9",
      name: "Event4",
    }, // xóa dấu phẩy thừa
  ];

  const handleGoToEvent = () => {
    const eventName = images[currentIndex].name;
    navigate("/tour");
  };

  return (
    <div className="event-wrapper">
      <div className="event-container">
        <div className="event-title-main">
          <h2>Sự kiện nổi bật</h2>
          <p>Một số sự kiện nổi bật mà bạn có thể tham khảo</p>
        </div>

        <Carousel
          ref={carouselRef}
          slidesToShow={window.innerWidth <= 480 ? 1 : 3} // Show 1 image for max-width 480px
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
