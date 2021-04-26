const {RESTDataSource} = require('apollo-datasource-rest');
const {OAUTH_BASE_URL} = process.env;
const {ApolloError} = require('apollo-server');
const getQueryString = require('../utils/getQueryString');
const {serialize, parse} = require('cookie');

class WpRestApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = OAUTH_BASE_URL;
    }

    // willSendRequest(request) {
    //     request.headers.set('Authorization', `Bearer ${WP_ACCESS_TOKEN}`);
    // }


    async authorize({clientId, redirectUri}, {req}) {
        const path = 'oauth/authorize';
        const cookies = parse(req.headers?.cookie);

        this.get(`${path}?{${getQueryString({client_id: clientId, redirect_uri: redirectUri})}`)
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
