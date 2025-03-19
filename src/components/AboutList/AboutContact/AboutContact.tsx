import {useState,ChangeEvent,FormEvent}  from 'react'
import './AboutContact.css';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  message: string;
}
const AboutContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };
    
  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        {/* Left Column */}
        <div className="contact-left-column" style={{ flex: 1 }}>
          <div className="contact-left-content">
            <h2 className="contact-title">LIÊN HỆ VỚI CHÚNG TÔI</h2>
            {/* Facebook */}
            <div className="contact-social-item">
              <div className="social-image-container">
                <img
                  src="https://cinestar.com.vn/assets/images/ct-1.webp"
                  alt="Facebook"
                  className="social-image"
                />
              </div>
              <div className="social-textfb">Facebook</div>
            </div>
            {/* Zalo */}
            <div className="contact-social-item">
              <div className="social-text">Zalo</div>
              <div className="social-image-container">
                <img
                  src="https://cinestar.com.vn/assets/images/ct-2.webp"
                  alt="Zalo"
                  className="social-image"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="contact-right-column" style={{ flex: 1 }}>
          <h3 className="form-title">THÔNG TIN LIÊN HỆ</h3>
          <div className="contact-info">
            <p className="mb-2">📧 anstayresidence@gmail.com</p>
            <p className="mb-2">📞 09 1661 2772</p>
            <p>📍 Tòa Star Lake DeaWoo, khu đô thị Tây Hồ Tây, Hà Nội</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <div className="form-group">
              <div className="error-message">
                {errors.name && <p style={{margin:0}}>{errors.name.message}</p>}
              </div>
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Nhập tên của bạn"
                {...register("name", { required: "Tên không được để trống" })}
              />
              
            </div>
            <div className="form-group"> 
              <div className="error-message">
                {errors.email && <p style={{margin:0}}>{errors.email.message}</p>}
              </div>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Nhập email của bạn"
                {...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
             
            </div>
            <div className="form-group">  
              <div className="error-message">
                {errors.message && <p style={{margin:0}}>{errors.message.message}</p>}
              </div>
              <textarea
                rows={6}
                id="message"
                className="form-textarea"
                placeholder="Nhập thông tin liên hệ hoặc phản ánh"
                {...register("message", { required: "Vui lòng nhập nội dung" })}
              ></textarea>
            
            </div>
            <button type="submit" className="submit-button">
              <span className="button-text">GỬI NGAY</span>
              <div className="button-background" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


export default AboutContact;
