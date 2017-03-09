import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import GraphqlSchema from './schema';
import { expressPort } from './config';

const server = express();
server.use(cors());

server.use('/graphql', graphqlHTTP({
  schema: GraphqlSchema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    stack: error.stack.split('\n'),
  }),
}));

server.listen(expressPort, () => {
  console.log(`The server is running at http://localhost:${expressPort}/`);
});
