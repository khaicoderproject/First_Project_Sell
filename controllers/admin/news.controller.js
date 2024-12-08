const newsModel = require("../../models/news.model");
const accountModel = require("../../models/account.model");
const configPrefixAdmin = require("../../config/prefixAdmin.config");
module.exports.index = async (req, res) => {
  const news = await newsModel.find({});
  res.render("admin/pages/news/index", {
    news: news,
  });
};
module.exports.create = async (req, res) => {
  res.render("admin/pages/news/create");
};
module.exports.createPost = async (req, res) => {
  const account = await accountModel.findOne({ token: req.cookies.token });
  req.body.byUser = account.id;
  const news = new newsModel(req.body);
  await news.save();
  res.redirect(`${configPrefixAdmin.prefixAdmin}/news/`);
};
