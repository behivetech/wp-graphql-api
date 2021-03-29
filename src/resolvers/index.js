const postResolver = require('./Post');

module.exports = {
    Query: {
      ...postResolver.QUERY,
    },
    Mutation: {
      ...postResolver.MUTATION,
    },
};
