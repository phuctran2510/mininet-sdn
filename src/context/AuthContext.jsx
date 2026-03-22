import React, { createContext, useContext, useState, useEffect } from 'react';

// Tài khoản giảng viên mặc định
const DEFAULT_INSTRUCTOR = {
  username: 'phuctv',
  password: 'dlu@2024',
  name: 'Phúc Trần',
  email: 'phuctv@dlu.edu.vn',
  phone: '0976353605',
  role: 'instructor',
  university: 'Đại học Đà Lạt',
  department: 'Khoa Công nghệ Thông tin',
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sdn_user');
      if (saved) setUser(JSON.parse(saved));
    } catch (_) {}
  }, []);

  const login = (username, password) => {
    if (username === DEFAULT_INSTRUCTOR.username && password === DEFAULT_INSTRUCTOR.password) {
      setUser(DEFAULT_INSTRUCTOR);
      localStorage.setItem('sdn_user', JSON.stringify(DEFAULT_INSTRUCTOR));
      return { ok: true };
    }
    return { ok: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sdn_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isInstructor: user?.role === 'instructor' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
