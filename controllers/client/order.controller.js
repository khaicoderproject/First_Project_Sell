const productInfoHelper = require("../../helpers/client/productInfo");
const cartModel = require("../../models/cart.model");
const orderModel = require("../../models/order.model");

module.exports.checkout = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cartProduct = await productInfoHelper.productInfo(cartId);
  
  // Calculate total price
  const totalPrice = cartProduct.reduce((sum, product) => sum + product.priceTotalNumber, 0);
  
  res.render("client/pages/order/checkout", {
    cartProduct: cartProduct,
    totalPrice: totalPrice
  });
};

module.exports.processSuccess = async (req, res) => {
  try {
    const infoUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    };

    const cartId = req.cookies.cartId;
    const cartProduct = await productInfoHelper.productInfo(cartId);
    if (!cartProduct) throw new Error("Cart not found!");

    const productInfo = cartProduct.map((product) => ({
      product_id: product.productInfo.id,
      title: product.productInfo.title,
      price: product.productInfo.price,
      quantity: product.quantity,
      total: product.priceTotalNumber,
    }));

    const totalPriceAll = parseFloat(cartProduct.totalPriceNumber || 0);
    const orderInfo = {
      user_id: cartId,
      user_info: infoUser,
      product_info: productInfo,
      totalPriceAll,
      paymentMethod: req.body.paymentMethod,
    };

    const order = new orderModel(orderInfo);
    await order.save();

    const carts = await cartModel.findOne({ _id: cartId });
    if (!carts) throw new Error("Cart not found for update!");

    const bulkUpdates = order.product_info.flatMap((item) => [
      {
        updateOne: {
          filter: {
            _id: carts._id,
            "products.product_id": item.product_id,
          },
          update: { $inc: { "products.$.quantity": -item.quantity } },
        },
      },
      {
        updateOne: {
          filter: {
            _id: carts._id,
            "products.product_id": item.product_id,
            "products.quantity": { $lte: 0 }, // sửa cú pháp filter
          },
          update: { $pull: { products: { product_id: item.product_id } } },
        },
      },
    ]);

    await cartModel.bulkWrite(bulkUpdates);

    res.redirect("/order/order-success");
  } catch (error) {
    console.error("Order processing error:", error);
    res.status(500).send("An error occurred while processing the order.");
  }
};

module.exports.orderSuccess = async (req, res) => {
  const order = await orderModel.findOne({ user_id: req.cookies.cartId })
    .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo mới nhất
    .limit(1); // Chỉ lấy 1 đơn hàng mới nhất
  
  if (!order) {
    return res.redirect('/'); // Nếu không có đơn hàng thì chuyển về trang chủ
  }

  res.render("client/pages/order/success", {
    order: order,
  });
};

module.exports.orderDetail = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderModel.findOne({ _id: orderId });

    if (!order) {
      return res.redirect('/');
    }

    // Format dates
    const orderDate = new Date(order.createdAt).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Calculate delivery date (3-5 days from order date)
    const deliveryDate = new Date(order.createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    res.render("client/pages/order/detail", {
      order: order,
      orderDate: orderDate,
      deliveryDate: formattedDeliveryDate
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.redirect('/');
  }
};
