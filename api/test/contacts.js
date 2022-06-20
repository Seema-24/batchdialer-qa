const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const d = new Date();
let timestamp = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()].join('');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const contact_data = JSON.parse(fs.readFileSync('./api/data/contact.json', 'utf8'));
//adding timestamp in the campaignname
contact_data.single_contact.contacts[0].email = 'autocontact' + timestamp + '@email.com';
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
//add a new contact to the campaign
const add_contact = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}

describe('Contacts API tests', async function () {
    it('should add a contact to the campaign', async function () {
        let testReqObj = contact_data.single_contact;
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body.ids).to.have.lengthOf(1);
    });

    it('should add multiple contacts to the campaign', async function () {
        let testReqObj = contact_data.multiple_contact;
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body.ids).to.have.lengthOf(2);

    });

    it('should return 400 error for invaild request ', async function () {
        let testReqObj = contact_data.invaild_request;
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(400);
        expect(body.msg).to.equal("listid, campaignid or campaignids field is required");

    });

    it('should return 404 error for invaild url ', async function () {
        let testReqObj = contact_data.invaild_url;
        const response = await add_contact(testReqObj, '/api/contac');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(404);

    });

    it('should return 403 status code with invaild api key ', async function () {
        let testReqObj = contact_data.invaild_url;
        const response = await invalid_key(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");

    });

    it('should return 200 response with vaild api key', async function () {
        let testReqObj = contact_data.single_contact;
        const response = await valid_key(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);


    });
});
