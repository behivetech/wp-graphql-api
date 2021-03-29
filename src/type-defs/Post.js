const PostDefs = `
    extend type Query {
        posts: [Post]
    }

    extend type Mutation {
        deletePost(id: String): String
    }

    type Post {
        id: ID!
        date_gmt: String
        date_modified_gmt: String
        slug: String
        link: String
        title: PostTitle
        content: PostContent
    }

    type PostTitle {
      rendered: String
    }

    type PostContent {
      rendered: String
      protected: Boolean
    }
`;

module.exports = PostDefs
