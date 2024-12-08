const userModel = require("../../models/user.model");
const md5 = require("md5");
const cartModel = require("../../models/cart.model");
const generateId = require("../../helpers/client/generateId");
module.exports.login = (req, res) => {
  res.render("client/pages/auth/login", {
    error: null,
  });
};
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  const existEmail = await userModel.findOne({ email: email });
  if (!existEmail) {
    return res.render("client/pages/auth/login", {
      error: "Email không có trong hệ thống!",
    });
  }
  if (existEmail.password !== md5(password)) {
    return res.render("client/pages/auth/login", {
      error: "Mật khẩu không chính xác, vui lòng nhập lại!",
    });
  }
  const cart = await cartModel.findOne({ user_id: existEmail.id });
  if (cart) {
    res.cookie("cartId", cart.id);
  } else {
    await cartModel.updateOne(
      { _id: req.cookies.cartId },
      { user_id: existEmail._id }
    );
  }
  res.cookie("tokenUser", existEmail.token);
  res.redirect("/");
};

module.exports.register = (req, res) => {
  res.render("client/pages/auth/register", {
    error: null,
  });
};
module.exports.registerPost = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const existEmail = await userModel.findOne({ email: email });
  if (existEmail) {
    return res.render("client/pages/auth/register", {
      error: "Email đã được đăng ký!",
    });
  }
  if (password !== confirmPassword) {
    return res.render("client/pages/auth/register", {
      error: "Mật khẩu không hợp lệ!",
    });
  }
  req.body.password = md5(req.body.password);
  req.body.userIdentifier = generateId.user();
  const user = new userModel(req.body);
  user.save();
  res.cookie("tokenUser", user.token);
  res.redirect("/");
};

module.exports.logout = (req, res) => {
  res.clearCookie("tokenUser");
  res.clearCookie("cartId");
  res.redirect("/");
};
