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
    </div>
  )
}

export default AboutGCP
