const dashboardRoute = require("./dashboard.route");
const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const categoryMiddleware = require("../../middleware/client/category.middleware");
const cartRoute = require("./cart.route");
const cartMiddleware = require("../../middleware/client/cart.middleware");
const orderRoute = require("./order.route");
module.exports = (app) => {
  app.use(categoryMiddleware);
  app.use(cartMiddleware);
  app.use("/", dashboardRoute);
  app.use("/user", authRoute);
  app.use("/product", productRoute);
  app.use("/category", categoryRoute);
  app.use("/cart", cartRoute);
  app.use("/order", orderRoute);
};
