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

describe('Lists API tests', async function () {
    it('should return status code 200 with valid key', async function () {
        const response = await valid_key('/api/lists');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });

    it('should verify if response is a valid json and an array', async function () {
        const response = await valid_key('/api/lists');
        body = JSON.parse(JSON.stringify(response.body));
        expect(body).to.be.an('array');
    });

    it('should return status code 403 with invalid key', async function () {
        const response = await invalid_key('/api/lists');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");
    });

    it('should verify all fields in the response', async function () {
        const response = await valid_key('/api/lists');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body[0]).to.have.property("id");
        expect(body[0]).to.have.property("name");
        expect(body[0]).to.have.property("contactscount");
        expect(body[0]).to.have.property("campaignscount");
        expect(body[0]).to.have.property("numbers");
        expect(body[0]).to.have.property("status");
        expect(body[0]).to.have.property("message");
        expect(body[0]).to.have.property("health");
        expect(body[0]).to.have.property("round");
        expect(body[0]).to.have.property("age");
        expect(body[0]).to.have.property("default");
        expect(body[0]).to.have.property("daterecycled");
        expect(body[0]).to.have.property("dateadded");
        expect(body[0]).to.have.property("can_export");
    });
});
