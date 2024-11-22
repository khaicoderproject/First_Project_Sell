const dashboardRoute = require("./dashboard.route");
const authRoute = require("./auth.route");
module.exports = (app) => {
  app.use("/", dashboardRoute);
  app.use("/user", authRoute);
};
