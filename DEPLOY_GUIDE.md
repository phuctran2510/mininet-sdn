# 🚀 Hướng dẫn Deploy lên GitHub Pages

## Bước 1: Tạo GitHub Repository

1. Truy cập https://github.com → Đăng nhập
2. Click **"New repository"** (góc trên phải)
3. Điền thông tin:
   - **Repository name:** `mininet-sdn-course`
   - **Description:** Mininet SDN Course - DLU
   - **Visibility:** Public ✓
   - **KHÔNG** check "Add README file" (đã có sẵn)
4. Click **"Create repository"**

---

## Bước 2: Upload Project lên GitHub

### Cách A: Dùng Git CLI (khuyến nghị)

```bash
# Giải nén file zip vào thư mục
unzip mininet-sdn-course.zip
cd mininet-sdn-project

# Khởi tạo git và push lên GitHub
git init
git add .
git commit -m "Initial commit - Mininet SDN Full Course"
git branch -M main
git remote add origin https://github.com/TEN_GITHUB_CUA_BAN/mininet-sdn-course.git
git push -u origin main
```

> Thay `TEN_GITHUB_CUA_BAN` bằng tên GitHub của bạn (VD: phuctv-dlu)

### Cách B: Upload thủ công qua GitHub Web

1. Vào repository vừa tạo
2. Click **"uploading an existing file"**
3. Kéo thả TẤT CẢ files và folders từ thư mục dự án
4. Nhập commit message: `Initial commit`
5. Click **"Commit changes"**

---

## Bước 3: Bật GitHub Pages

1. Vào repository → **Settings** (tab trên cùng)
2. Sidebar trái → **Pages**
3. Phần **Source**: chọn **"GitHub Actions"**
4. Click **Save**

---

## Bước 4: Chờ Deploy tự động

- GitHub Actions sẽ tự động build và deploy sau khi push code
- Xem tiến trình tại tab **Actions** của repository
- Thường mất **2-5 phút** để hoàn tất
- Sau khi xong, website sẽ có địa chỉ:

```
https://TEN_GITHUB_CUA_BAN.github.io/mininet-sdn-course/
```

---

## Bước 5: Kiểm tra

1. Truy cập URL trên
2. Thử đăng nhập với:
   - **Username:** `phuctv`
   - **Password:** `dlu@2024`
3. Test thêm/sửa/xóa nội dung

---

## 🔧 Chạy local để kiểm tra trước

```bash
# Cài Node.js (nếu chưa có): https://nodejs.org

# Trong thư mục dự án
npm install
npm run dev

# Mở trình duyệt tại: http://localhost:5173
```

---

## ❓ Xử lý lỗi thường gặp

**Lỗi: Actions failed khi build**
→ Vào tab Actions → Click vào job bị lỗi → Đọc log để xem chi tiết

**Lỗi: Trang trắng sau khi deploy**
→ Kiểm tra `vite.config.js` có `base: './'` chưa

**Lỗi: 404 khi truy cập**
→ Đợi thêm 5 phút, GitHub Pages cần thời gian cập nhật DNS

---

## 📞 Hỗ trợ

**Phúc Trần** · phuctv@dlu.edu.vn · 0976 353 605
