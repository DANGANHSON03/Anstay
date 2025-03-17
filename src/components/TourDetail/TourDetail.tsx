import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Row,
  Col,
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Modal,
} from "antd";
import "./TourDetail.css";
import TravelDescription from "../TravelDescription/TravelDescription";

const { Title, Text } = Typography;

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Giả lập dữ liệu tour, sau này sẽ lấy từ API dựa trên id
  const tourData = {
    id: 1,
    title: "Du lịch Hạ Long 3 ngày 2 đêm",
    time: "3 ngày 2 đêm",
    transportation: "Xe bus + Du thuyền",
    hotel: "Hạ Long Plaza Hotel 5*",
    price: 2500000,
    description:
      "Hạ Long là điểm đến nổi tiếng với vẻ đẹp kỳ vĩ của hàng nghìn hòn đảo đá vôi và hang động tuyệt đẹp. Tour du lịch Hạ Long 3 ngày 2 đêm sẽ đưa bạn khám phá Vịnh Hạ Long - Di sản thiên nhiên thế giới được UNESCO công nhận, trải nghiệm đêm nghỉ trên du thuyền sang trọng, thưởng thức hải sản tươi ngon và tham gia nhiều hoạt động thú vị như chèo thuyền kayak, tập tai chi buổi sáng trên boong tàu, học nấu ăn món ăn Việt Nam...",
    highlights: [
      "Ngắm bình minh và hoàng hôn tuyệt đẹp trên Vịnh Hạ Long",
      "Khám phá hang Sửng Sốt - một trong những hang động đẹp nhất vịnh",
      "Leo núi và ngắm toàn cảnh vịnh từ đỉnh đảo Ti Tốp",
      "Trải nghiệm đêm nghỉ trên du thuyền 5 sao giữa vịnh",
      "Học nấu các món ăn truyền thống Việt Nam",
      "Thưởng thức buffet hải sản tươi ngon",
      "Tham gia hoạt động chèo thuyền kayak khám phá các hang động",
    ],
    images: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
      "https://images.unsplash.com/photo-1573146500785-c0244c0daae3",
      "https://images.unsplash.com/photo-1528127269322-539801943592",
    ],
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === tourData.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? tourData.images.length - 1 : prev - 1
    );
  };

  const handleBooking = () => {
    navigate(`/booking`);
  };

  const showContactModal = () => {
    setIsContactModalVisible(true);
  };

  const handleContactSubmit = (values: any) => {
    console.log("Contact form values:", values);
    form.resetFields();
    setIsContactModalVisible(false);
  };

  return (
    <div className="tour-detail-container">
      <Row gutter={[24, 24]}>
        <Col span={14}>
          <div className="main-image-container">
            <img
              src={tourData.images[currentImageIndex]}
              alt={tourData.title}
              className="main-image"
            />
            <button className="nav-btn prev" onClick={handlePrevImage}>
              ❮
            </button>
            <button className="nav-btn next" onClick={handleNextImage}>
              ❯
            </button>
          </div>

          <div className="thumbnail-container">
            {tourData.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  currentImageIndex === index ? "active" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </Col>

        <Col span={10}>
          <div className="tour-info">
            <Title level={3}>Thông tin Tour</Title>
            <div className="tour-details">
              <Title level={2}>{tourData.title}</Title>
              <div>⏱️ {tourData.time}</div>
              <div>🚗 {tourData.transportation}</div>
              <div>🏨 {tourData.hotel}</div>
              <div className="tour-price">
                💰 {tourData.price.toLocaleString("vi-VN")}đ/người
              </div>
              <Button
                type="primary"
                size="large"
                className="booking-button"
                onClick={handleBooking}
              >
                Đặt Tour
              </Button>
              <p>
                Hoặc Quý khách có thể để lại thông tin liên hệ điện thoại chúng
                tôi sẽ liên hệ trực tiếp tư vấn Quý khách ạ.
              </p>
              <Button
                type="default"
                size="large"
                className="contact-button"
                onClick={showContactModal}
              >
                Để Lại Thông Tin Tư Vấn
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <TravelDescription />

      <Modal
        title="Để lại thông tin liên hệ"
        open={isContactModalVisible}
        onCancel={() => setIsContactModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleContactSubmit}>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "Email không hợp lệ!" },
              { required: true, message: "Vui lòng nhập email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TourDetail;
