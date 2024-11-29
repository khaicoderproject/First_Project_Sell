const categoryModel = require("../../models/category.model");
const productModel = require("../../models/product.model");
module.exports.detail = async (req, res) => {
  const slugProduct = req.params.slugProduct;
  const product = await productModel.findOne({ slugProduct: slugProduct });
  // console.log(products);
  res.render("client/pages/product/detail", {
    product,
  });
};
