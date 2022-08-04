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

describe('Get Single Contact Api', async function () {
    it('should return status code 200 with valid key', async function () {
        const response = await valid_key('/api/contact/148552808');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });

    it('should return status code 403 with invalid key', async function () {
        const response = await invalid_key('/api/contact/148552808');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");
    });

    it('should verify all fields in the response', async function () {
        const response = await valid_key('/api/contact/148552808');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body).to.have.property("id");
        expect(body).to.have.property("lists");
        expect(body.lists[0]).to.have.property("id");
        expect(body.lists[0]).to.have.property("name");
        expect(body.lists[0]).to.have.property("contactscount");
        expect(body.lists[0]).to.have.property("campaignscount");
        expect(body.lists[0]).to.have.property("numbers");
        expect(body.lists[0]).to.have.property("status");
        expect(body.lists[0]).to.have.property("message");
        expect(body.lists[0]).to.have.property("health");
        expect(body.lists[0]).to.have.property("round");
        expect(body.lists[0]).to.have.property("age");
        expect(body.lists[0]).to.have.property("default");
        expect(body.lists[0]).to.have.property("daterecycled");
        expect(body.lists[0]).to.have.property("dateadded");
        expect(body).to.have.property("vendorcontactid");
        expect(body.phonenumbers[0]).to.have.property("id");
        expect(body.phonenumbers[0]).to.have.property("clientid");
        expect(body.phonenumbers[0]).to.have.property("contactid");
        expect(body.phonenumbers[0]).to.have.property("numberid");
        expect(body.phonenumbers[0]).to.have.property("phonenumber");
        expect(body.phonenumbers[0]).to.have.property("numbertype");
        expect(body.phonenumbers[0]).to.have.property("dnc");
        expect(body.phonenumbers[0]).to.have.property("tested");
        expect(body.phonenumbers[0]).to.have.property("reachable");
        expect(body.phonenumbers[0]).to.have.property("carrier");
        expect(body.phonenumbers[0]).to.have.property("lastcheckdate");
        expect(body).to.have.property("title");
        expect(body).to.have.property("firstname");
        expect(body).to.have.property("middlename");
        expect(body).to.have.property("lastname");
        expect(body).to.have.property("address");
        expect(body).to.have.property("city");
        expect(body).to.have.property("state");
        expect(body).to.have.property("postalcode");
        expect(body).to.have.property("country");
        expect(body).to.have.property("mailingaddress");
        expect(body).to.have.property("mailingcity");
        expect(body).to.have.property("mailingstate");
        expect(body).to.have.property("mailingpostalcode");
        expect(body).to.have.property("gender");
        expect(body).to.have.property("dateofbirth");
        expect(body).to.have.property("email");
        expect(body).to.have.property("securityphrase");
        expect(body).to.have.property("comments");
        expect(body).to.have.property("customfields");
        expect(body).to.have.property("addressurls");
        expect(body).to.have.property("score");
        expect(body).to.have.property("recalcscore");
        expect(body).to.have.property("lastcallid");
        expect(body).to.have.property("currentagentid");
        expect(body).to.have.property("campaignscount");
        expect(body).to.have.property("listscount");
        expect(body).to.have.property("numbertype");
        expect(body).to.have.property("status");
        expect(body).to.have.property("datelasttouched");
        expect(body).to.have.property("dialedcount");
        expect(body).to.have.property("federaldnc");
        expect(body).to.have.property("calldate");
        expect(body).to.have.property("disposition");
        expect(body).to.have.property("dateadded");
        expect(body).to.have.property("datemodified");
        expect(body).to.have.property("phonenumber1");
        expect(body).to.have.property("stats");
        expect(body.stats).to.have.property("answered");
        expect(body.stats).to.have.property("voicemail");
    });
});