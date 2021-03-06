const dontenv = require('dotenv').config();
const {ApolloServer, gql} = require('apollo-server');
const schema = require('./src/schema');
const WpRestApi = require('./src/datasources/wp-rest-api');
const OauthRestApi = require('./src/datasources/oauth-rest-api');

// Setup .env
// const path = require('path');
// require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const apolloServer = new ApolloServer({
    dataSources: () => {
        return {
            wpRestApi: new WpRestApi(),
            oauthRestApi: new OauthRestApi(),
        };
    },
    context: (apolloContext) => {
        return {
            ...apolloContext,
        };
    },
    schema,
});

// The `listen` method launches a web server.
apolloServer.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
