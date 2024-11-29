const dashboardRoute = require("./dashboard.route");
const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const categoryMiddleware = require("../../middleware/client/category.middleware");
module.exports = (app) => {
  app.use(categoryMiddleware);
  app.use("/", dashboardRoute);
  app.use("/user", authRoute);
  app.use("/product", productRoute);
  app.use("/category", categoryRoute);
};
