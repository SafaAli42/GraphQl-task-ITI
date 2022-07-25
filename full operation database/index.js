const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const resolvers = require("./resolvers/index");
const PostDataSource = require("./dataSources/post.dataSource");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/social-media")
  .then(() => console.log("DB Connected..."));

const schemaData = fs.readFileSync(path.join(__dirname, "schema.graphql"), {
  encoding: "utf8",
});

// console.log(schemaData)

const typeDefs = gql(schemaData);

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ posts: new PostDataSource() }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4001 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
