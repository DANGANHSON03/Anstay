import React from "react";
import { Tabs, Card } from "antd";
import "./TravelDescription.css";

const { TabPane } = Tabs;

const tourData = {
  id: 1,
  title: "Du lịch Hạ Long 3 ngày 2 đêm",
  time: "3 ngày 2 đêm",
  transportation: "Xe bus + Du thuyền",
  hotel: "Hạ Long Plaza Hotel 5*",
  price: 2500000,
  description:
    "Hạ Long là điểm đến nổi tiếng với vẻ đẹp kỳ vĩ của hàng nghìn hòn đảo đá vôi và hang động tuyệt đẹp. Tour du lịch Hạ Long 3 ngày 2 đêm sẽ đưa bạn khám phá Vịnh Hạ Long - Di sản thiên nhiên thế giới được UNESCO công nhận, trải nghiệm đêm nghỉ trên du thuyền sang trọng, thưởng thức hải sản tươi ngon và tham gia nhiều hoạt động thú vị như chèo thuyền kayak, tập tai chi buổi sáng trên boong tàu, học nấu ăn món ăn Việt Nam...",
  highlights: [
    "Ngắm bình minh và hoàng hôn tuyệt đẹp trên Vịnh Hạ Long",
    "Khám phá hang Sửng Sốt - một trong những hang động đẹp nhất vịnh",
    "Leo núi và ngắm toàn cảnh vịnh từ đỉnh đảo Ti Tốp",
    "Trải nghiệm đêm nghỉ trên du thuyền 5 sao giữa vịnh",
    "Học nấu các món ăn truyền thống Việt Nam",
    "Thưởng thức buffet hải sản tươi ngon",
    "Tham gia hoạt động chèo thuyền kayak khám phá các hang động",
  ],
  images: [
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
    "https://images.unsplash.com/photo-1573146500785-c0244c0daae3",
    "https://images.unsplash.com/photo-1528127269322-539801943592",
  ],
  itinerary: [
    {
      day: "NGÀY 01",
      title: "HÀ NỘI - HẠ LONG",
      activities: [
        {
          time: "07:30",
          description:
            "HDV đón quý khách tại điểm hẹn khởi hành đi Hạ Long. Dừng chân nghỉ ngơi tại Hải Dương.",
        },
        {
          time: "11:30",
          description: "Đến Hạ Long, làm thủ tục lên du thuyền, nhận phòng.",
        },
        {
          time: "13:00",
          description:
            "Dùng bữa trưa trên tàu với các món hải sản tươi ngon. Tàu đưa quý khách thăm hang Sửng Sốt.",
        },
        {
          time: "16:30",
          description:
            "Tham gia hoạt động chèo thuyền kayak hoặc tắm biển tại bãi biển Ti Tốp.",
        },
      ],
    },
    {
      day: "NGÀY 02",
      title: "HẠ LONG - VỊNH LAN HẠ",
      activities: [
        {
          time: "06:00",
          description: "Tập Tai Chi trên boong tàu, ngắm bình minh trên vịnh.",
        },
        {
          time: "07:30",
          description: "Ăn sáng và khởi hành thăm Vịnh Lan Hạ.",
        },
        {
          time: "11:00",
          description: "Học nấu ăn món ăn truyền thống Việt Nam với đầu bếp.",
        },
      ],
    },
    {
      day: "NGÀY 03",
      title: "HẠ LONG - HÀ NỘI",
      activities: [
        {
          time: "07:00",
          description: "Dùng điểm tâm sáng, trả phòng.",
        },
        {
          time: "09:30",
          description:
            "Tham quan làng chài Cửa Vạn, tìm hiểu đời sống ngư dân.",
        },
        {
          time: "11:30",
          description: "Trả phòng, dùng bữa trưa và khởi hành về Hà Nội.",
        },
      ],
    },
  ],
};

const TravelDescription = () => {
  return (
    <div className="travel-container">
      <Tabs defaultActiveKey="1" className="custom-tabs">
        <TabPane
          tab={<button className="tab-button active">Mô Tả</button>}
          key="1"
        >
          <Card className="travel-card">
            <h2 className="title">{tourData.title}</h2>
            <p>{tourData.description}</p>

            <h3>Lịch Trình Chi Tiết:</h3>
            {tourData.itinerary.map((day, index) => (
              <div key={index} className="day-itinerary">
                <h4 className="day-title">
                  {day.day} | {day.title}
                </h4>
                {day.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="activity">
                    <strong>{activity.time}</strong>: {activity.description}
                  </div>
                ))}
              </div>
            ))}
          </Card>
        </TabPane>
        <TabPane
          tab={<button className="tab-button">Bình Luận</button>}
          key="2"
        >
          <Card className="travel-card">
            <p>Phần bình luận sẽ được cập nhật...</p>
          </Card>
        </TabPane>
        <TabPane
          tab={<button className="tab-button">Ảnh Nổi Bật</button>}
          key="3"
        >
          <Card className="travel-card">
            <div className="gallery-grid">
              {tourData.images.map((image, index) => (
                <img key={index} src={image} alt={`Tour image ${index + 1}`} />
              ))}
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TravelDescription;
