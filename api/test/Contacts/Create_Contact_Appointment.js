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
describe('Create Contact Appointment', async function () {


    it('should Create Contact Appointment', async function () {
        let testReqObj = _data.Create_Contact_Appointment;
        const response = await valid_key(testReqObj, '/api/contacts/id/appoinment');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });

    it('should return 403 status code for inavalid api key', async function () {
        let testReqObj = _data.Create_Contact_Appointment;
        const response = await invalid_key(testReqObj, '/api/contacts/id/appoinment');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
    });
});