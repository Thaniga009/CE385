// workshop 1.1
// let firstname = "ฐานิกา"
// let age = "21"
// let branch = "วิศวะคอมพิวเตอร์"
// console.log("ชื่อ",firstname); // เรียกใช้ตัวแปรfirstname ชื่อที่ประกาสด้านบน
// console.log("อายุ",age); // เรียกใช้ตัวแปรอายุ
// console.log("สาขา",branch); // เรีียกใช้ตัวแปรสาขา

//workshop1.2
// let message = "aomjai";
// let age =21;
// let boolean = true;
// let gender = null;
// let notdefined;

// console.log("myString:", message ," - Type:",typeof message)
// console.log("myNumber:", age,"  -Type:",typeof age)
// console.log("myBoolean",boolean," - Type:",typeof boolean)
// console.log("myUndefined",notdefined ," - Type:",typeof notdefined)

//workshop1.3
// let math = 85
// let sci = 72
// let eng = 90
// let sum = math+sci+eng // คะแนนรวม 

// console.log("คะแนนรวม",sum)
// console.log("คะแนนเฉลี่ย",sum / 3 )
// console.log("คะแนนเฉลี่ย",sum >= 80)

//workshop1.4
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
