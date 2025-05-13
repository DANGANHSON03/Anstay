import React from "react";
import "./RoomCard.css";
import { FaUser, FaBed, FaChild, FaRulerCombined, FaTag } from "react-icons/fa";

const RoomCard = ({ data }) => {
  return (
    <div className="room-card">
      <div className="name-card">
          <h3 className="room-title">{data.name}</h3>
      </div>
      <div className="body-card">
         <div className="room-info">
        <div className="room-image">
           
          <img src={data.image} alt={data.name} />
          <div className="room-image-count">{data.imageCount}</div>
        </div>

        <div className="room-details">
          
          <div className="room-icons">
            <span><FaUser /> x {data.guests}</span>
            <span><FaBed /> x {data.beds}</span>
            <span><FaChild /> x {data.children}</span>
          </div>
          <div className="room-size">
            <FaRulerCombined /> {data.size}
          </div>
          <div className="room-bed">{data.bedType}</div>
          <div className="room-see-more"> See more</div>
        </div>
      </div>
      <div className="room-pricing">
        <div className="room-icons compact">
          <h4>Standard Rate</h4>
          <div className="discount-tag">{data.discountText}</div>
          <div>
          <span><FaUser /> x {data.guests}</span>
          <span><FaBed /> x {data.beds}</span>
          <span><FaChild /> x {data.children}</span>
          </div>    
        </div>

        <div className="room-policy">
          <strong>Payment & Cancellation Policy:</strong>
          <ul>
            {data.policy.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="room-promotions">
          <strong>Other promotions and discounts:</strong>
          {data.promotions.map((promo, idx) => (
            <div className="badge purple" key={idx}><FaTag /> {promo}</div>
          ))}
        </div>  
      </div>
      <div className="room-price">
          <div>
            <div className="price">₫{data.price} <span>({data.nights} Nights)</span></div>
            <div className="price-strike">₫{data.priceOriginal}</div>
            <div className="room-left">{data.roomsLeft} rooms left</div>
          </div>

          <div className="room-actions">
            <div className="qty-control styled">
              <button>-</button>
              <input type="text" value="1" readOnly />
              <button>+</button>
            </div>
            <div className="btns">
              <button className="btn-select">SELECT</button>
              <button className="btn-book">BOOK NOW</button>
            </div>
          </div>
      </div>
      </div>
    </div>
  );
};

export default RoomCard;
