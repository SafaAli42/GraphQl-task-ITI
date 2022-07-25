const Mutation = {
  creatPost: (_, data, context) => {
    return context.dataSources.posts.createPost(data);
  },
  deletePost: (_, { id }, context) => {
    return context.dataSources.posts.deletePost(id);
  },
  updatePost: (_, data, context) => {
    return context.dataSources.posts.updatePost(data);
  },
};

module.exports = Mutation;
