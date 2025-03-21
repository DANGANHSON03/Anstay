import { createContext, useState, ReactNode, useEffect } from "react";

// 1. Định nghĩa kiểu dữ liệu của user
interface User {
  email: string;
  avatar?: string; // Có thể thêm ảnh đại diện sau này
}

// 2. Định nghĩa kiểu dữ liệu cho AuthContext
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// 3. Tạo Context với giá trị mặc định ban đầu là null
export const AuthContext = createContext<AuthContextType | null>(null);

// 4. Provider quản lý trạng thái đăng nhập
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 5. Kiểm tra LocalStorage khi load trang
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Chuyển từ JSON về object
    }
  }, []);

  // 6. Hàm đăng nhập: lưu user vào state & LocalStorage
  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  // 7. Hàm đăng xuất: xóa user khỏi state & LocalStorage
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};