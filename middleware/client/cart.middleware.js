const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const userModel = require("../../models/user.model");

const cartId = async (req, res, next) => {
  try {
    let cartValid = null;
    const cartIdCookie = req.cookies.cartId;
    // Kiểm tra cartId hợp lệ (24 ký tự hex) và tồn tại trong DB
    if (cartIdCookie && cartIdCookie.length === 24) {
      cartValid = await cartModel.findOne({ _id: cartIdCookie });
    }
    // Nếu không hợp lệ hoặc không tồn tại, tạo mới và set cookie, rồi next luôn
    if (!cartValid) {
      const cart = new cartModel();
      await cart.save();
      const time = 60 * 60 * 24 * 365 * 1000;
      res.cookie("cartId", cart.id, {
        maxAge: time,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      // Không thực hiện các thao tác phía dưới, next luôn
      return next();
    }

    // Nếu cart hợp lệ, lấy thông tin số lượng sản phẩm
    const record = await cartModel.findOne({ _id: cartIdCookie }).lean();
    if (record) {
      const cartProduct = record.products;
      cartProduct.quantityTotal = cartProduct.reduce(
        (sum, index) => sum + index.quantity,
        0
      );
      res.locals.cartQuantity = cartProduct;
    }
    next();
  } catch (error) {
    throw new Error("error cartId " + error);
  }
};
module.exports = cartId;
