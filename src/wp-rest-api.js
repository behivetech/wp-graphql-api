const {RESTDataSource} = require('apollo-datasource-rest');
const {BASE_URL, WP_ACCESS_TOKEN} = './constants';

class WpRestApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:8000/wp-json/wp/v2/';
    }

    willSendRequest(request) {
        request.headers.set(
            'Authorization',
            `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTYxNjc4NzM1OCwibmJmIjoxNjE2Nzg3MzU4LCJleHAiOjE2MTczOTIxNTgsImRhdGEiOnsidXNlciI6eyJpZCI6MSwidHlwZSI6IndwX3VzZXIiLCJ1c2VyX2xvZ2luIjoiYWRtaW4iLCJ1c2VyX2VtYWlsIjoib3RAYnNtaXRoc3R1ZGlvLmNvbSIsImFwaV9rZXkiOiIxOHBPQmdwZllHQ2FjYjRZY1ZwTXlvUFVzIn19fQ.FX2Ss2Hla5fnhkbt17CzDZkpONUs9Tjh47yRlhaNhAo`
        );
    }

    // an example making an HTTP POST request
    async posts() {
        console.log(BASE_URL, WP_ACCESS_TOKEN, process.env.BASE_URL)
        return this.get(`posts`);
    }

    // not complete yet.
    async deletePost(postId) {
        return 'deleted';
    }
}

module.exports = WpRestApi;
