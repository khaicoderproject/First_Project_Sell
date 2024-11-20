const accountModel = require("../../models/account.model");
const prefixAdminConfig = require("../../config/prefixAdmin.config");
const prefixAdmin = prefixAdminConfig.prefixAdmin;
const md5 = require("md5");
const roleModel = require("../../models/role.model");
module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    error: null,
  });
};
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  const existEmail = await accountModel.findOne({ email });
  if (!existEmail) {
    return res.render("admin/pages/auth/login", {
      error: "Email không có trong hệ thống!",
    });
  }
  if (md5(password) !== existEmail.password) {
    return res.render("admin/pages/auth/login", {
      error: "Mật khẩu không chính xác!",
    });
  }
  res.cookie("token", existEmail.token);
  res.redirect(`${prefixAdmin}/`);
};

module.exports.register = async (req, res) => {
  const role = await roleModel.find();
  res.render("admin/pages/auth/register", {
    error: null,
    role: role,
  });
};
module.exports.registerPost = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const existEmail = await accountModel.findOne({ email });
  if (existEmail) {
    return res.render("admin/pages/auth/register", {
      error: "Email đã tồn tại trong hệ thống",
    });
  }
  if (password !== confirmPassword) {
    return res.render("admin/pages/auth/register", {
      error: "Mật khẩu không khớp!",
    });
  }
  req.body.password = md5(password);
  const account = new accountModel(req.body);
  await account.save();
  res.redirect(`${prefixAdmin}/`);
};
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`${prefixAdmin}/`);
};
