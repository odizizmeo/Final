# README.md
<!-- filepath: /Users/7dizizme7/Library/CloudStorage/GoogleDrive-67130029@dpu.ac.th/My Drive/Cloud/Final/README.md -->

# Final Exam Project

ระบบจัดการงานวิจัยและอ้างอิง พร้อมฟีเจอร์เพิ่ม/แก้ไข/ลบข้อมูลอ้างอิง รองรับการใช้งานทั้งแบบ Local และ Docker

## Features

- ระบบแสดงข้อมูลนักศึกษาและโปรไฟล์
- จัดการแนวทางงานวิจัยและรายการอ้างอิง
- เพิ่ม/แก้ไข/ลบอ้างอิง (IEEE Format)
- รองรับการอัปโหลดไฟล์ PDF
- ใช้งานได้ทั้งแบบ Local และ Docker

## โครงสร้างโปรเจกต์

```
public/
  ├── about.html
  ├── index.html
  ├── myresearch.html
  ├── reference.html
  ├── navbar.html
  ├── cip/
  │    └── Psy.jpg
  └── styles.css
server.js
package.json
docker-compose.yml
SETUP.md
README.md
```

## การติดตั้งและใช้งาน

ดูรายละเอียดใน [SETUP.md](SETUP.md)

## การปรับแต่งข้อมูล

- ข้อมูลนักศึกษา: `public/index.html`, `public/about.html`
- แนวทางวิจัย: `public/myresearch.html`
- Navbar: `public/navbar.html`

## License

MIT License

---

# SETUP.md
<!-- filepath: /Users/7dizizme7/Library/CloudStorage/GoogleDrive-67130029@dpu.ac.th/My Drive/Cloud/Final/SETUP.md -->

# วิธีติดตั้งและใช้งานโปรเจกต์

## 1. เตรียมเครื่องมือ
- ติดตั้ง [VS Code](https://code.visualstudio.com/)
- ติดตั้งส่วนขยาย Live Server (แนะนำ)
- หรือใช้ Web Server อื่นๆ เช่น Python HTTP Server

## 2. โครงสร้างโฟลเดอร์
```
public/
  ├── about.html
  ├── index.html
  ├── myresearch.html
  ├── reference.html
  ├── navbar.html
  ├── styles.css
  └── cip/
        └── Psy.jpg
```

## 3. การรันโปรเจกต์
### วิธีที่ 1: ใช้ Live Server (VS Code)
- คลิกขวาที่ไฟล์ `about.html` หรือไฟล์ใดก็ได้ใน public แล้วเลือก **Open with Live Server**
- เปิดเบราว์เซอร์ไปที่ URL ที่แสดง

### วิธีที่ 2: ใช้ Python HTTP Server
- เปิด Terminal ที่โฟลเดอร์ `public`
- รันคำสั่ง:
```bash
python -m http.server
```
- เปิดเบราว์เซอร์ไปที่ `http://localhost:8000`

## หมายเหตุ
- หากใช้ Python HTTP Server แล้วเข้าหน้าเว็บไม่ได้ ให้ลองเปลี่ยนพอร์ตเป็น 8080 หรือพอร์ตอื่นๆ ที่ว่างอยู่
- แนะนำให้ใช้ Live Server บน VS Code เพื่อความสะดวกในการพัฒนา