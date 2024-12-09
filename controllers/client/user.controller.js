const userModel = require("../../models/user.model");
const postsModel = require("../../models/posts.model");
module.exports.profile = async (req, res) => {
  const userId = req.params.id;
  const userIdentifier = await userModel.findOne({ userIdentifier: userId });
  const posts = await postsModel.find({ author: userId });
  const userMayKnow = await userModel.find({
    token: { $ne: req.cookies.tokenUser },
  });
  if (!userIdentifier) {
    res.status(500).json("User id not found!");
  }
  if (req.cookies.tokenUser === userIdentifier.token) {
    res.render("client/pages/user/profile", {
      posts: posts,
      userMayKnow: userMayKnow,
    });
  } else {
    res.render("client/pages/user/public-profile", {
      posts: posts,
      userIdentifier: userIdentifier,
    });
  }
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

module.exports.profileLikePost = async (req, res) => {
  try {
    const id = req.params.id;
    const [idUser, idPost] = id.split("-");

    // Tìm bài viết
    const postCurrent = await postsModel.findOne({ _id: idPost });
    if (!postCurrent) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Kiểm tra và cập nhật `likes.byUser`
    const currentLikes = postCurrent.likes?.byUser || [];
    if (currentLikes.includes(idUser)) {
      return res.status(400).json({ message: "User already liked the post" });
    }

    const updatedLikes = {
      quantityNumber: (postCurrent.likes?.quantityNumber || 0) + 1,
      byUser: [...currentLikes, idUser],
    };

    // Cập nhật vào MongoDB
    const post = await postsModel.updateOne(
      { _id: idPost },
      { $set: { likes: updatedLikes } }
    );
    // res.json({ message: "Post liked successfully", updatedLikes });
    res.redirect("back");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
