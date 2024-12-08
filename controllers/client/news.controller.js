const newModel = require("../../models/news.model");
module.exports.index = async (req, res) => {
  const news = await newModel.find();
  // console.log(news);
  // console.log(newsDecription);
  res.render("client/pages/news/index", {
    news: news,
  });
};
module.exports.detail = async (req, res) => {
  const slugNews = req.params.slugNews;
  const news = await newModel.findOne({ slugNews: slugNews });
  res.render("client/pages/news/detail", {
    news: news,
  });
};
