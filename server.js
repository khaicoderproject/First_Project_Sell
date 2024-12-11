const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const path = require("path");
const bodyParser = require("body-parser");
const route = require("./routes/client/index.route");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const routeAdmin = require("./routes/admin/index.route");
const database = require("./config/database.config");
const configPrefixAdmin = require("./config/prefixAdmin.config");
const flash = require("express-flash");
database.connect();
app.use(cookieParser("notification"));
app.use(
  cookieSession({
    name: "session",
    keys: ["your-secret-key1", "your-secret-key2"], // Thêm các khóa ký cookie ở đây
    cookie: {
      maxAge: 60000, // Cookie sẽ tồn tại trong 60 giây
    },
  })
);
app.use(flash());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false })); //hỗ trợ req body
// app.use(bodyParser.urlencoded({ extended: true })); //hỗ trợ req body
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
app.locals.prefixAdmin = configPrefixAdmin.prefixAdmin;
route(app);
routeAdmin(app);
app.use("*", (req, res) => {
  res.json("url không hợp lệ!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
