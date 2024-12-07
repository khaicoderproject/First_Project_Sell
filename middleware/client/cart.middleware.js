const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const userModel = require("../../models/user.model");
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
        secure: process.env.NODE_ENV === "production", // Chỉ sử dụng secure trong môi trường production
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
    // if (!cartValid.user_id) {
    //   const tokenUser = req.cookies ? req.cookies.tokenUser : null;
    //   // console.log(tokenUser);

    //   if (tokenUser) {
    //     const user = await userModel.findOne({ token: tokenUser });
    //     // console.log(user.id);

    //     // Update the cartValid object with the user_id
    //     cartValid.user_id = user.id;

    //     // Save the updated cartValid object back to the database
    //     await cartValid.save(); // This will persist the change to the database
    //     // console.log("Updated cartValid with user_id:", cartValid);
    //   }
    // }
    // else {
    //   console.log("cartValid not found");
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
