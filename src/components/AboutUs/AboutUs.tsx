import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import { CircleChevronRight } from 'lucide-react';

const AboutUs =( )=>{
    const items = [
        { title: "Blue Kites Invest ", image: "https://crm.flesta.vn//uploads/about_us/ISN-JUTEC.png", link: "/about-us/company" },
        { title: "Nhóm Công Ty", image: "https://crm.flesta.vn//uploads/about_us/Group-Companies.png", link: "/about-us/groupcompany" },
        { title: "Vật Liệu Nhà Ở", image: "https://crm.flesta.vn//uploads/about_us/1654495624-629d99883bc28.jpg", link: "#" },
        { title: "Liên Hệ", image: "https://crm.flesta.vn//uploads/about_us/Contact-Us.png", link: "#" }
      ];
    
    return(
        <div className="container">
            {
                items.map((item,index)=>(
                    <Link to={item.link} className="item">
                        <img src={item.image} alt="" />
                        <div className="description">{item.title} <CircleChevronRight size={36} className="icon" /></div>
                    </Link>
                ))
            }
        </div>
    )
}
export default AboutUs;