const resolver = {
    QUERY: {
        posts: async (parent, args, {dataSources}) => {
            return dataSources.wpRestApi.posts();
        },
    },
    MUTATION: {
        deletePost: async (parent, args, context) => {
            const response = await context.dataSources.wpRestApi.deletePost(args.id);

            return response;
        },
    },
};

module.exports = resolver;
