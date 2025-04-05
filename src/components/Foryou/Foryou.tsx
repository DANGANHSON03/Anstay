import React from "react";
import "./Foryou.css";
import { Card, Button, Row, Col } from "antd";
import { StarOutlined, WifiOutlined, MobileOutlined } from "@ant-design/icons";
import { BedSingle, Tickets } from "lucide-react";
const Foryou = () => {
  return (
    <div className="foryou-container">
      <Card className="foryou-card">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12} className="col-p1">
            <h2>Chào mừng bạn đến với Anstay</h2>
            <p>
              Niềm vui của bạn chính là động lực để chúng tôi không ngừng nâng
              cao trải nghiệm!
            </p>
          </Col>
          <Col xs={24} md={12}>
            <div className="icon-grid-container">
              <div className="divider-vertical" />
              <div className="divider-horizontal" />
              <Row gutter={[16, 16]}>
                <Col xs={12} md={12} style={{ textAlign: "center" }} className="col-p">
                  <BedSingle style={{ fontSize: 32, color: "#ff6f61" }} />
                  <p>Earn Free Nights</p>
                </Col>
                <Col xs={12} md={12} style={{ textAlign: "center" }} className="col-p">
                  <Tickets style={{ fontSize: 32, color: "#ff6f61" }} />
                  <p>Member Rates</p>
                </Col>
                <Col xs={12} md={12} style={{ textAlign: "center" }} className="col-p">
                  <WifiOutlined style={{ fontSize: 32, color: "#ff6f61" }} />
                  <p>Free Wi-Fi</p>
                </Col>
                <Col xs={12} md={12} style={{ textAlign: "center" }} className="col-p">
                  <MobileOutlined style={{ fontSize: 32, color: "#ff6f61" }} />
                  <p>Mobile Check-in</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Foryou;
