import { useNavigate } from "react-router-dom";
import { Modal, message } from "antd";

interface LoginValues {
  username: string;
  password: string;
}

const Login = ({ onCancel }: { onCancel?: () => void }) => {
  const navigate = useNavigate();

  const onFinish = async (values: LoginValues) => {
    try {
      const response = await fetch("https://anstay.com.vn/api/auth/login", {
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

  return null; // Add return statement to comply with React component requirements
};

export default Login;
