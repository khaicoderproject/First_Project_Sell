const categoryModel = require("../../models/category.model");

const categoryMiddleware = async (req, res, next) => {
  try {
    const categories = await categoryModel.find({ deleted: false });
    res.locals.category = categories; // Gán dữ liệu vào res.locals
    // console.log(Array.isArray(res.locals.category));
    next(); // Tiếp tục xử lý request
  } catch (error) {
    console.error("Error fetching categories:", error);
    next(error); // Tiếp tục nếu có lỗi
  }
};

module.exports = categoryMiddleware;
