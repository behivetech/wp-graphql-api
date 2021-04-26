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

    async readData(dataTable, recordId, params) {
        try {
            const path = recordId ? `${dataTable}/${recordId}` : dataTable;
            const queryString = params
                ? Object.keys(params)
                      .map(
                          (key) =>
                              `${encodeURIComponent(key)}=${encodeURIComponent(
                                  params[key]
                              )}`
                      )
                      .join('&')
                : '';

            return this.get(`${path}?${queryString}`);
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
