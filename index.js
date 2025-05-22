import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import schema from './data/schema';

const PORT = 8080;

const app = express();

// app.get('/', (req, res) => {
//   res.send('GraphQL is amazing');
// });

// See: https://www.graphql-js.org/docs/running-an-express-graphql-server/
// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

// const root = { hello: () => "Hi, I'm Andy!" };

const root = {
  product: () => {
    return {
      id: 43253153151,
      name: 'Widget',
      description: 'Awesome widget to use in the garden',
      price: 29.99,
      soldout: false,
    };
  },
};

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
