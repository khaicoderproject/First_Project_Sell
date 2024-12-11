const userModel = require("../../models/user.model");
const auth = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;
  const user = await userModel.findOne({ token: tokenUser });
  const flash = req.flash("toast");
  //   console.log(tokenUser);
  //   console.log(user);
  if (user) {
    res.locals.user = user;
  } else {
    res.locals.user = "";
  }
  res.locals.flash = flash;
  next();
};
module.exports = auth;
