const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const path = require("path");
const bodyParser = require("body-parser");
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const database = require("./config/database.config");
const configPrefixAdmin = require("./config/prefixAdmin.config");
database.connect();
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false })); //hỗ trợ req body
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.locals.prefixAdmin = configPrefixAdmin.prefixAdmin;
route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
