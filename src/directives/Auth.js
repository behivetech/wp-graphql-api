const {SchemaDirectiveVisitor, AuthenticationError} = require('apollo-server');
// const {ensureSignedIn} = require('../../lib/auth');

// const ensureSignedIn = () => true;
class AuthDirectives extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const {resolve} = field;

        field.resolve = async function (...args) {
            // const signedIn = await ensureSignedIn(args[2]);
            const signedIn = true;

            if (!signedIn) {
                throw new AuthenticationError('NOT_AUTHENTICATED');
            }

            return resolve.apply(this, args);
        };
    }
}

module.exports = AuthDirectives;
