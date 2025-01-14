const dashboardRoute = require("./dashboard.route");
const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const categoryMiddleware = require("../../middleware/client/category.middleware");
const cartRoute = require("./cart.route");
const cartMiddleware = require("../../middleware/client/cart.middleware");
const orderRoute = require("./order.route");
const authMiddleware = require("../../middleware/client/auth.middleware");
const userRoute = require("./user.route");
const postRoute = require("./post.route");
const newsRoute = require("./news.route");
// const {wrapRequest}= require("../../utils/wrapRequest")
module.exports = async (app) => {
  // app.use(cartMiddleware);
  // app.use(["/", "/cart", "/product"], cartMiddleware);
  app.use(cartMiddleware, categoryMiddleware);
  app.use("/", authMiddleware, dashboardRoute);
  app.use("/auth", authRoute);
  app.use("/product", authMiddleware, productRoute);
  app.use("/category", authMiddleware, categoryRoute);
  app.use("/cart", authMiddleware, cartRoute);
  app.use("/order", authMiddleware, orderRoute);
  app.use("/user", authMiddleware, userRoute);
  app.use("/post", authMiddleware, postRoute);
  app.use("/news", authMiddleware, newsRoute);
};
