const Root = `
directive @isAuthenticated on FIELD_DEFINITION
type Query {
    _: String
}
type Mutation {
    _: String
}
type Subscription {
    _: String
}
`;

module.exports = Root