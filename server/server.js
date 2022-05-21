const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const path = require('path');

const { typeDefs, resolvers } = require("./schemas");

// Connection to Mongo DB
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// New Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// TODO Question - what does `false` indicate here? 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // Wrap the express app with middleware
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
