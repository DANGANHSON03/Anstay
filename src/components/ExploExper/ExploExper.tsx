import React from "react";
import "./ExploExper.css";
import Review from "../Review/Review"; 
import { RightOutlined } from "@ant-design/icons";


const categories = [
  { title: "Family Gatherings & More", image: "https://cache.marriott.com/is/image/marriotts7prod/pdt-Family-enjoying-breakfast-478950141904961:Classic-Ver?wid=380&fit=constrain, https://cache.marriott.com/is/image/marriotts7prod/pdt-Family-enjoying-breakfast-478950141904961:Classic-Ver?wid=760&fit=constrain 2x" },
  { title: "Food & Drink", image: "https://cache.marriott.com/is/image/marriotts7prod/pdt-JW-Orlando-Dessert-Table2-985558347887442" },
  { title: "Spaces & Venues", image: "https://cache.marriott.com/is/image/marriotts7prod/pdt-B2B-JW-Marriott-41-314154048289847" }
 
];
const categories2 = [
    { title: "Destinations", image: "https://cache.marriott.com/is/image/marriotts7prod/pdt-B2B-NY-Rooftop-Bar-882786605428890" },
    { title: "Accommodations", image: "https://cache.marriott.com/is/image/marriotts7prod/pdt-Sarasota-family-room42237-169963514665836" },
]  

const ExploExper: React.FC = () => {
  return (
    <>
    <div className="event-container">
      {/* Phần giới thiệu */}
      <div className="event-header">
        <h2>Explore Social Events</h2>
        <p>Get insider info with us. Make the most of your next gathering.</p>
      </div>

      {/* Phần chính (Hình lớn + mô tả) */}
      <div className="event-main">
        <div className="event-info">
          <h3>Plan Your Social Event</h3>
          <p>
            Mix, mingle, and maximize. From vacations to business meetups, let
            us handle all of your event-planning needs.
          </p>
          <button className="learn-more-btn">Learn More</button>
        </div>
        <img src="https://cache.marriott.com/is/image/marriotts7prod/pdt-JW-Orlando-Parents-P99094-169177196938976:Wide-Hor?wid=670&fit=constrain" alt="Main Event" className="main-image" />
      </div>

      {/* Lưới danh mục sự kiện */}
      <div className="event-grid">
        {categories.map((category, index) => (
          <div key={index} className="event-card">
            <img src={category.image} alt={category.title} className="event-card-1"/>
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
    </div>
    <Review />
    </>
  );
};

export default ExploExper;