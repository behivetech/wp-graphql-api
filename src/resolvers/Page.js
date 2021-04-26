function cleanPageKeys(record) {
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
        'version-history': versionHistory,
        ...linkRest
    } = _links;
    const links = {...linkRest, versionHistory, wpAttachment};

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
        pages: async (parent, args = {}, {dataSources}) => {
            const {id, ...restArgs} = args;
            const pages = await dataSources.wpRestApi.readData('pages', id, restArgs);

            return pages.map(cleanPageKeys);
        },
    },
    MUTATION: {
        pageDelete: async (parent, args, {dataSources}) => {
            const response = await dataSources.wpRestApi.cudData({
                action: 'delete',
                dataTable: 'pages',
                recordId: args.id,
            });

            return cleanPageKeys(response);
        },
        pageUpdate: async (parent, args, {dataSources}) => {
            const {id: recordId, ...formData} = args.input;
            const response = await dataSources.wpRestApi.cudData({
                action: 'put',
                dataTable: 'pages',
                recordId,
                formData,
            });

            return cleanPageKeys(response);
        },
    },
};

module.exports = resolver;
