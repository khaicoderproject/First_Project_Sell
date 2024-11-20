const dashboardRoute = require("./dashboard.route");
const configPrefixAdmin = require("../../config/prefixAdmin.config");
const prefixAdmin = configPrefixAdmin.prefixAdmin;
const productRoute = require("./product.route");
const authRoute = require("./auth.route");
const authMiddleware = require("../../middleware/admin/auth.middleware");
const roleRoute = require("../../routes/admin/role.route");
module.exports = (app) => {
  app.use(prefixAdmin + "/", authMiddleware.checkToken, dashboardRoute);
  app.use(prefixAdmin + "/product", authMiddleware.checkToken, productRoute);
  app.use(prefixAdmin + "/auth", authRoute);
  app.use(prefixAdmin + "/role", roleRoute);
};
