const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const d = new Date();
let timestamp= [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()].join('');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const contact_data = JSON.parse(fs.readFileSync('./api/data/contact.json', 'utf8'));
//adding timestamp in the campaignname
contact_data.basic_contact.contacts[0].email = 'autocontact' + timestamp + '@email.com';
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
//add a new contact to the campaign
const add_contact = async function (request_body,endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}

describe('Contacts API tests', async function () {
    it('should add a contact to the campaign', async function () {
        let testReqObj = contact_data.basic_contact;
        console.log(testReqObj);
        const response = await add_contact(testReqObj,'/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });
});
