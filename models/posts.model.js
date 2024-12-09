const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const postSchema = new Schema(
  {
    message: { type: String }, // Nội dung bài viết
    author: { type: String }, // ID của tác giả, tham chiếu đến User
    tags: { type: [String] }, // Danh sách thẻ gắn với bài viết
    category: { type: String }, // Danh mục của bài viết
    publishedDate: { type: Date, default: Date.now }, // Ngày xuất bản
    updatedDate: { type: Date }, // Ngày cập nhật
    status: {
      type: String,
      //   enum: ["draft", "published", "archived"],
      default: "published",
    }, // Trạng thái bài viết
    views: { type: Number, default: 0 }, // Số lượt xem
    comments: [
      {
        // Danh sách bình luận
        author: { type: String }, // Tác giả bình luận
        content: { type: String }, // Nội dung bình luận
        date: { type: Date, default: Date.now }, // Ngày giờ bình luận
      },
    ],
    likes: {
      quantityNumber: {
        type: Number,
        default: 0,
      },
      byUser: [{ type: String }],
    }, // Số lượt thích
    image: { type: String }, // Đường dẫn đến hình ảnh bài viết
    isFeatured: { type: Boolean, default: false }, // Bài viết có phải nổi bật không
    metaData: {
      // Thông tin bổ sung cho SEO
      seoTitle: { type: String }, // Tiêu đề SEO
      seoDescription: { type: String }, // Mô tả SEO
    },
  },
  { timestamps: true }
); // Tự động thêm trường createdAt và updatedAt
const post = mongoose.model("post", postSchema, "posts");
module.exports = post;
