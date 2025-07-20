const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// ربط قاعدة البيانات مع json-server-auth
app.db = router.db;

// استخدام CORS لتجنب مشاكل الاتصال بين الواجهة الخلفية والواجهة الأمامية
app.use(cors());
app.use(middlewares);
app.use(auth); // الحماية والتوثيق
app.use(router); 


app.listen(8000, () => {
  console.log("✅ JSON Server Auth is running on http://localhost:8000");
});
