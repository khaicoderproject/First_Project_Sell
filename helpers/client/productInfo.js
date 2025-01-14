const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const formatCurrency = require("../../helpers/admin/formatCurrency");
const productInfo = async (cartId) => {
  const cart = await cartModel.findOne({ _id: cartId }).lean();
  let cartProduct = "";
  if (cart) {
    cartProduct = cart.products;
    // console.log(cartProduct);
    if (cartProduct) {
      if (cart.products.length > 0) {
        for (const item of cartProduct) {
          // console.log(item);
          const productId = item.product_id;
          const productInfo = await productModel
            .findOne({ _id: productId })
            .select(" title price thumbnail slugProduct");
          item.productInfo = productInfo;
          item.priceTotal = formatCurrency(
            item.productInfo.price * item.quantity
          );
          item.priceTotalNumber = item.productInfo.price * item.quantity;
        }
        cartProduct.totalPrice = formatCurrency(
          cartProduct.reduce((sum, index) => sum + index.priceTotalNumber, 0)
        );
        cartProduct.totalPriceNumber = cartProduct.reduce(
          (sum, index) => sum + index.priceTotalNumber,
          0
        );
      }
    }
  }
  return cartProduct;
};
module.exports = { productInfo };
