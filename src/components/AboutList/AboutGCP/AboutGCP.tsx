import React from 'react';
import { ArrowRight } from "lucide-react";
import './AboutGCP.css'
const AboutGCP = () => {
    const companyInfo = {
        name: "Công ty ISN",
        established: "2010",
        business: "Môi giới bất động sản",
        headquarters: "Hà Nội, Việt Nam",
        offices: "Hồ Chí Minh, Hải Phòng, Tokyo",
        website: "#", 
      };
  return (
    <div>
        <div className="aboutgcp">
            <div className="banner">
            <div className="banner-img">
                <img src="https://crm.flesta.vn//uploads/about_us/Group-Companies.png" alt="" />
                <div className="banner-des">Nhóm công ty</div>
            </div>
            </div>
            <div className="company-card">
            <div className="header1">
                <h2 className="company-name">{companyInfo.name}</h2>
             
            
            </div>
                <div className="info-grid">
                    <div className="label">Thành lập :</div> <div>{companyInfo.established}</div>
                    <div className="label">Kinh doanh :</div> <div>{companyInfo.business}</div>
                    <div className="label">Trụ sở chính :</div> <div>{companyInfo.headquarters}</div>
                    <div className="label">Văn phòng kinh doanh :</div> <div className="bold">{companyInfo.offices}</div>
                </div>
            </div>
    </div>
    <div className="company-info">
      {/* Tiêu đề */}
      <h2 className="title">THÔNG TIN CHUNG CỦA ISN</h2>

      {/* Nội dung */}
      <p>
        Là công ty với 10 năm kinh nghiệm trong cung cấp dịch vụ bất động sản cho người Nhật tại Việt Nam. Có trụ sở chính tại Hà Nội và các chi nhánh tại Hải Phòng, Tp.HCM và Tokyo, Nhật Bản ~
      </p>
      <p>
        Nguồn nhân lực chất lượng cao, giàu kinh nghiệm, thông thạo tiếng Nhật, tiếng Anh, am hiểu văn hóa Nhật Bản và thị trường căn hộ cho thuê tại Việt Nam.
      </p>
      <p>
        Cung cấp dịch vụ môi giới cho thuê căn hộ, văn phòng và mặt bằng thương mại chất lượng cao với thương hiệu vietnamhousing.vn - Đầu tư và phát triển thương hiệu căn hộ dịch vụ ISN Home và thương hiệu văn phòng dịch vụ ISN Office.
      </p>
      <p>
        Mô hình quản lý hiện đại, chất lượng dịch vụ cao, trang thiết bị chuyên nghiệp, đáp ứng mọi tiêu chuẩn của khách hàng Nhật Bản.
      </p>
      <p>
        Môi giới, giới thiệu thành công cho hơn 1.000 khách hàng Nhật Bản mỗi năm, khách hàng trung và cao cấp chiếm 80% (khách hàng có ngân sách thuê từ 1.500 USD / tháng trở lên).
      </p>
      <p>
        Phần lớn khách hàng thân thiết chủ yếu là các tổ chức, công ty lớn của Nhật Bản, với số lượng lớn chuyên gia sang Việt Nam liên tục.
      </p>
      <p>
        Bộ phận chăm sóc khách hàng riêng biệt dành cho khách hàng Nhật Bản, đường dây nóng 24/7, mang đến sự tin tưởng và hài lòng cho khách hàng.
      </p>
      <p>
        Kinh nghiệm quản lý và môi giới độc quyền thành công tại một số dự án căn hộ dịch vụ cao cấp: Dolphin Plaza, Super Hotel Candle, Hoàng Thành Tower và căn hộ tại các dự án Vinhomes (Times City, Royal City).
      </p>
    </div>
    </div>
  )
}

export default AboutGCP
