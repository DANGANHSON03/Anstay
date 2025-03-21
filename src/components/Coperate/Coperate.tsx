import React from 'react';
import './Coperate.css';

interface Partner {
  name: string;
  logo: string;
  website: string;
}

const partners: Partner[] = [
  { name: "DAEWOO E&C", logo: "https://wikiland.vn/wp-content/uploads/don-vi-xay-dung/daewoo-ec/logo-daewoo-e-c.png", website: "https://daewooencvina.vn/" },
  { name: "Vinhomes", logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Vinhomes.png", website: "https://vinhomes.vn/" },
  { name: "Tân Hoàng Minh", logo: "https://bachkhoaland.com/wp-content/uploads/2022/06/tan-hoang-minh-1.png", website: "https://tanhoangminhgroup.com/" }
];

const bookingPlatforms: Partner[] = [
  { name: "Agoda", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Agoda_logo_2019.svg/1024px-Agoda_logo_2019.svg.png", website: "https://www.agoda.com/" },
  { name: "Expedia", logo: "https://cdn.freebiesupply.com/logos/thumbs/2x/expedia-logo.png", website: "https://www.expedia.com.vn/" },
  { name: "Booking.com", logo: "https://logowik.com/content/uploads/images/252_booking_logo.jpg", website: "https://www.booking.com" },
  { name: "Airbnb", logo: "https://cdn.freebiesupply.com/logos/large/2x/airbnb-2-logo-png-transparent.png", website: "https://www.airbnb.com/" }
];

const Coperate: React.FC = () => {
  return (
    <div className="coperate-container">
      <h1 className="coperate-title">Giới thiệu đối tác & khách hàng</h1>

      {/* Chủ đầu tư */}
      <div className="coperate-section">
        <h2 className="coperate-subtitle">Các chủ đầu tư lớn:</h2>
        <div className="coperate-grid">
          {partners.map((partner) => (
            <a key={partner.name} href={partner.website} target="_blank" rel="noopener noreferrer" className="partner-card">
              <img src={partner.logo} alt={partner.name} className="partner-logo" />
              <p>{partner.name}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Nền tảng đặt phòng */}
      <div className="coperate-section">
        <h2 className="coperate-subtitle">Các nền tảng đặt phòng trực tuyến:</h2>
        <div className="coperate-grid">
          {bookingPlatforms.map((platform) => (
            <a key={platform.name} href={platform.website} target="_blank" rel="noopener noreferrer" className="partner-card">
              <img src={platform.logo} alt={platform.name} className="partner-logo" />
              <p>{platform.name}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Khách hàng */}
      <div className="coperate-section">
        <h2 className="coperate-subtitle">Khách hàng doanh nghiệp & cá nhân:</h2>
        <p className="customer-info">Chuyên gia nước ngoài, khách du lịch cao cấp.</p>
      </div>
    </div>
  );
};

export default Coperate;