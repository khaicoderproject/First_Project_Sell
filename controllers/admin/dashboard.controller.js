const userModel = require("../../models/user.model");
const orderModel = require("../../models/order.model");
module.exports.index = async (req, res) => {
  const count = {};
  const order = await orderModel.find({});
  const totalPriceAll = order.reduce(
    (calc, item) => calc + item.totalPriceAll,
    0
  );
  count.user = await userModel.countDocuments();
  count.totalPriceAll = totalPriceAll;
  res.render("admin/pages/dashboard/index", {
    count: count,
  });
};
