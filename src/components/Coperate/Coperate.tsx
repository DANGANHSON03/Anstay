import React from 'react'
import './Coperate.css';
import { Link } from 'react-router-dom';

const partners = [
    { name: "DAEWOO E&C", 
      logo: "https://wikiland.vn/wp-content/uploads/don-vi-xay-dung/daewoo-ec/logo-daewoo-e-c.png",
      website:"https://daewooencvina.vn/"
    },
    { name: "Vinhomes",
     logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Vinhomes.png",
     website:"https://vinhomes.vn/"},
    { name: "Tân Hoàng Minh",
     logo: "https://lh5.googleusercontent.com/proxy/SRAMqkkbG03SlMv3qasKT6m66VNmu6DznlUR8RiYHUapJeo84iqqwzkJ9F9GuyAPAIfRNJYkRC0Tyzig-NjDgBca-LfytyRxVhEuM_Ynmi4Q_9Yq2x6f93EGUukE5ZXbeQ",
     website:"https://tanhoangminhgroup.com/"},
  ];
  
  const bookingPlatforms = [
    { 
     name: "Agoda",
     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Agoda_logo_2019.svg/1024px-Agoda_logo_2019.svg.png",
     website:"https://www.agoda.com/"
    },

    { 
     name: "Expedia",
     logo: "https://cdn.freebiesupply.com/logos/thumbs/2x/expedia-logo.png",
     https:"https:/www.expedia.com.vn/"
    },

    { 
    name: "Booking.com",
    logo: "https://logowik.com/content/uploads/images/252_booking_logo.jpg",
    website:"https://www.booking.com"
     },

    { 
    name: "Airbnb", 
    logo: "https://cdn.freebiesupply.com/logos/large/2x/airbnb-2-logo-png-transparent.png",
    website:"https://www.airbnb.com/"
    },
  ];
 
  

const Coperate = () => {
  return (
    <div className='coperate-container'>
      <h1 className="coperate-title">Giới thiệu đối tác & khách hàng</h1>

      {/* Chủ đầu tư */}
      <div className="coperate-section">
        <h2 className="coperate-subtitle">Các chủ đầu tư lớn:</h2>
        <ul className="coperate-list">
          <li>THT Development Co., Ltd.</li>
          <li>Vinhomes</li>
          <li>Tân Hoàng Minh</li>
        </ul>
        <div className="coperate-image-grid">
          {partners.map((partner) => (
           <a href={partner.website} target="_blank">
            <img key={partner.name} src={partner.logo} alt={partner.name} className="partner-logo" />
         </a>  
          ))}
        </div>
      </div>

      {/* Nền tảng đặt phòng */}
      <div className="coperate-section">
        <h2 className="coperate-subtitle">Các nền tảng đặt phòng trực tuyến:</h2>
        <ul className="coperate-list">
          <li>Agoda, Booking.com</li>
          <li>Airbnb</li>
          <li>Expedia</li>
        </ul>
        <div className="coperat-image-grid">
          {bookingPlatforms.map((platform) => (
            <a href={platform.website} target="_blank" >
                <img key={platform.name} src={platform.logo} alt={platform.name} className="partner-logo" />
            </a>
            
          ))}
        </div>
      </div>

      {/* Khách hàng */}
      <div className="coperate-section">
        <h2 className="coperate-subtitle">Khách hàng doanh nghiệp & cá nhân:</h2>
        <ul className="coperate-list">
          <li>Chuyên gia nước ngoài, khách du lịch cao cấp.</li>
        </ul>
      </div>
    </div>    
  )
}

export default Coperate;
     