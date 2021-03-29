const {makeExecutableSchema} = require('apollo-server');

// TypeDefs
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');
const schemaDirectives = require('./directives');

// eslint-disable-next-line import/no-unused-modules
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives,
});

module.exports = schema;
