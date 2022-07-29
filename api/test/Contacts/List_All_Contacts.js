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

describe('list all contacts API tests', async function () {

    it('should return status code 200 with valid key', async function () {
        const response = await valid_key('/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body[0]).to.have.property("id");
        expect(body[0]).to.have.property("lists");
        expect(body[0]).to.have.property("vendorcontactid");
        expect(body[0]).to.have.property("phonenumbers");
        expect(body[0].phonenumbers[0]).to.have.property("id");
        expect(body[0].phonenumbers[0]).to.have.property("clientid");
        expect(body[0].phonenumbers[0]).to.have.property("contactid");
        expect(body[0].phonenumbers[0]).to.have.property("numberid");
        expect(body[0].phonenumbers[0]).to.have.property("phonenumber")
        expect(body[0].phonenumbers[0]).to.have.property("numbertype")
        expect(body[0].phonenumbers[0]).to.have.property("dnc")
        expect(body[0].phonenumbers[0]).to.have.property("tested")
        expect(body[0].phonenumbers[0]).to.have.property("reachable")
        expect(body[0].phonenumbers[0]).to.have.property("carrier")
        expect(body[0].phonenumbers[0]).to.have.property("lastcheckdate")
        expect(body[0]).to.have.property("title");
        expect(body[0]).to.have.property("firstname");
        expect(body[0]).to.have.property("middlename");
        expect(body[0]).to.have.property("lastname");
        expect(body[0]).to.have.property("address");
        expect(body[0]).to.have.property("city");
        expect(body[0]).to.have.property("state");
        expect(body[0]).to.have.property("postalcode");
        expect(body[0]).to.have.property("country");
        expect(body[0]).to.have.property("mailingaddress");
        expect(body[0]).to.have.property("mailingcity");
        expect(body[0]).to.have.property("mailingstate");
        expect(body[0]).to.have.property("mailingpostalcode");
        expect(body[0]).to.have.property("gender");
        expect(body[0]).to.have.property("dateofbirth");
        expect(body[0]).to.have.property("email");
        expect(body[0]).to.have.property("securityphrase");
        expect(body[0]).to.have.property("comments");
        expect(body[0]).to.have.property("customfields");
        expect(body[0]).to.have.property("addressurls");
        expect(body[0]).to.have.property("score");
        expect(body[0]).to.have.property("recalcscore");
        expect(body[0]).to.have.property("lastcallid");
        expect(body[0]).to.have.property("currentagentid");
        expect(body[0]).to.have.property("campaignscount");
        expect(body[0]).to.have.property("listscount");
        expect(body[0]).to.have.property("numbertype");
        expect(body[0]).to.have.property("listscount");
        expect(body[0]).to.have.property("status");
        expect(body[0]).to.have.property("datelasttouched");
        expect(body[0]).to.have.property("dialedcount");
        expect(body[0]).to.have.property("federaldnc");
        expect(body[0]).to.have.property("calldate");
        expect(body[0]).to.have.property("disposition");
        expect(body[0]).to.have.property("dateadded");
        expect(body[0]).to.have.property("datemodified");
    });

    it('should return status code 403 with invalid key', async function () {
        const response = await invalid_key('/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");
    });
});