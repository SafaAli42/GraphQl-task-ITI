const { ApolloServer, gql } = require("apollo-server");
const resolvers = require("./resolvers");
const fs = require("fs");
const schemaData = fs.readFileSync("./schema.graphql", { encoding: "utf-8" });

const typeDefs = gql(schemaData);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
