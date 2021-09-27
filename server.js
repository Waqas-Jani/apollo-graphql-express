import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import dbConnect from './config/dbConnect';
import isAuth from './middlewares/isAuth';
const app = express();
const port = process.env.PORT || 4000;

// Body parser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(isAuth);

async function startServer() {
  const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,

    formatError: (error) => {
      return error;
    },
    context: ({ req, res }) => {
      return {
        req,
        res,
      };
    },
  });
  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app, path: '/graphql' });

  dbConnect();

  app.listen({ port: port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
}
startServer();
