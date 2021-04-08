const PageDefs = `
    extend type Query {
        pages(id: String): [Page]
    }

    extend type Mutation {
        pageDelete(id: String!): Page
        pageUpdate(input: PageInput!): Page
    }

    type Page {
        id: ID!
        author: Int
        commentStatus: String
        content: PageRenderedProtected
        date: String
        dateGmt: String
        excerpt: PageRenderedProtected
        featuredMedia: Int
        guid: PageRendered
        link: String
        links: PageLinks
        meta: [String]
        modified: String
        modifiedGmt: String
        parent: Int
        pingStatus: String
        slug: String
        status: String
        template: String
        title: PageRendered
        type: String
    }

    input PageInput {
        id: String!
        content: String
        title: String
    }

    type PageRendered {
      rendered: String
    }

    type PageRenderedProtected {
      rendered: String
      protected: Boolean
    }

    type PageHref {
        href: String
    }

    type PageCountHref {
        count: Int
        href: String
    }

    type PageEmbeddableHref {
        embeddable: Boolean
        href: String
    }

    type PageNameHrefTemplated {
        name: String
        href: String
        templated: Boolean
    }

    type PageLinks {
        about: [PageHref]
        author: [PageEmbeddableHref]
        collection: [PageHref]
        curies: [PageNameHrefTemplated]
        replies: [PageEmbeddableHref]
        self: [PageHref]
        versionHistory: [PageCountHref]
        wpAttachment: [PageHref]
    }
`;

module.exports = PageDefs;
