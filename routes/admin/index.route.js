const dashboardRoute = require("./dashboard.route");
const configPrefixAdmin = require("../../config/prefixAdmin.config");
const prefixAdmin = configPrefixAdmin.prefixAdmin;
const productRoute = require("./product.route");
const authRoute = require("./auth.route");
module.exports = (app) => {
  app.use(prefixAdmin + "/", dashboardRoute);
  app.use(prefixAdmin + "/product", productRoute);
  app.use(prefixAdmin + "/auth", authRoute);
};
