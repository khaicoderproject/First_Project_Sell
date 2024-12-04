const categoryModel = require("../../models/category.model");
const productModel = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const slug = req.params.slug;
  const sort = {};
  if (req.query.sort) {
    const [name, value] = req.query.sort.split("-");
    sort[name] = value;
  } else {
    // Default sorting behavior, e.g., by name or createdAt
    sort.title = "asc"; // or any default sorting
  }
  // console.log(sort);
  const category = await categoryModel.findOne({ slug: slug });
  const products = await productModel
    .find({ category_id: category.id })
    .sort(sort);
  // console.log(products);
  res.render("client/pages/category/index", {
    products,
  });
};
