const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const baseUrl = supertest(token.baseUrl);
//preparing property APIs request
const valid_key = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}
const invalid_key = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.invalid_apiKey}`)
        .send(request_body);
}
describe('Resolve DNC Numbers', async function () {


    it('should return 200 status code for vaild api key', async function () {
        let testReqObj = _data.Resolve_DNC_Numbers;
        const response = await valid_key(testReqObj, '/contacts/dnc/resolve');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });

    it('should return 403 status code for invaild api key', async function () {
        let testReqObj = _data.Resolve_DNC_Numbers;
        const response = await invalid_key(testReqObj, '/contacts/dnc/resolve');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
    });
});