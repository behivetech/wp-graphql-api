const PostDefs = `
    extend type Query {
        posts(id: String): [Post]
    }

    extend type Mutation {
        postDelete(id: String!): Post
        postUpdate(input: PostInput!): Post
    }

    type Post {
        id: ID!
        author: Int
        categories: [Int]
        commentStatus: String
        content: PostRenderedProtected
        date: String
        dateGmt: String
        excerpt: PostRenderedProtected
        featuredMedia: Int
        format: String
        link: String
        links: PostLinks
        meta: [String]
        modified: String
        modifiedGmt: String
        pingStatus: String
        slug: String
        status: String
        sticky: Boolean
        tags: [String]
        template: String
        title: PostTitle
        type: String
    }

    input PostInput {
        id: String!
        content: String
        title: String
    }

    type PostTitle {
      rendered: String
    }

    type PostRenderedProtected {
      rendered: String
      protected: Boolean
    }

    type PostHref {
        href: String
    }

    type PostCountHref {
        count: Int
        href: String
    }

    type PostEmbeddableHref {
        embeddable: Boolean
        href: String
    }

    type PostEmbeddableHrefTaxonomy {
        embeddable: Boolean
        href: String
        taxonomy: String
    }

    type PostEmbeddableHrefTemplated {
        embeddable: Boolean
        href: String
        templated: Boolean
    }

    type PostLinks {
        about: [PostHref]
        author: [PostEmbeddableHref]
        collection: [PostHref]
        curies: [PostEmbeddableHrefTemplated]
        replies: [PostEmbeddableHref]
        self: [PostHref]
        versionHistory: [PostCountHref]
        wpAttachment: [PostEmbeddableHref]
        wpTerm: [PostEmbeddableHrefTaxonomy]
    }
`;

module.exports = PostDefs;
