let username ="admin"
let password = "1234"
let age = 6;

if (username == "admin" && password == "1234" && age == ">=18") {
    console.log ("เข้าสู่ระบบสำเร็จ")
} else if (age < 18){
    console.log ("อายุไม่ถึงเกณฑ์")
}else {
    console.log("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
}
