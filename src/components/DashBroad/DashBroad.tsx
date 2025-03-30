import {useState} from 'react';
import './DashBroad.css';
import { Card, Avatar, Button, Form, Typography, Input, message,Row, Col,Modal, Badge,Select } from "antd";
import { UserOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
const { Title } = Typography;
const DashBroad = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [points, setPoints] = useState(1250);

  const initialValues = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123 456 789",
    day: "2021-09-01",
    address:'Hà Nội',
    gender:'Nam'

  };

  const promotions = [
    { icon: "🎁", title: "Giảm 10% khi lưu trú",point:400 },
    { icon: "🚗", title: "Giảm giá 10% cho xe thuê",point:300 },
    { icon: "🔔", title: "Thông báo giá vé máy bay",point:200, isNew: true },
  ];

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Lưu thông tin:", values);
        message.success("Cập nhật thành công!");
        setIsEditing(false);
      })
      .catch((info) => {
        console.log("Lỗi:", info);
      });
  };

  const handleRedeemPoints = (point: number) => {
    setPoints(points - point);
    Modal.success({ title: "Đổi điểm thành công!", content: `Bạn đã đổi ${point} điểm.` });
  };

  const handleChangePassword = (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      Modal.error({ title: "Lỗi!", content: "Mật khẩu mới không khớp." });
      return;
    }
    console.log("Đổi mật khẩu:", values);
    Modal.success({ title: "Thành công!", content: "Mật khẩu đã được cập nhật." });
    setIsPasswordModalOpen(false);
  };

  return (
    <div className='container-dashbroad'>
       <h1>Thông Tin Cá Nhân</h1>
    
    
    <Card className='container-dashbroad-card'>
      <Row gutter={32} align="middle">
        {/* Cột Avatar bên trái */}
        <Col xs={24} sm={8} style={{ textAlign: "center" }}>
          <Avatar size={150} icon={<UserOutlined />} />
          <h3 style={{ marginTop: 10 }}>Nguyễn Văn A</h3>
          <Button type="dashed" style={{ marginTop: 10 }}>
            Thay đổi ảnh đại diện
          </Button>
        </Col>

        {/* Cột Thông tin bên phải */} 
        <Col xs={24} sm={16}>
          <Form form={form} layout="vertical" initialValues={initialValues}>
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item label="Họ và Tên" name="name" rules={[{ required: true }]}>
                  <Input disabled={!isEditing} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Ngày sinh" name="day" rules={[{ required: true }]}>
                  <Input disabled={!isEditing} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Địa chỉ" name="address" rules={[{ required: true }]}>
                  <Input disabled={!isEditing} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                  <Input disabled={!isEditing} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input disabled={!isEditing} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
              <Form.Item label="Giới tính" name="gender">
                <Select disabled={!isEditing} options={[
                  { value: 'male', label: 'Nam' },
                  { value: 'female', label: 'Nữ' },
                  { value: 'other', label: 'Khác' }
                ]} />
              </Form.Item>
              </Col>
            </Row>
          </Form>
          {isEditing ? (
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Lưu
            </Button>
          ) : (
            <Button icon={<EditOutlined />} onClick={handleEdit}>
              Chỉnh sửa
            </Button>
          )}
        </Col>
      </Row>
    </Card>

    <Card className='container-dashbroad-card'>
        <Row gutter={32} align="middle">
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
          <h3>🎉 Tích điểm  <br /><span>Bạn có <strong>{points}</strong> điểm </span></h3>
         

          </Col>
          
          <Col xs={24} sm={16}>
            
            <Row gutter={[16, 16]} justify="center">
            {promotions.map((item, index) => (
                <Col xs={24} sm={8} key={index}>
                <Card style={{ textAlign: "center", minHeight: 150 }}>
                    <div style={{ fontSize: 40 }}>{item.icon}</div>
                    <Title level={5} style={{ marginTop: 10 }}>
                    {item.title} {item.isNew && <Badge count="Mới" style={{ backgroundColor: "#52c41a" }} />}
                    </Title>
                    <Button  type="primary" onClick={() => handleRedeemPoints(item.point)} disabled={points < item.point}>
                    Đổi {item.point} điểm
                    </Button>
                </Card>
                </Col>
            ))}
            </Row>
            
           
          </Col>
        </Row>
      </Card>
     
      <Card className='container-dashbroad-card'>
        <Row gutter={32} align="middle">
          <Col xs={24} sm={8} style={{ textAlign: "center" }}> 
          <h3>🔒 Đổi mật khẩu</h3>
           
          </Col>

          <Col xs={24} sm={16}>
          <Form layout="vertical" onFinish={handleChangePassword}>
          <Form.Item name="oldPassword" label="Mật khẩu cũ" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label="Mật khẩu mới" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Xác nhận mật khẩu" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật mật khẩu
          </Button>
        </Form>
         
          </Col>
        </Row>
      </Card>

    </div>
  )
}

export default DashBroad
