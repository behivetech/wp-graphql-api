function cleanPostKeys(data) {
    const dataIsArray = Array.isArray(data);
    let newData = dataIsArray ? [] : {};

    if (dataIsArray) {
        data.map((record) => {
            newData.push(cleanPostKeys(record));
        });
    } else {
        const {
            _links,
            comment_status,
            date_gmt,
            featured_media,
            modified_gmt,
            ping_status,
            ...rest
        } = data;
        const {
            'wp:attachment': wpAttachment,
            'wp:term': wpTerm,
            'version-history': versionHistory,
            ...linkRest
        } = _links;
        const links = {...linkRest, versionHistory, wpAttachment, wpTerm};

        newData = {
            ...rest,
            commentStatus: comment_status,
            dateGmt: date_gmt,
            featuredMedia: featured_media,
            links,
            modifiedGmt: modified_gmt,
            pingStatus: ping_status,
        };
    }

    return newData;
}

const resolver = {
    QUERY: {
        posts: async (parent, args, {dataSources}) => {
            const posts = await dataSources.wpRestApi.readData('posts');

            return cleanPostKeys(posts);
        },
    },
    MUTATION: {
        postDelete: async (parent, args, {dataSources}) => {
            const response = await dataSources.wpRestApi.cudData({
                action: 'delete',
                dataTable: 'posts',
                recordId: args.id,
                formData: args.formData,
            });

            return cleanPostKeys(response);
        },
    },
};

module.exports = resolver;
