module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login");
};
module.exports.loginPost = async (req, res) => {
  res.json(req.body);
};

module.exports.register = (req, res) => {
  res.render("admin/pages/auth/register");
};
module.exports.registerPost = async (req, res) => {
  res.json("ok");
};
