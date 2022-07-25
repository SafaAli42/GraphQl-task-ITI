const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
  },
  { timestamps: true }
);

module.exports.postModel = mongoose.model("Post", postSchema);
