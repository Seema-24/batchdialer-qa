const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const Updatecontact_data = JSON.parse(fs.readFileSync('./api/data/Contacts/Update_Contact.json', 'utf8'));
const baseUrl = supertest(token.baseUrl);

//preparing property APIs request
const valid_key = async function (request_body, endpoint) {
    return baseUrl.put(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}
const invalid_key = async function (request_body, endpoint) {
    return baseUrl.put(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.invalid_apiKey}`)
        .send(request_body);
}
describe('Update Contact Api', async function () {

    /*it('should return 200 status code for vaild api key', async function () {
        let testReqObj = UpdateContact_data_data.UpdateContact;
        const response = await valid_key(testReqObj, 'api/contact/{id:[0-9]+}');
        body = JSON.parse(JSON.stringify(response.body));
        console.log(body);
        expect(response.status).to.equal(200);
    });
*/
    it('should return 403 status code for invaild api key', async function () {
        let testReqObj = Updatecontact_data.UpdateContact;
        const response = await invalid_key(testReqObj, '/api/contact/151529443');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
    });
});