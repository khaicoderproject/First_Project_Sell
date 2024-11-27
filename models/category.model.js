const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const categoryScheme = mongoose.Schema(
  {
    title: String,
    description: String,
    status: String,
    slug: { type: String, slug: "title", unique: true },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const category = mongoose.model("category", categoryScheme, "categorys");
module.exports = category;
