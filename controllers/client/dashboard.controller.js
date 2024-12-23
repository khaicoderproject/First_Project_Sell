const productModel = require("../../models/product.model");
const formatCurrency = require("../../helpers/admin/formatCurrency");
const newsModel = require("../../models/news.model");
module.exports.index = async (req, res) => {
  const products = await productModel.find({ deleted: false }).limit(5);
  const newProducts = await productModel
    .find({ deleted: false })
    .sort({ createdAt: "desc" })
    .limit(5);
  const news = await newsModel.find().sort({ createdAt: "desc" }).limit(5);
  res.render("client/pages/dashboard/index", {
    products: products,
    formatCurrency,
    newProducts,
    news,
  });
};
module.exports.search = async (req, res) => {
  // const search = req.query.q;
  // const product = await productModel.find({
  //   deleted: false,
  //   status: "active",
  //   title: search,
  // });
  // // res.render("client/pages/dashboard/index", {});
  // console.log(product);
  // res.json(product);
  try {
    // Tìm kiếm sản phẩm với regex, đảm bảo tìm kiếm linh hoạt
    const search = req.query.q;
    const products = await productModel.find({
      deleted: false,
      status: "active",
      title: { $regex: new RegExp(search, "i") }, // 'i' là cờ không phân biệt chữ hoa, chữ thường
    });

    res.render("client/pages/dashboard/index", {
      products: products,
      formatCurrency: formatCurrency,
    });
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while searching for products." });
  }
};
