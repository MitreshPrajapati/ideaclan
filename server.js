const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const { User } = require('./Schema/User');
const { Connection } = require('./config/db');
const typeDefs = require('./gql/typeDefs')
const resolvers = require('./gql/resolver');
const authMiddleware = require('./middleware/authMiddleware');




async function startServer() {
    const app = express();
    app.use(cors());

    const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });

    await server.start();
    await authMiddleware;
    server.applyMiddleware({ app });
    const PORT = 8080;

    await Connection;
    app.listen(PORT, () =>
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
}

startServer();
