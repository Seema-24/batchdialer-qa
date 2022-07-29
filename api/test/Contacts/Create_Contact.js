const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');
const d = new Date();
const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const baseUrl = supertest(token.baseUrl);
const createcontact_data = JSON.parse(fs.readFileSync('./api/data/Contacts/Create_Contact.json', 'utf8'));
let phone_number = d.toISOString().split("T")[0].replace(/\-/g,"") + Math.floor(Math.random() * 90 + 10);

//prepare valid key APIs request
const valid_key = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}
//prepare invalid key APIs request
const invalid_key = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.invalid_apiKey}`)
        .send(request_body);
}
describe('Should create contact Api test', async function () {
    it('should create into campaign', async function () {
        createcontact_data.Create_Contact_Camp.phonenumbers[0].phonenumber = phone_number;
        let testReqObj = createcontact_data.Create_Contact_Camp;
        const response = await valid_key(testReqObj, '/api/contact');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body).to.have.property("id");
        expect(body).to.have.property("lists");
        expect(body).to.have.property("vendorcontactid");
        expect(body).to.have.property("phonenumbers");
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
    })
    
   /* it('should create into list', async function () {
        createcontact_data.Create_Contact_List.phonenumbers[0].phonenumber = phone_number;
        let testReqObj = createcontact_data.Create_Contact_List;
        const response = await valid_key(testReqObj, '/api/contact');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    })*/
});
