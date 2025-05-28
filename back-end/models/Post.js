// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [
    {
      username: String,
      comment: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
