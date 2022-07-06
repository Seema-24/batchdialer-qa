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

describe('get contacts API tests', async function () {

    it('should return status code 200 with valid key', async function () {
        const response = await valid_key('/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body[0]).to.have.property("id");
        expect(body[0]).to.have.property("lists");
        expect(body[0]).to.have.property("vendorcontactid");
        expect(body[0]).to.have.property("phonenumbers");
    });

    it('should return status code 403 with invalid key', async function () {
        const response = await invalid_key('/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");
    });
});