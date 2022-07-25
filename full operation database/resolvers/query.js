const Query = {
  getPosts: (_, args, context) => {
    return context.dataSource.posts.getPosts();
  },
};

module.exports = Query;
