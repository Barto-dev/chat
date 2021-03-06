const {ApolloServer} = require('apollo-server');
const {sequelize} = require('./models')

// A map of functions which return data for the schema.
const resolvers = require('./graphql/resolvers');
// The GraphQL schema
const typeDefs = require('./graphql/typeDefs');

const contextMiddleware = require('./util/contextMiddleware')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch((err) => console.error(err))
});
