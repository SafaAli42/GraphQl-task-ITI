const { DataSource } = require("apollo-datasource");
const { postModel } = require("../model/post.model");

class PostDataSource extends DataSource {
  initialize(config) {
    this.context = config.context;
  }

  createPost(input) {
    return postModel.create(input);
  }

  async getPosts() {
    const posts = await postModel.find();
    return posts;
  }

  async getPost(id) {
    const post = await postModel.findById(id);
    return post;
  }

  async updatePost(data) {
    const postId = data.id;

    await postModel.updateOne(
      { _id: postId },
      {
        $set: {
          // ...data,
          title: data.title,
          text: data.text,
          author: data.author,
        },
      }
    );

    return postModel.findById(postId);
  }

  async deletePost(id) {
    const deletedPost = await postModel.findById(id);
    await postModel.deleteOne({ _id: id });
    return deletedPost;
  }
}

module.exports = PostDataSource;
