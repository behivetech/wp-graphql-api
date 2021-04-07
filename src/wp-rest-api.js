const {RESTDataSource} = require('apollo-datasource-rest');
const {WP_BASE_URL, WP_ACCESS_TOKEN} = process.env;
const {ApolloError} = require('apollo-server');

class WpRestApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = WP_BASE_URL;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', `Bearer ${WP_ACCESS_TOKEN}`);
    }

    async readData(dataTable, recordId) {
        try {
            const path = recordId ? `${dataTable}/${recordId}` : dataTable;
            return this.get(path);
        } catch (error) {
            throw new ApolloError(`Could not retrieve ${dataTable}.`, 503, {error});
        }
    }

    async cudData({action, dataTable, recordId, formData}) {
        try {
            await this[action](`${dataTable}/${recordId}`, formData);
            return this.get(`${dataTable}/${recordId}`);
        } catch (error) {
            throw new ApolloError(`Could not retrieve ${dataTable}.`, 503, {
                error,
                recordId,
            });
        }
    }
}

module.exports = WpRestApi;
