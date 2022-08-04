const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const SearchContacts_data = JSON.parse(fs.readFileSync('./api/data/Contacts/Seach_contacts.json', 'utf8'));

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
describe('Search Contacts Api', async function () {

    it('should return 200 status code with all the fields', async function () {
        let testReqObj = SearchContacts_data.search_contacts;
        const response = await valid_key(testReqObj, '/api/contacts/search');
        body = JSON.parse(JSON.stringify(response.body));
        //console.log(testReqObj); 
        //console.log(body);
        expect(response.status).to.equal(200);
        expect(body[0]).to.have.property("id");
        expect(body[0]).to.have.property("vendorcontactid");
        expect(body[0]).to.have.property("phonenumbers");
        expect(body[0].phonenumbers[0]).to.have.property("id");
        expect(body[0].phonenumbers[0]).to.have.property("clientid");
        expect(body[0].phonenumbers[0]).to.have.property("clientid");
        expect(body[0].phonenumbers[0]).to.have.property("numberid");
        expect(body[0].phonenumbers[0]).to.have.property("phonenumber");
        expect(body[0].phonenumbers[0]).to.have.property("numbertype");
        expect(body[0].phonenumbers[0]).to.have.property("dnc");
        expect(body[0].phonenumbers[0]).to.have.property("tested");
        expect(body[0].phonenumbers[0]).to.have.property("reachable");
        expect(body[0].phonenumbers[0]).to.have.property("carrier");
        expect(body[0].phonenumbers[0]).to.have.property("lastcheckdate");
        expect(body[0]).to.have.property("title");
        expect(body[0]).to.have.property("firstname");
        expect(body[0]).to.have.property("middlename");
        expect(body[0]).to.have.property("lastname");
        expect(body[0]).to.have.property("address");
        expect(body[0]).to.have.property("city");
        expect(body[0]).to.have.property("state");
        expect(body[0]).to.have.property("postalcode");
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
        expect(body[0]).to.have.property("status");
        expect(body[0]).to.have.property("datelasttouched");
        expect(body[0]).to.have.property("dialedcount");
        expect(body[0]).to.have.property("federaldnc");
        expect(body[0]).to.have.property("calldate");
        expect(body[0]).to.have.property("disposition");
        expect(body[0]).to.have.property("dateadded");
        expect(body[0]).to.have.property("datemodified");
        expect(body[0]).to.have.property("lists");

    });

    it('should return 403 status code for invaild api key', async function () {
        let testReqObj = SearchContacts_data.search_contacts;
        const response = await invalid_key(testReqObj, '/api/contacts/search');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
    });


    it('should throw error for empty search field', async function () {
        let testReqObj = SearchContacts_data.empty_searchfield_phonenumbers;
        const response = await valid_key(testReqObj, '/api/contacts/search');
        console.log(testReqObj); 
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(500);
        expect(body.msg).to.equal("Internal Server Error");

    });

    it('should throw error without passing requied fields', async function () {
        let testReqObj = SearchContacts_data.without_required_fields;
        const response = await valid_key(testReqObj, '/api/contacts/search');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(400);
        expect(body.msg).to.equal("Bad sort field");

    });

    it('should return 200 status code sorting with contacts.id ', async function () {
        let testReqObj = SearchContacts_data.sorting_with_contactid;
        const response = await valid_key(testReqObj, '/api/contacts/search');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);

    });

    it('should return 200 status code sorting with name', async function () {
        let testReqObj = SearchContacts_data.sorting_with_name;
        const response = await valid_key(testReqObj, '/api/contacts/search');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);

    });

    it('should return 200 status code sorting with phonenumber', async function () {
        let testReqObj = SearchContacts_data.sorting_with_phonenumber;
        const response = await valid_key(testReqObj, '/api/contacts/search');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);

    });

    it('should return 200 status code sorting with conatct.score', async function () {
        let testReqObj = SearchContacts_data.sorting_with_conatctScore;
        const response = await valid_key(testReqObj, '/api/contacts/search');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);

    });

    it('should return 200 status code sorting with contacts.dialedcount', async function () {
        let testReqObj = SearchContacts_data.sorting_with_contactsdialedcount;
        const response = await valid_key(testReqObj, '/api/contacts/search');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);

    });

    it('should return 200 status code sorting with contacts.lastcallid', async function () {
        let testReqObj = SearchContacts_data.sorting_with_contactslastcallid;
        const response = await valid_key(testReqObj, '/api/contacts/search');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);

    });
});