# ⚡ Mininet SDN Full Course

> Tài liệu toàn diện về triển khai Software Defined Networking với Mininet  
> **Giảng viên:** Phúc Trần · phuctv@dlu.edu.vn · 0976 353 605  
> **Đại học Đà Lạt** · Khoa Công nghệ Thông tin

[![Deploy to GitHub Pages](https://github.com/phuctv-dlu/mininet-sdn-course/actions/workflows/deploy.yml/badge.svg)](https://github.com/phuctv-dlu/mininet-sdn-course/actions)

---

## 🎯 Giới thiệu

Ứng dụng web học tập tương tác về SDN (Software Defined Networking) với Mininet, bao gồm:

- 📖 **Lý thuyết** – Kiến trúc SDN, OpenFlow, Mininet, Ryu controller
- 🔬 **Lab thực hành** – Từ Mininet CLI cơ bản đến Firewall, Load Balancer SDN
- ❓ **Trắc nghiệm** – 16+ câu hỏi với giải thích chi tiết, chấm điểm tự động
- 💡 **Hướng dẫn FAQ** – Debug tips, giải quyết lỗi thường gặp
- 🔒 **Quản lý nội dung** – Giảng viên đăng nhập để thêm/sửa/xóa toàn bộ nội dung

---

## 🚀 Demo

**Live Site:** https://phuctv-dlu.github.io/mininet-sdn-course

**Tài khoản giảng viên demo:**
- Username: `phuctv`
- Password: `dlu@2024`

---

## 🛠️ Cài đặt & Chạy local

```bash
# Clone repository
git clone https://github.com/phuctv-dlu/mininet-sdn-course.git
cd mininet-sdn-course

# Cài đặt dependencies
npm install

# Chạy development server
npm start

# Build production
npm run build
```

---

## 📁 Cấu trúc Project

```
mininet-sdn-course/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── UI.js              # Shared UI components
│   ├── context/
│   │   └── AuthContext.js     # Authentication state
│   ├── data/
│   │   └── initialData.js     # Default course content
│   ├── hooks/
│   │   └── useContent.js      # Content CRUD with localStorage
│   ├── pages/
│   │   ├── HomePage.js        # Dashboard & overview
│   │   ├── TheoryPage.js      # Lý thuyết SDN
│   │   ├── LabsPage.js        # Lab thực hành
│   │   ├── QuizPage.js        # Trắc nghiệm
│   │   ├── GuidePage.js       # Hướng dẫn FAQ
│   │   ├── ContactPage.js     # Liên hệ & Tài liệu tham khảo
│   │   └── LoginPage.js       # Giảng viên login
│   ├── App.js                 # Main app với navigation
│   └── index.js               # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD
├── package.json
└── README.md
```

---

## ✨ Tính năng

### Cho Sinh viên
- Đọc lý thuyết với code examples
- Xem hướng dẫn lab từng bước
- Làm bài trắc nghiệm và xem điểm
- Tìm kiếm và lọc nội dung
- FAQ giải quyết vấn đề thường gặp

### Cho Giảng viên (sau khi đăng nhập)
- ✅ Thêm / sửa / xóa **lý thuyết** (với code examples)
- ✅ Thêm / sửa / xóa **lab** (với các bước và code)
- ✅ Thêm / sửa / xóa **câu hỏi trắc nghiệm**
- ✅ Thêm / sửa / xóa **hướng dẫn FAQ**
- ✅ Tất cả thay đổi **lưu tự động** vào localStorage
- ✅ **Reset** về dữ liệu mặc định

---

## 🔧 Tech Stack

- **React 18** – UI framework
- **localStorage** – Persistent data storage (không cần backend)
- **GitHub Pages** – Hosting miễn phí
- **GitHub Actions** – CI/CD tự động

---

## 📚 Nội dung Khóa học

### Lý thuyết
1. SDN (Software Defined Networking) là gì?
2. OpenFlow Protocol – Giao thức nền tảng SDN
3. Mininet – Network Emulator cho SDN
4. Các thành phần trong Mininet
5. Luồng xử lý Packet trong SDN/OpenFlow
6. Network Topology trong Mininet

### Lab thực hành
1. **Lab 1** – Làm quen với Mininet CLI (Cơ bản, 30')
2. **Lab 2** – Tạo Custom Topology với Python (Cơ bản, 45')
3. **Lab 3** – Lập trình Ryu Controller - L2 Learning Switch (Nâng cao, 90')
4. **Lab 4** – SDN Firewall với Ryu (Nâng cao, 120')

---

## 📞 Liên hệ

**Phúc Trần** – Giảng viên phụ trách  
📧 Email: phuctv@dlu.edu.vn  
📱 Phone: 0976 353 605  
🏫 Đại học Đà Lạt – Khoa Công nghệ Thông tin  
📍 1 Phù Đổng Thiên Vương, Đà Lạt, Lâm Đồng

---

## 📄 License

MIT License – Sử dụng tự do cho mục đích giáo dục.

© 2024 Phúc Trần · Đại học Đà Lạt
