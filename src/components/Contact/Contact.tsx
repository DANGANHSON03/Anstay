import React from "react";
import { Form, Input, Button } from "antd";
import "./contact.css";

const Contact: React.FC = () => {
  return (
    <div className="main-contact">
      <div className="img-contact">
        <img
          src="https://i.ibb.co/7drwxYbK/35250.jpg"
          alt="img-contact"
          className="img-back-contact"
        />
      </div>
      <div className="form-contact">
        <div className="contact-left">
          <h1>Liên hệ</h1>
          <div className="text-contact">
            <p>ANSTAY RESIDENCE</p>
            <p>Địa chỉ : Tòa Star Lake DeaWoo, khu đô thị Tây Hồ Tây, Hà Nội</p>
            <p>Số điện thoại : 0916612772</p>
            <p>Email : anstayresidence@gmail.com</p>
          </div>
        </div>
        <div className="contact-right">
          <Form layout="vertical" className="custom-form">
            <Form.Item name="name">
              <Input placeholder="Họ và Tên" />
            </Form.Item>
            <Form.Item name="phone">
              <Input placeholder="SĐT" />
            </Form.Item>
            <Form.Item name="email">
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item name="address">
              <Input placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item name="hobbies">
              <Input placeholder="Sở thích" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="send-button">
                GỬI TIN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
