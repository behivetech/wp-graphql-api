const pageResolver = require('./Page');
const postResolver = require('./Post');
const userResolver = require('./User');

module.exports = {
    Query: {
        ...pageResolver.QUERY,
        ...postResolver.QUERY,
        ...userResolver.QUERY,
    },
    Mutation: {
        ...pageResolver.MUTATION,
        ...postResolver.MUTATION,
        ...userResolver.MUTATION,
    },
};
