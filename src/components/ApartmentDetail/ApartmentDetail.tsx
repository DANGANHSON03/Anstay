import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Row,
  Col,
  Button,
  Form,
  Input,
  DatePicker,
  Checkbox,
  InputNumber,
} from "antd";
import "./ApartmentDetail.css";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ApartmentDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const listing = {
    id: 1,
    title: "Vinhomes Metropolis 3BR",
    address: "29 Liễu Giai, Ngọc Khánh",
    district: "Quận Ba Đình",
    bedrooms: 3,
    price: 3000,
    area: 130,
    description: "Căn hộ cao cấp với view đẹp, nội thất hiện đại",
    amenities: ["Ban công", "Bảo vệ 24/7", "Bể bơi", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
      "https://images.unsplash.com/photo-1598928636135-d0f224ca81f7",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    ],
  };

  const [numNights, setNumNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleDateChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      const nights = dates[1].diff(dates[0], "days");
      setNumNights(nights);
      setTotalPrice(listing.price * nights);
    }
  };

  return (
    <div className="apartment-detail-container">
      <Row gutter={[24, 24]}>
        <Col span={14} xs={24} md={14}  >
          <div className="main-image-container">
            <img
              src={listing.images[currentImageIndex]}
              alt={listing.title}
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
            {listing.images.map((image, index) => (
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

        <Col span={10} xs={24} md={10}>
          <div className="booking-form">
            <Title level={3}>Thông tin liên hệ</Title>
            <Form layout="vertical">
              <Form.Item label="Họ và tên" required>
                <Input placeholder="Nhập họ và tên của bạn" />
              </Form.Item>

              <Form.Item label="Email" required>
                <Input type="email" placeholder="Nhập email của bạn" />
              </Form.Item>

              <Form.Item label="Số điện thoại" required>
                <Input placeholder="Nhập số điện thoại của bạn" />
              </Form.Item>

              <Form.Item label="Thời gian thuê" required>
                <RangePicker
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={["Ngày đến", "Ngày đi"]}
                  className="date-picker"
                  onChange={handleDateChange}
                />
              </Form.Item>

              <div className="booking-summary">
                <div className="booking-detail">
                  <span>Thời gian ở:</span>
                  <span>{numNights} đêm</span>
                </div>
              </div>

              <Form.Item label="Số người ở">
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={2}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item label="Yêu cầu đặc biệt">
                <Input.TextArea
                  rows={4}
                  placeholder="Nhập các yêu cầu đặc biệt của bạn (nếu có)"
                />
              </Form.Item>

              <Form.Item>
                <Checkbox>Tôi đồng ý với các điều khoản và điều kiện</Checkbox>
              </Form.Item>

              <Button type="primary" size="large" block>
                Xác nhận
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ApartmentDetail;
