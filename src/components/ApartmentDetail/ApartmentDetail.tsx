import React, { useState, useEffect } from "react";
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

interface Owner {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface Image {
  id: number;
  apartmentId: number;
  imageUrl: string;
  featured: boolean;
}

interface Apartment {
  id: number;
  name: string;
  location: string;
  ownerId: number;
  pricePerDay: number;
  pricePerMonth: number;
  discountPercent: number;
  description: string;
  maxAdults: number;
  maxChildren: number;
  numRooms: number;
  status: string;
  owners: Owner[];
  images: Image[];
  area: string;
}

const ApartmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [numNights, setNumNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchApartment = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `http://localhost:8085/api/apartments/${id}`
        );
        if (!response.ok) {
          throw new Error("Apartment not found");
        }
        const data = await response.json();
        setApartment(data);
        setTotalPrice(data.pricePerDay);
      } catch (error) {
        console.error("Error fetching apartment:", error);
      }
    };

    fetchApartment();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? apartment.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === apartment.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleDateChange = (dates) => {
    if (dates && dates[0] && dates[1] && apartment) {
      const nights = dates[1].diff(dates[0], "days");
      setNumNights(nights);
      setTotalPrice(apartment.pricePerDay * nights);
    }
  };

  if (!apartment) return <div>Loading...</div>;

  return (
    <div className="apartment-detail-container">
      <Row gutter={[24, 24]}>
        <Col span={14} xs={24} md={14}>
          <div className="main-image-container">
            <img
              src={apartment.images[currentImageIndex]?.imageUrl}
              alt={apartment.name}
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
            {apartment.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  currentImageIndex === index ? "active" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={image.imageUrl} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </Col>

        <Col span={10} xs={24} md={10}>
          <div className="booking-form">
            <Title level={3}>{apartment.name}</Title>
            <Text>Địa chỉ: {apartment.location}</Text>
            <Text>Khu vực: {apartment.area}</Text>
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
                <div className="booking-detail">
                  <span>Giá mỗi đêm:</span>
                  <span>{apartment.pricePerDay.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="booking-detail">
                  <span>Tổng tiền:</span>
                  <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>

              <Form.Item label="Số người lớn">
                <InputNumber
                  min={1}
                  max={apartment.maxAdults}
                  defaultValue={1}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item label="Số trẻ em">
                <InputNumber
                  min={0}
                  max={apartment.maxChildren}
                  defaultValue={0}
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
