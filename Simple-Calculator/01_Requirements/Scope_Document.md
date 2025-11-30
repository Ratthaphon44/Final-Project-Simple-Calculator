# Scope Document: Scientific Calculator

## Project Name
Scientific Calculator

## 1.1 วัตถุประสงค์หลักของระบบ (Project Objective)
สร้างเครื่องคิดเลขวิทยาศาสตร์บนเว็บ (Web App) ที่รองรับการคำนวณทางคณิตศาสตร์ที่ซับซ้อนขึ้น โดยใช้ Algorithm จัดลำดับความสำคัญเครื่องหมาย (Order of Operations) เพื่อให้ผู้ใช้สามารถคำนวณฟังก์ชันตรีโกณมิติ เลขยกกำลัง และใช้วงเล็บจัดลำดับการคำนวณได้ถูกต้อง

## 1.2 ขอบเขตการทำงาน (Scope Definition) 

## In-scope
- การรับ input ผ่านปุ่มบนหน้าจอและคีย์บอร์ด
- การคำนวณ Operation พื้นฐาน: +, -, ×, ÷
- การคำนวณ Scientific: sin, cos, tan, sqrt (√), ยกกำลัง (^)**
- การจัดการลำดับความสำคัญด้วยวงเล็บ ( )**
- การรองรับจำนวนเต็มและทศนิยม
- ปุ่ม Clear (C), Backspace (⌫), Equals (=)
- การจัดการข้อผิดพลาด (เช่น หารด้วยศูนย์, วงเล็บไม่ครบคู่)
- Responsive layout (Grid 5 columns) สำหรับ desktop และ mobile

## Out-of-scope
- ประวัติการคำนวณ (History log)
- การคำนวณ Logarithm (Log) (มีใน logic แต่ไม่มีปุ่มกด)
- โหมดหน่วยมุม Radian (รองรับเฉพาะ Degree)
- ระบบ Login หรือเก็บข้อมูลลง Database

## Non-functional Requirements
- หน้าโหลดเร็ว และทำงานแบบ Client-side 100%
- รองรับ Modern Browsers
- UI มีความ Contrast สูง ปุ่มกดง่าย