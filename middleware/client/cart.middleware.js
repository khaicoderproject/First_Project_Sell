const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const cartId = async (req, res, next) => {
  try {
    const cartValid = await cartModel.findOne({ _id: req.cookies.cartId });
    // console.log(cartValid);
    if (!cartValid || (!cartValid && cartId.length !== 24)) {
      const cart = new cartModel();
      await cart.save();
      const time = 60 * 60 * 24 * 365 * 1000;
      res.cookie("cartId", cart.id, {
        maxAge: time,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" || "development", // Chỉ sử dụng secure trong môi trường production
        sameSite: "Strict", // Ngăn chặn CSRF
      });
    }
    // const record = await cartModel.findOne({ _id: req.cookies.cartId }).lean();
    // const cartProduct = record.products;
    // if (cartProduct) {
    //   if (record.products.length > 0) {
    //     for (const item of cartProduct) {
    //       // console.log(item);
    //       const productId = item.product_id;
    //       const productInfo = await productModel
    //         .findOne({ _id: productId })
    //         .select("title price quantity");
    //       item.productInfo = productInfo;
    //       item.priceTotal = item.productInfo.price * item.quantity;
    //     }
    //     cartProduct.totalPrice = cartProduct.reduce(
    //       (sum, index) => sum + index.priceTotal,
    //       0
    //     );
    //     cartProduct.quantityTotal = cartProduct.reduce(
    //       (sum, index) => sum + index.quantity,
    //       0
    //     );
    //     // console.log(cartProduct);
    //     res.locals.cartProduct = cartProduct;
    //   }
    // }
    const record = await cartModel.findOne({ _id: req.cookies.cartId }).lean();
    if (record) {
      const cartProduct = record.products;
      cartProduct.quantityTotal = cartProduct.reduce(
        (sum, index) => sum + index.quantity,
        0
      );
      // console.log(record);
      res.locals.cartQuantity = cartProduct;
    }
    next();
  } catch (error) {
    throw new Error("error cartId " + error);
  }
};
module.exports = cartId;
