const user = require("../../models/user.model");
const userModel = require("../../models/user.model");
module.exports.profile = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findOne({ userIdentifier: userId });
  if (!user) {
    res.status(500).json("User id not found!");
  }
  res.render("client/pages/user/profile");
};
module.exports.settingProfile = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findOne({ userIdentifier: userId });
  if (!user) {
    res.status(500).json("User id not found!");
  }
  res.render("client/pages/user/setting");
};
module.exports.settingProfilePost = async (req, res) => {
  const user = await userModel.findOne({ token: req.cookies.tokenUser });
  const updatedData = {
    fullName: req.body.fullName || user.fullName,
    email: req.body.email || user.email,
    address: req.body.address || user.address,
  };
  await userModel.updateOne(
    { token: req.cookies.tokenUser },
    { $set: updatedData } //dùng set nếu muốn thay đổi mà k ảnh hưởng đến giá trị cũ
  );
  // res.json(req.body);
  res.redirect("back");
};
