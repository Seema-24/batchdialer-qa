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

describe('Last contact API tests', async function () {
    it('should return status code 200 with valid key', async function () {
        const response = await valid_key('/api/contacts/last');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });

    it('should verify if response is a valid json and an array', async function () {
        const response = await valid_key('/api/contacts/last');
        body = JSON.parse(JSON.stringify(response.body));
        expect(body).to.be.an('array');
    });

    it('should return status code 403 with invalid key', async function () {
        const response = await invalid_key('/api/contacts/last');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");
    });

    it('should verify all fields in the response', async function () {
        const response = await valid_key('/api/contacts/last');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        if(body.length>0){
            expect(body[0]).to.have.property("id");
            expect(body[0]).to.have.property("vendorcontactid");
            expect(body[0]).to.have.property("calledphonenumber");
            expect(body[0]).to.have.property("firstname");
            expect(body[0]).to.have.property("lastname");
            expect(body[0]).to.have.property("addressline1");
            expect(body[0]).to.have.property("city");
            expect(body[0]).to.have.property("state");
            expect(body[0]).to.have.property("postalcode");
            expect(body[0]).to.have.property("mailingAddressLine1");
            expect(body[0]).to.have.property("mailingcity");
            expect(body[0]).to.have.property("mailingstate");
            expect(body[0]).to.have.property("mailingpostalcode");
            expect(body[0]).to.have.property("country");
            expect(body[0]).to.have.property("email");
            expect(body[0]).to.have.property("comments");
            expect(body[0]).to.have.property("datetime");
            expect(body[0]).to.have.property("compaignIDs");
            expect(body[0]).to.have.property("listIDs");
        } 
    });
});
