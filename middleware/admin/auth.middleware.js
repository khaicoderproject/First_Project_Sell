// const accountModel = require("../../models/account.model");
// const prefixAdmin = require("../../config/prefixAdmin.config");
// module.exports.checkToken = async (req, res, next) => {
//   const token = req.cookies.token;
//   //   if (!token) {
//   //     res.redirect(`${prefixAdmin.prefixAdmin}/auth/login`);
//   //   } else {
//   //     const accountToken = await accountModel.findOne({ token: token });
//   //     if (!accountToken) {
//   //       res.redirect(`${prefixAdmin.prefixAdmin}/auth/login`);
//   //     }
//   //     next();
//   //   }
//   console.log(req.cookies);
//   if (!token) {
//     res.clearCookie("token"); // Xóa cookie token
//     return res.redirect(`${prefixAdmin.prefixAdmin}/auth/login`);
//   } else {
//     next();
//   }
// };

const accountModel = require("../../models/account.model");
const prefixAdmin = require("../../config/prefixAdmin.config");

module.exports.checkToken = async (req, res, next) => {
  const token = req.cookies.token;

  // Nếu không có token, chuyển hướng đến trang login
  if (!token) {
    if (req.originalUrl === `${prefixAdmin.prefixAdmin}/auth/login`) {
      // Nếu đã ở trang login, không chuyển hướng nữa
      return next();
    }
    return res.redirect(`${prefixAdmin.prefixAdmin}/auth/login`);
  }

  try {
    // Tìm token trong database
    const accountToken = await accountModel.findOne({ token: token });
    // console.log(token);
    // console.log(accountToken);
    if (!accountToken || accountModel === null) {
      // Token không hợp lệ
      if (req.originalUrl === `${prefixAdmin.prefixAdmin}/auth/login`) {
        // Nếu đã ở trang login, không chuyển hướng nữa
        return next();
      }
      return res.redirect(`${prefixAdmin.prefixAdmin}/auth/login`);
    }

    // Token hợp lệ
    next();
  } catch (error) {
    console.error("Error in checkToken middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};
