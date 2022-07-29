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

describe('Get Recent Calls API tests', async function () {
  
    it('should return status code 200 with valid key', async function () {
        const response = await valid_key('/api/cdrs');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200); 
        expect(body.items[0]).to.have.property("id");
        expect(body.items[0]).to.have.property("direction");   
        expect(body.items[0]).to.have.property("callStartTime");  
        expect(body.items[0]).to.have.property("callEndTime");  
        expect(body.items[0]).to.have.property("did");  
        expect(body.items[0]).to.have.property("customerNumber");  
        expect(body.items[0]).to.have.property("disposition"); 
        expect(body.items[0]).to.have.property("mood"); 
        expect(body.items[0]).to.have.property("duration"); 
        expect(body.items[0]).to.have.property("status");
        expect(body.items[0]).to.have.property("agent");
        expect(body.items[0].agent).to.have.property("id");
        expect(body.items[0].agent).to.have.property("firstname");
        expect(body.items[0].agent).to.have.property("lastname");
        expect(body.items[0]).to.have.property("contact"); 
        expect(body.items[0].contact).to.have.property("id");  
        expect(body.items[0].contact).to.have.property("firstname");
        expect(body.items[0].contact).to.have.property("lastname");
        expect(body.items[0].contact).to.have.property("address");
        expect(body.items[0].contact).to.have.property("city");
        expect(body.items[0].contact).to.have.property("state");
        expect(body.items[0].contact).to.have.property("zip");
        expect(body.items[0].contact).to.have.property("status");
        expect(body.items[0].contact).to.have.property("email");
        expect(body.items[0]).to.have.property("campaign")
        expect(body.items[0].campaign).to.have.property("id")
        expect(body.items[0].campaign).to.have.property("name")
        expect(body.items[0]).to.have.property("client");
        expect(body.items[0].client).to.have.property("id");
        expect(body.items[0].client).to.have.property("name");
        expect(body.items[0]).to.have.property("callid")
        expect(body.items[0]).to.have.property("voicemailid")
        expect(body.items[0]).to.have.property("recordingenabled")
        expect(body.items[0]).to.have.property("callRecordUrl")
        expect(body.items[0]).to.have.property("comments")
        expect(body).to.have.property("page")
        expect(body).to.have.property("totalPages")
    });

    it('should return status code 403 with invalid key', async function () {
        const response = await invalid_key('/api/cdrs');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");
    });
});