# 🌐 Mininet EDU — SDN Learning Platform

> Giáo trình Mạng Máy Tính & Software Defined Networking toàn tập  
> **Giảng viên:** Phúc Trần · phuctv@dlu.edu.vn · 0976 353 605  
> **Đơn vị:** Khoa CNTT, Đại học Đà Lạt (DLU)

## 🚀 Deploy lên GitHub Pages

### Bước 1 — Tạo repo

```bash
cd mininet-edu
git init
git add .
git commit -m "Initial commit: Mininet EDU platform"
git branch -M main
git remote add origin https://github.com/<USERNAME>/mininet-edu.git
git push -u origin main
```

### Bước 2 — Bật GitHub Pages

1. Vào **Settings → Pages**
2. Source: **GitHub Actions**
3. Push commit → GitHub Actions tự build & deploy

### Bước 3 — Chạy local

```bash
npm install
npm run dev   # http://localhost:5173/mininet-edu/
npm run build # production build → dist/
```

## 📚 Nội dung

| Mục | Nội dung |
|-----|---------|
| 📖 Lý thuyết | 10 chương SDN & Mininet |
| 🧪 Lab | 6 lab có hướng dẫn từng bước |
| 🗺️ Topology | 4 topology SVG tương tác |
| ❓ Trắc nghiệm | 30+ câu, luyện tập & thi thử |
| ✏️ Bài tập | 20+ bài tập có gợi ý code |
| 🚀 Dự án | 9 đề tài cơ bản → nâng cao |
| 📝 Đề thi | Lý thuyết + Thực hành + Rubric |
| 📚 Glossary | 25 thuật ngữ có tìm kiếm |
| 🔗 Tài liệu | Links học tập, tools |
| 📧 Liên hệ | Thông tin giảng viên |

## 🏗️ Thêm nội dung

Chỉnh sửa `src/data/index.js` — thêm chapter, quiz, exercise bất kỳ lúc nào.

MIT License — DLU CNTT 2024
