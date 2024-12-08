const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const newsScheme = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    byUser: String,
    slugNews: { type: String, slug: "title", unique: true },
  },
  {
    timestamps: true,
  }
);
const news = mongoose.model("news", newsScheme, "news");
module.exports = news;
