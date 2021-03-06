function cleanPostKeys(record) {
    const {
        _links,
        comment_status,
        date_gmt,
        featured_media,
        modified_gmt,
        ping_status,
        ...rest
    } = record;
    const {
        'wp:attachment': wpAttachment,
        'wp:term': wpTerm,
        'version-history': versionHistory,
        ...linkRest
    } = _links;
    const links = {...linkRest, versionHistory, wpAttachment, wpTerm};

    return {
        ...rest,
        commentStatus: comment_status,
        dateGmt: date_gmt,
        featuredMedia: featured_media,
        links,
        modifiedGmt: modified_gmt,
        pingStatus: ping_status,
    };
}

const resolver = {
    QUERY: {
        posts: async (parent, args, {dataSources}) => {
            const posts = await dataSources.wpRestApi.readData('posts', args?.id);

            return posts.map(cleanPostKeys);
        },
    },
    MUTATION: {
        postDelete: async (parent, args, {dataSources}) => {
            const response = await dataSources.wpRestApi.cudData({
                action: 'delete',
                dataTable: 'posts',
                recordId: args.id,
            });

            return cleanPostKeys(response);
        },
        postUpdate: async (parent, args, {dataSources}) => {
            const {id: recordId, ...formData} = args.input;
            const response = await dataSources.wpRestApi.cudData({
                action: 'put',
                dataTable: 'posts',
                recordId,
                formData,
            });

            return cleanPostKeys(response);
        },
    },
};

module.exports = resolver;
