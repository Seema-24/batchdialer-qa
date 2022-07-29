const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const baseUrl = supertest(token.baseUrl);
const bulkAction_data = JSON.parse(fs.readFileSync('./api/data/Contacts/bulk_action_on_contacts.json', 'utf8'));


//create new API request
const bulkAction = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-Token', `${token.internal_token}`)
        .send(request_body);
}

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

describe('Bulk Action on Contacts API tests', async function () {

    it('Bulk Action Campaign', async function () {
        let testReqObj = bulkAction_data.Action_on_Camp;
        const response = await bulkAction(testReqObj, '/api/contacts/bulk');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body.affected).to.equal(1);
       //expect(body).to.have.property("affected");

    });

    it('should return status code 200 ', async function () {
        let testReqObj = bulkAction_data.Action_on_list;
        const response = await bulkAction(testReqObj, '/api/contacts/bulk');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
       //expect(body.affected).to.equal(0);
       expect(body).to.have.property("affected");

    });

    it('should return 403 status code with invaild api key ', async function () {
        let testReqObj = bulkAction_data.Action_on_Contacts;
        const response = await invalid_key(testReqObj, '/api/contacts/bulk');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");

    });

    
    it('bulk action dnc ', async function () {
        let testReqObj = bulkAction_data.Action_on_dnc;
        const response = await bulkAction(testReqObj, '/api/contacts/bulk');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
       //expect(body.affected).to.equal(0);
       expect(body).to.have.property("affected");

    });

});