# Floating Social Chat – WordPress Plugin

## Mô tả
Plugin thêm nút floating gradient **tím → xanh dương** ở góc dưới bên trái màn hình, tích hợp:
- 🔗 Liên kết mạng xã hội (Instagram, Facebook, Twitter)
- 💬 Chat trực tiếp với Admin **không qua bên thứ ba**
- 📬 Hộp thư admin để xem & trả lời tin nhắn
- 📧 Thông báo email mỗi khi có tin nhắn mới

---

## Cài đặt

1. Tải file `floating-social-chat.zip`
2. Vào **WordPress Admin → Plugins → Add New → Upload Plugin**
3. Upload file zip → **Install Now** → **Activate**

---

## Cấu hình

### Bước 1 – Nhập link mạng xã hội
Vào **Social Chat → Cài đặt** → nhập URL Instagram, Facebook, Twitter.

### Bước 2 – Ẩn icon gốc trên header
- Tích chọn **"Ẩn icon mạng xã hội trên header"**
- Nhấn **F12** trên trình duyệt → Click vào phần icon mạng xã hội → Copy class CSS
- Dán vào ô **CSS Selector**. Ví dụ: `.site-header .social-icons`

### Bước 3 – Cài đặt email thông báo
Nhập email để nhận thông báo khi có tin nhắn mới từ khách.

---

## Cách hoạt động của Chat

| Phía khách | Phía Admin |
|---|---|
| Click nút `+` → chọn "Chat với Admin" | Nhận email thông báo ngay khi có tin |
| Nhập tên (bắt buộc) + email (tùy chọn) | Vào **Social Chat → Hộp thư** |
| Gửi tin nhắn | Chọn cuộc hội thoại → nhập phản hồi → Gửi |
| Tự động nhận phản hồi sau ~5 giây | Tin nhắn được lưu trong database WordPress |

---

## Cấu trúc file

```
floating-social-chat/
├── floating-social-chat.php   ← Plugin chính
├── assets/
│   ├── css/
│   │   ├── floating.css       ← Giao diện nút & chat (frontend)
│   │   └── admin.css          ← Giao diện trang admin
│   └── js/
│       ├── floating.js        ← Logic nút & chat (frontend)
│       └── admin.js           ← Logic hộp thư admin
└── README.md
```

---

## Database
Plugin tạo bảng `wp_fsc_messages` khi kích hoạt. Bảng tự xóa khi plugin bị gỡ cài đặt (nếu thêm uninstall hook).

---

## Yêu cầu
- WordPress 5.8+
- PHP 7.4+
- jQuery (có sẵn trong WordPress)
