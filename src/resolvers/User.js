function cleanUserKeys(record) {
    const {_links, avatar_urls, ...rest} = record;
    const avatarUrls = {
        small: avatar_urls[24],
        medium: avatar_urls[48],
        large: avatar_urls[96],
    };
    return {
        ...rest,
        avatarUrls,
        links: _links,
    };
}

const resolver = {
    QUERY: {
        users: async (parent, args, {dataSources}) => {
            const users = await dataSources.wpRestApi.readData('users', args?.id);

            return users.map(cleanUserKeys);
        },
    },
    MUTATION: {
        userCreate: async (parent, args, {dataSources}) => {
            const {id: recordId, ...formData} = args.input;
            const response = await dataSources.wpRestApi.cudData({
                action: 'post',
                dataTable: 'users',
                recordId,
                formData,
            });

            return cleanUserKeys(response);
        },
        userDelete: async (parent, args, {dataSources}) => {
            const response = await dataSources.wpRestApi.cudData({
                action: 'delete',
                dataTable: 'users',
                recordId: args.id,
            });

            return cleanUserKeys(response);
        },
        userUpdate: async (parent, args, {dataSources}) => {
            const {id: recordId, ...formData} = args.input;
            const response = await dataSources.wpRestApi.cudData({
                action: 'put',
                dataTable: 'users',
                recordId,
                formData,
            });

            return cleanUserKeys(response);
        },
    },
};

module.exports = resolver;
