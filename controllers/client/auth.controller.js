module.exports.login = (req, res) => {
  res.render("client/pages/auth/login", {
    error: null,
  });
};
module.exports.loginPost = async (req, res) => {
  res.json(req.body);
};

module.exports.register = (req, res) => {
  res.render("client/pages/auth/register", {
    error: null,
  });
};
module.exports.registerPost = async (req, res) => {
  res.json(req.body);
};
