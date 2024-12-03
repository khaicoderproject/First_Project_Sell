const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const formatCurrency = require("../../helpers/admin/formatCurrency");
module.exports.index = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const cart = await cartModel.findOne({ _id: cartId }).lean();
    const cartProduct = cart.products;
    if (cartProduct) {
      if (cart.products.length > 0) {
        for (const item of cartProduct) {
          // console.log(item);
          const productId = item.product_id;
          const productInfo = await productModel
            .findOne({ _id: productId })
            .select("title price slugProduct");
          item.productInfo = productInfo;
          item.priceTotal = formatCurrency(
            item.productInfo.price * item.quantity
          );
          item.priceTotalNumber = item.productInfo.price * item.quantity;
        }
        cartProduct.totalPrice = formatCurrency(
          cartProduct.reduce((sum, index) => sum + index.priceTotalNumber, 0)
        );
      }
    }
    res.render("client/pages/cart/index", {
      cartProduct: cartProduct,
    });
  } catch (error) {}
};
module.exports.orderPost = async (req, res) => {
  try {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;
    const products = {
      product_id: productId,
      quantity: req.body.value,
    };
    // console.log(products);
    const cart = await cartModel.findOne({ _id: cartId });
    // checkExist.forEach((product) => {
    //   if (product.product_id === productId) {
    //     existProduct = true;
    //   }
    // });
    if (!cart) {
      return res.status(500).json("Error cart model");
    }
    const existProduct = cart.products.find(
      (item) => item.product_id === productId
    );
    if (existProduct) {
      await cartModel.updateOne(
        { _id: cartId, "products.product_id": productId },
        {
          $inc: {
            "products.$.quantity": 1,
          },
        }
      );
    } else {
      await cartModel.updateOne(
        { _id: cartId },
        {
          $push: {
            products: products,
          },
        }
      );
    }
    res.redirect("/cart");
  } catch (error) {}
};
