// הספריית אקפסרס עצמה לתפעול שרת בקלות
const express = require("express");



// מודול שיודע לעשות מינפולציות על כתובת שהוא מקבל
const path = require("path");
// מודול שיודע להריץ שרת
const http = require("http");
require("./db/mongoConnect");
const { routesInit, corsAccessControl } = require("./routes/config_routes");

// מגדיר משתנה שמשתמש ביכולות האקספרס ולאחר מכן
// נאסוף אותו כאשר נפעיל שרת עם  מודול
// HTTP
const app = express();



// const client = require('twilio')(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
// );



// מידלוואר פונקצית אמצע לפני שמגיעים לראוט
// כל מידע שאני מקבל ומחזיר יהיה בפורמט גי'סון אם אפשרי
app.use(express.json());
// להגדיר תקייה סטטית למשתמש שכל קובץ שנמצא שם יהיה חשוף לו
app.use(express.static(path.join(__dirname, "public")));



// app.use(bodyParser.json());



// לאפשר לדפדפן לבצע בקשה מכל דומיין לשרת שלנו
corsAccessControl(app);
// פונקציה שמגדירה בשבילנו בקובץ אחר
// את כל הראוטים שקיימים כגון אינדקס ויוזס
// מעבירים את האפ כדי שיכיר את אותו משתנה בקובץ שהפונקציה
// נמצאת בו
routesInit(app);
// app.use("/", (req,res) => {
//   res.json({msg:"express work fine 888!"});
// })

// ייצור שרת שמאזין לכניסה לפורט 3000
const server = http.createServer(app);

let port = process.env.PORT || "3000";
server.listen(port);