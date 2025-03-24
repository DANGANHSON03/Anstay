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

const customers: Partner[] = [
  {
    name:"SamSung",logo:"https://ibrand.vn/wp-content/uploads/2024/08/dc36c1d02dfe2ec192b7ec6d2289cb2d-1.png",website:"http://samsung.com/vn/offer/megasale/?cid=vn_pd_ppc_google_vd+da-promotion_always-on_ALON-IMCE-D2C-AWO-MAR2025-HOS_search-text-ads_734693528377-samsung%20com%20vn-b-SSFesawo_none_pfm_3rd-Party-Targeting_conversion_brand-generic_keywords&utm_source=google&utm_medium=search&utm_campaign=ALON-IMCE-D2C-AWO-MAR2025-HOS&utm_term=Hot&utm_content=none&gclid=Cj0KCQjwhYS_BhD2ARIsAJTMMQYrrY9TFlLSAQ41TZCHydFzqB6Sev8zoIGpEf2j1OPBdZ4IklJvrDwaArQYEALw_wcB"
  },
  {
    name:"LG",logo:"https://images.squarespace-cdn.com/content/v1/502a8efb84ae42cbccf920c4/1585574686746-VCDIHSO21O76WR72WIAD/LG-Logo.png",website:"https://www.lg.com/vn/dieu-hoa/?ec_model_status_code=ACTIVE&sortCriteria=%40ec_spotlights_order_no+descending%2C%40ec_stock_status+ascending%2C%40ec_model_release_date+descending&utm_source=google-ads&utm_medium=cpc&utm_campaign=HQ-ES-SEM_ES_RAC_VN_AO_NA_CNS_PSE_consideration_BRA_VI_lg.com_NA_BM_tCPA_BCL_google-ads_AO&utm_content=20250214_Generic_NA_BCL&utm_term=NA&gad_source=1&gclid=Cj0KCQjwhYS_BhD2ARIsAJTMMQZxEnV_qNgZuWhBBgwn84cbj1MN2ym2zOO7YpyONKoXEJiE2CHXZHoaAhkYEALw_wcB"
  }
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
        <div className="coperate-grid">
          {customers.map((platform) => (
            <a key={platform.name} href={platform.website} target="_blank" rel="noopener noreferrer" className="partner-card">
              <img src={platform.logo} alt={platform.name} className="partner-logo" />
              <p>{platform.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coperate;