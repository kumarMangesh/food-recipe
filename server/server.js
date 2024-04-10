const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
// const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
require("dotenv").config();
const { mongoConnect } = require("./services/mongo");
const { fetchRecipes } = require("./recipes/recipes.model");

const app = express();

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

async function startServer() {
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:3000"],
      credentials: true,
    })
  );

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  );

  mongoConnect();
  fetchRecipes();

  app.use(express.static(path.join(__dirname,"..", "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/dist", "index.html"));
  });

  app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log("Running GraphQl Server");
  });
}

startServer();
