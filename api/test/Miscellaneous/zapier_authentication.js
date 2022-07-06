const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const baseUrl = supertest(token.baseUrl);


//preparing property APIs request
const valid_key = async function (endpoint) {
    return baseUrl.get(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`);
}
const invalid_key = async function (endpoint) {
    return baseUrl.get(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.invalid_apiKey}`);
}

describe('return a zapier authenticaiton', async function () {
  
    it('should return status code 200 with valid key', async function () {
        const response = await valid_key('/api/z/auth');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body).to.have.property("connection_label");
        
    });

    it('should return status code 403 with invalid key', async function () {
        const response = await invalid_key('/api/z/auth');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");
    });

    it('should return status code 404 with invalid url', async function () {
        const response = await valid_key('/api/z/a');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(404);
        
    });
});