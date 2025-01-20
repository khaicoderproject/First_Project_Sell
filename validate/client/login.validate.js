module.exports.login = (req, res, next) => {
  if (req.body.email === "") {
    return res.render("client/pages/auth/login", {
      error: "Email không được để trống!",
    });
  }
  if (req.body.password === "") {
    return res.render("client/pages/auth/login", {
      error: "Password không được để trống!",
    });
  }
  next();
};
module.exports.register = (req, res, next) => {
  if (req.body.email === "" || req.body.password === "") {
    return res.render("client/pages/auth/register", {
      error: "Vui lòng điền đúng thông tin!",
    });
  }
  if (req.body.email === "") {
    return res.render("client/pages/auth/login", {
      error: "Username không được để trống!",
    });
  }
  next();
};
