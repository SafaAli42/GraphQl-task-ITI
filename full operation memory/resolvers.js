let posts = [
  {
    id: 1,
    title: "Title 1",
    text: "text 1",
  },
  {
    id: 2,
    title: "Title 2",
    text: "text 2",
  },
  {
    id: 3,
    title: "Title 3",
    text: "text 3",
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    createPost: (_, { id, title, text }) => {
      let newPost = { id, title, text };
      posts.push(newPost);
      return newPost;
    },
    deletePost: (_, { id }) => {
      posts = posts.filter((post) => {
        return post.id !== id;
      });
      return posts;
    },
    updatePost: (_, { id, title, text }) => {
      let targetPost = posts.find((p) => {
        return p.id === id;
      });
      targetPost.title = title;
      targetPost.text = text;
      console.log(posts);
      return targetPost;
    },
  },
};

module.exports = resolvers;
