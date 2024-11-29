const categoryModel = require("../../models/category.model");
const productModel = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const slug = req.params.slug;
  const category = await categoryModel.findOne({ slug: slug });
  const products = await productModel.find({ category_id: category.id });
  // console.log(products);
  res.render("client/pages/category/index", {
    products,
  });
};
