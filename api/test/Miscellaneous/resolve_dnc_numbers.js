const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const contact_data = JSON.parse(fs.readFileSync('./api/data/Miscellaneous/resolve_dnc_numbers.json', 'utf8'));
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

    it('should return 200 status code and return number landline', async function () {
        let testReqObj = contact_data.resolve_landline_numbers;
        const response = await valid_key(testReqObj, '/api/contacts/dnc/resolve');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body).to.be.an('array');
    });

    it('should return 200 status code and return number dnc', async function () {
        let testReqObj = contact_data.resolve_dnc_numbers;
        const response = await valid_key(testReqObj, '/api/contacts/dnc/resolve');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body).to.be.an('array');
        //expect(body[0]).to.have.property("number|DNC");

    }); 

    it('should return 200 status code and return number mobile', async function () {
        let testReqObj = contact_data.resolve_mobile_numbers;
        const response = await valid_key(testReqObj, '/api/contacts/dnc/resolve');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body).to.be.an('array');
        /*if(body.length>0){
            expect(body[0]).to.have.property("|Mobile");
        }*/

    });

    it('should return 403 status code for invaild api key', async function () {
        let testReqObj = contact_data.resolve_dnc_numbers;
        const response = await invalid_key(testReqObj, '/api/contacts/dnc/resolve');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
    });
});