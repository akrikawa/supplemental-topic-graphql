import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import schema from './data/schema';
import resolvers from './data/resolvers';

const PORT = 8080;

const app = express();

// See: https://www.graphql-js.org/docs/running-an-express-graphql-server/
// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

const root = resolvers;

app.use(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.listen(PORT, () =>
  console.log(`Running server on localhost:${PORT}/graphql`)
);
