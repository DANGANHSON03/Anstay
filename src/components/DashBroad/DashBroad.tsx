import { useState, useEffect } from "react";
import "./DashBroad.css";
import {
  Card,
  Avatar,
  Button,
  Form,
  Typography,
  Input,
  message,
  Row,
  Col,
  Modal,
  Badge,
  Select,
} from "antd";
import { UserOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
const { Title } = Typography;
const DashBroad = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [points, setPoints] = useState(1250);
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserId(parsedUser.id);

      fetch(`http://103.110.87.191:8085/api/users/${parsedUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          // Format date from yyyy-MM-dd to dd/MM/yyyy
          const date = new Date(data.dob);
          const formattedDob =
            date.getDate().toString().padStart(2, "0") +
            "/" +
            (date.getMonth() + 1).toString().padStart(2, "0") +
            "/" +
            date.getFullYear();

          form.setFieldsValue({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            dob: formattedDob,
            address: data.address,
            gender: data.gender.toLowerCase(),
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          message.error("Không thể tải thông tin người dùng");
        });
    }
  }, []);

  const promotions = [
    { icon: "🎁", title: "Giảm 10% khi lưu trú", point: 400 },
    { icon: "🚗", title: "Giảm giá 10% cho xe thuê", point: 300 },
    { icon: "🔔", title: "Thông báo giá vé máy bay", point: 200, isNew: true },
  ];

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Convert date from dd/MM/yyyy to yyyy-MM-dd for API
        const [day, month, year] = values.dob.split("/");
        const formattedDate = `${year}-${month}-${day}`;

        const updatedData = {
          ...userData,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          dob: formattedDate,
          address: values.address,
          gender: values.gender.toUpperCase(),
        };

        fetch(`http://103.110.87.191:8085/api/users/update/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Updated user:", data);
            message.success("Cập nhật thành công!");
            setIsEditing(false);
            setUserData(data); // Update local state

            // Update localStorage with new user data
            const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
            const updatedUser = { ...storedUser, fullName: data.fullName };
            localStorage.setItem("user", JSON.stringify(updatedUser));
          })
          .catch((error) => {
            console.error("Error updating user:", error);
            message.error("Cập nhật thất bại!");
          });
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  const handleRedeemPoints = (point: number) => {
    setPoints(points - point);
    Modal.success({
      title: "Đổi điểm thành công!",
      content: `Bạn đã đổi ${point} điểm.`,
    });
  };

  const handleChangePassword = (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      Modal.error({ title: "Lỗi!", content: "Mật khẩu mới không khớp." });
      return;
    }

    // Create updated data object, keeping all existing data and only changing password
    const updatedData = {
      ...userData,
      password: values.newPassword,
    };

    fetch(`http://103.110.87.191:8085/api/users/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Password updated:", data);
        message.success("Đổi mật khẩu thành công!");
        setIsPasswordModalOpen(false);
        // Reset password form
        form.resetFields(["oldPassword", "newPassword", "confirmPassword"]);
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        message.error("Đổi mật khẩu thất bại!");
      });
  };

  return (
    <div className="container-dashbroad">
      <h1>Thông Tin Cá Nhân</h1>

      <Card className="container-dashbroad-card">
        <Row gutter={32} align="middle">
          {/* Cột Avatar bên trái */}
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
            <Avatar size={150} icon={<UserOutlined />} />
            <h3 style={{ marginTop: 10 }}>
              {userData?.fullName || "Loading..."}
            </h3>
            <Button type="dashed" style={{ marginTop: 10 }}>
              Thay đổi ảnh đại diện
            </Button>
          </Col>

          {/* Cột Thông tin bên phải */}
          <Col xs={24} sm={16}>
            <Form form={form} layout="vertical">
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Họ và Tên"
                    name="fullName" // Changed from name to fullName
                    rules={[{ required: true }]}
                  >
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Ngày sinh"
                    name="dob" // Changed from day to dob
                    rules={[{ required: true }]}
                  >
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true }]}
                  >
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email" }]}
                  >
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
                    <Select
                      disabled={!isEditing}
                      options={[
                        { value: "male", label: "Nam" },
                        { value: "female", label: "Nữ" },
                        { value: "other", label: "Khác" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            {isEditing ? (
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
              >
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

      <Card
        className="container-dashbroad-card"
        style={{ opacity: "0.6", cursor: "not-allowed" }}
      >
        <Row gutter={32} align="middle">
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
            <h3>
              🎉 Tích điểm <br />
              <span>
                Bạn có <strong>{points}</strong> điểm{" "}
              </span>
            </h3>
          </Col>

          <Col xs={24} sm={16}>
            <Row gutter={[16, 16]} justify="center">
              {promotions.map((item, index) => (
                <Col xs={24} sm={8} key={index}>
                  <Card style={{ textAlign: "center", minHeight: 150 }}>
                    <div style={{ fontSize: 40 }}>{item.icon}</div>
                    <Title level={5} style={{ marginTop: 10 }}>
                      {item.title}{" "}
                      {item.isNew && (
                        <Badge
                          count="Mới"
                          style={{ backgroundColor: "#52c41a" }}
                        />
                      )}
                    </Title>
                    <Button
                      type="primary"
                      disabled={true}
                      style={{ pointerEvents: "none" }}
                    >
                      Đổi {item.point} điểm
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>

      <Card className="container-dashbroad-card">
        <Row gutter={32} align="middle">
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
            <h3>🔒 Đổi mật khẩu</h3>
          </Col>

          <Col xs={24} sm={16}>
            <Form layout="vertical" onFinish={handleChangePassword}>
              <Form.Item
                name="oldPassword"
                label="Mật khẩu cũ"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                rules={[{ required: true }]}
              >
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
  );
};

export default DashBroad;
