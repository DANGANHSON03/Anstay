import React from "react";
import "./Foryou.css";
import { Card, Button, Row, Col } from "antd";
import { StarOutlined, WifiOutlined, MobileOutlined } from "@ant-design/icons";
import { BedSingle, Tickets } from "lucide-react";
const Foryou = () => {
  return (
    <div className="foryou-container">
      <Card
        style={{
          borderRadius: 16,
          padding: 24,
          paddingRight: "50px",
          width: "98%", // Điều chỉnh chiều rộng
          maxWidth: "1200px", // Giới hạn chiều rộng tối đa
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          border: "2px solid #f0f0f0",
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <h2>Chào mừng bạn đến với Anstay</h2>
            <p>
              Niềm vui của bạn chính là động lực để chúng tôi không ngừng nâng
              cao trải nghiệm!
            </p>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[16, 16]} className="icon-grid-container">
              <div className="divider-vertical" />
              <div className="divider-horizontal" />
              <Col span={12} style={{ textAlign: "center" }}>
                <BedSingle style={{ fontSize: 32, color: "#ff6f61" }} />
                <p>Earn Free Nights</p>
              </Col>
              <Col span={12} style={{ textAlign: "center" }}>
                <Tickets style={{ fontSize: 32, color: "#ff6f61" }} />
                <p>Member Rates</p>
              </Col>
              <Col span={12} style={{ textAlign: "center" }}>
                <WifiOutlined style={{ fontSize: 32, color: "#ff6f61" }} />
                <p>Free Wi-Fi</p>
              </Col>
              <Col span={12} style={{ textAlign: "center" }}>
                <MobileOutlined style={{ fontSize: 32, color: "#ff6f61" }} />
                <p>Mobile Check-in</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Foryou;
