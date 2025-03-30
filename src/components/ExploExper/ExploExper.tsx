import React from "react";
import "./ExploExper.css";
import Review from "../Review/Review"; 
import { RightOutlined } from "@ant-design/icons";


const categories = [
  { title: "Các buổi gặp gỡ gia đình", image: "https://cache.marriott.com/is/image/marriotts7prod/pdt-Family-enjoying-breakfast-478950141904961:Classic-Ver?wid=380&fit=constrain, https://cache.marriott.com/is/image/marriotts7prod/pdt-Family-enjoying-breakfast-478950141904961:Classic-Ver?wid=760&fit=constrain 2x" },
  { title: "Thức ăn và đồ uống", image: "https://www.kkday.com/vi/blog/wp-content/uploads/ban-do-am-thuc-ha-long-3.jpg" },
  { title: "Không gia và địa điểm", image: "https://zeimydinh.com/wp-content/uploads/2020/12/tien-ich-a-la-carte-ha-long-1.jpg" }
 
];
const categories2 = [
    { title: "Điểm đến", image: "https://sonhailimousine.com/upload/filemanager/dia-diem-du-lich-ha-long%20(20).png" },
    { title: "Chỗ ở", image: "https://quangninhtop.com/wp-content/uploads/2023/09/Alacarte-Ha-Long-2.webp" },
]  

const ExploExper: React.FC = () => {
  return (
    <>
    <div className="event-container2 ">
      {/* Phần giới thiệu */}
      <div className="event-header">
        <h2>Khám phá sự kiện xã hội</h2>
        <p>Nhận thông tin nội bộ cùng chúng tôi. Tận dụng tối đa buổi họp mặt tiếp theo của bạn.</p>
      </div>

      {/* Phần chính (Hình lớn + mô tả) */}
      <div className="event-main">
        <div className="event-info">
          <h3>Lên kế hoạch cho sự kiện xã hội của bạn</h3>
          <p>
          Kết hợp, giao lưu và tối đa hóa. Từ kỳ nghỉ đến các cuộc họp kinh doanh, hãy để chúng tôi xử lý mọi nhu cầu lập kế hoạch sự kiện của bạn.
          </p>
          <button className="learn-more-btn">Tìm hiểu thêm</button>
        </div>
        <img src="https://khachsanvietnam.com.vn/vnt_upload/news/08_2022/khach_san_Alacarte_da_nang_9.jpg" alt="Main Event" className="main-image" />
      </div>

      {/* Lưới danh mục sự kiện */}
      <div className="event-grid">
        {categories.map((category, index) => (
          <div key={index} className="event-card event-card-1">
            <img src={category.image} alt={category.title} />
            <div className="event-card-overlay">
              <h4>{category.title}</h4>
              <RightOutlined className="right-icon"/>
            </div>
          </div>
        ))}
      </div>
      {/* Hang danh muc su kien */}
      <div className="event-grid">
        {categories2.map((category, index) => (
          <div key={index} className="event-card  event-card-2">
            <img src={category.image} alt={category.title} />
            <div className="event-card-overlay">
              <h4>{category.title}</h4>
              <RightOutlined className="right-icon" />
            </div>
          </div>
        ))}
      </div> 
        <Review />
    </div>
 
    </>
  );
};

export default ExploExper;