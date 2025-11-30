# User Manual - Simple Calculator

## Requirements
- Modern web browser (Chrome/Edge/Firefox)
- ไม่มี server required

## How to run locally
1. ดาวน์โหลดหรือ clone repository
2. เปิดไฟล์ `04_Implementation/index.html` ใน web browser (ดับเบิลคลิก)

## How to use
- กดตัวเลขเพื่อป้อนค่า
- กด + - × ÷ เพื่อเลือก operator
- กด . เพื่อใส่ทศนิยม
- กด = หรือ Enter เพื่อคำนวณ
- กด C เพื่อเคลียร์ทั้งหมด
- กด ⌫ (Backspace) เพื่อลบตัวอักษรสุดท้าย
- รองรับคีย์บอร์ด (0-9, + - * /, Enter, Backspace, Delete)

## Error handling
- หากหารด้วย 0 จะแสดง "Error: Division by zero"
- หาก expression ไม่ถูกต้อง จะแสดง "Error"

## Notes
- ผลลัพธ์ทศนิยมจะถูกปัด (precision 12) เพื่อป้องกันตัวเลขยาวเกินไป
