const UserDefs = `
    extend type Query {
        users(id: String): [User]
    }

    extend type Mutation {
        userCreate(input: UserCreateInput!): User
        userDelete(id: String!): User
        userUpdate(input: UserUpdateInput!): User
    }

    type User {
        id: ID!
        description: String
        link: String
        links: UserLinks
        meta: [String]
        name: String
        slug: String
        url: String
        avatarUrls: UserAvatarUrls
    }

    input UserCreateInput {
        content: String
        title: String
    }

    input UserUpdateInput {
        id: String!
        content: String
        title: String
    }

    type UserAvatarUrls {
        small: String
        medium: String
        large: String
    }


    type UserHref {
        href: String
    }

    type UserLinks {
        collection: [UserHref]
        self: [UserHref]
    }
`;

module.exports = UserDefs;
