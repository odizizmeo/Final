# คู่มือการติดตั้งและใช้งาน Final Exam Project

## 📋 ข้อกำหนดระบบ

### สำหรับการรันแบบ Local
- Node.js (เวอร์ชัน 18 หรือใหม่กว่า)
- npm (มาพร้อมกับ Node.js)
- MongoDB (เวอร์ชัน 6.0 หรือใหม่กว่า)

### สำหรับการรันแบบ Docker
- Docker
- Docker Compose

## 🚀 วิธีการติดตั้งและรัน

### วิธีที่ 1: ใช้ Docker (แนะนำ)

1. **ตรวจสอบ Docker**
```bash
docker --version
docker-compose --version
```

2. **รันโปรเจค**
```bash
docker-compose up --build
```

3. **เข้าถึงแอปพลิเคชัน**
```
http://localhost:3000
```

### วิธีที่ 2: รันแบบ Local

1. **ติดตั้ง Node.js และ npm**
   - ดาวน์โหลดจาก: https://nodejs.org/
   - หรือใช้ package manager:
     ```bash
     # macOS
     brew install node
     
     # Ubuntu
     sudo apt install nodejs npm
     ```

2. **ติดตั้ง MongoDB**
   ```bash
   # macOS
   brew install mongodb-community
   brew services start mongodb-community
   
   # Ubuntu
   sudo apt install mongodb
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **รันโปรเจค**
```bash
# ใช้ script ที่เตรียมไว้
./start-local.sh

# หรือรันด้วยตนเอง
npm install
npm start
```

4. **เข้าถึงแอปพลิเคชัน**
```
http://localhost:3000
```

## 📝 การปรับแต่งข้อมูล

### 1. ข้อมูลนักศึกษา
แก้ไขไฟล์ `public/index.html` และ `public/about.html`:

```html
<!-- ในไฟล์ index.html -->
<div class="info-item">
    <strong>ชื่อ:</strong> นาย/นาง/นางสาว [ชื่อ-นามสกุลจริง]
</div>
<div class="info-item">
    <strong>รหัสนักศึกษา:</strong> [รหัสนักศึกษาจริง]
</div>
<div class="info-item">
    <strong>สาขา:</strong> [สาขาวิชาจริง]
</div>
<div class="info-item">
    <strong>มหาวิทยาลัย:</strong> [ชื่อมหาวิทยาลัยจริง]
</div>

<!-- แก้ไข GitHub URL -->
<a href="https://github.com/[username]/[repository]" target="_blank" class="github-btn">
```

### 2. แนวทางวิจัย
แก้ไขไฟล์ `public/myresearch.html`:

```html
<h3>หัวข้อวิจัย</h3>
<p class="research-title">[ชื่อหัวข้อวิจัยจริง]</p>

<h3>บทคัดย่อ</h3>
<p>[บทคัดย่องานวิจัย]</p>

<h3>วัตถุประสงค์</h3>
<ul>
    <li>เพื่อศึกษาและวิเคราะห์ [วัตถุประสงค์ที่ 1]</li>
    <li>เพื่อพัฒนา [วัตถุประสงค์ที่ 2]</li>
    <li>เพื่อประเมินประสิทธิภาพของ [วัตถุประสงค์ที่ 3]</li>
</ul>
```

## 🔧 การใช้งานฟีเจอร์

### 1. หน้าหลัก (`/`)
- แสดงข้อมูลนักศึกษา
- ลิงก์ไปยัง GitHub Repository
- เมนูนำทาง

### 2. เกี่ยวกับฉัน (`/about`)
- ข้อมูลส่วนตัว
- ประวัติการศึกษา
- ทักษะและความสามารถ
- ประสบการณ์และผลงาน

### 3. งานวิจัย (`/myresearch`)
- แสดงแนวทางวิจัย
- รายการอ้างอิงตามรูปแบบ IEEE
- เพิ่ม/แก้ไข/ลบรายการอ้างอิง
- เปิดอ่านไฟล์ PDF

### 4. จัดการอ้างอิง (`/reference`)
- ตารางแสดงรายการอ้างอิง
- ฟังก์ชันค้นหา
- จัดการรายการอ้างอิงแบบครบวงจร

## 📚 การเพิ่มข้อมูลตัวอย่าง

### วิธีที่ 1: ผ่านหน้าเว็บ
1. ไปที่หน้า `/myresearch` หรือ `/reference`
2. คลิก "เพิ่มอ้างอิงใหม่"
3. กรอกข้อมูลตามฟอร์ม
4. คลิก "บันทึก"

### วิธีที่ 2: ใช้ Console
1. เปิด Developer Tools (F12)
2. ไปที่ Console
3. รันคำสั่ง:
```javascript
// เพิ่มข้อมูลตัวอย่าง
addSampleData();
```

## 🐛 การแก้ไขปัญหา

### ปัญหา: ไม่สามารถเชื่อมต่อ MongoDB ได้
**วิธีแก้:**
1. ตรวจสอบว่า MongoDB รันอยู่
2. ตรวจสอบการตั้งค่าใน `server.js`
3. รีสตาร์ท MongoDB

### ปัญหา: ไม่สามารถอัปโหลดไฟล์ได้
**วิธีแก้:**
1. ตรวจสอบโฟลเดอร์ `uploads/`
2. ตรวจสอบสิทธิ์การเขียนไฟล์
3. รีสตาร์ทแอปพลิเคชัน

### ปัญหา: Docker ไม่รัน
**วิธีแก้:**
1. ตรวจสอบว่า Docker Desktop รันอยู่
2. รันคำสั่ง `docker ps` เพื่อตรวจสอบ
3. รีสตาร์ท Docker Desktop

## 📞 การขอความช่วยเหลือ

หากพบปัญหาในการติดตั้งหรือใช้งาน:
1. ตรวจสอบ log ใน terminal
2. ตรวจสอบไฟล์ README.md
3. ตรวจสอบการตั้งค่าในไฟล์ต่างๆ

## 🔄 การอัปเดต

เมื่อมีการอัปเดตโปรเจค:
```bash
# สำหรับ Docker
docker-compose down
git pull
docker-compose up --build

# สำหรับ Local
git pull
npm install
npm start
``` 