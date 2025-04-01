import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const Login = ({ onCancel }: { onCancel?: () => void }) => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await fetch("http://localhost:8085/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        await localStorage.setItem("user", JSON.stringify(data));
        message.success("Đăng nhập thành công");

        const returnUrl = localStorage.getItem("returnUrl");
        console.log("Return URL:", returnUrl);

        // Force a small delay to ensure localStorage is updated
        setTimeout(() => {
          if (returnUrl) {
            window.location.replace(returnUrl);
          } else {
            window.location.replace("/");
          }
          localStorage.removeItem("returnUrl");
        }, 500);
      } else {
        message.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Có lỗi xảy ra");
    }
  };
};

export default Login;
