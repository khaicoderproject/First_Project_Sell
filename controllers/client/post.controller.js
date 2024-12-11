const postsModel = require("../../models/posts.model");
const userModel = require("../../models/user.model");
module.exports.index = async (req, res) => {
  const posts = await postsModel.find().sort({ publishedDate: "desc" });
  const userIdentifier = await userModel.find();
  res.render("client/pages/post/index", {
    posts: posts,
    userIdentifier: userIdentifier,
  });
};
module.exports.create = async (req, res) => {
  const user = await userModel.findOne({ token: req.cookies.tokenUser });
  req.body.author = user.userIdentifier;
  const post = new postsModel(req.body);
  await post.save();
  res.redirect("back");
};
