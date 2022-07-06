const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');


const d = new Date();
let timestamp = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()].join('');
let randomNumber = [d.getSeconds(), d.getMilliseconds()].join('');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const contact_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/AddContactToCampaignorList.json', 'utf8'));
const campaign_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/campaign.json', 'utf8'));
let new_campaignid = "";

const baseUrl = supertest(token.baseUrl);

//prepare create new campaign API request
const create_campaign = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-Token', `${token.internal_token}`)
        .send(request_body);
}

//prepare add a new contact to the campaign
const add_contact = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}

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

describe('Contacts API tests', async function () {
    it('should create a new campaign to add contacts', async function () {
        //adding timestamp in the campaignname
        campaign_data.newCampaign.name = campaign_data.newCampaign.name + timestamp;

        let testReqObj = campaign_data.newCampaign;
        const response = await create_campaign(testReqObj, '/api/campaign');
        body = JSON.parse(JSON.stringify(response.body));
        //extracting newly created campaign Id to be used in next test cases
        new_campaignid = body.id;
        expect(response.status).to.equal(200);
    });

    it('should add a contact to the campaign', async function () {
        //replacing values with dynamic data in contact.json
        contact_data.single_contact.campaignid = new_campaignid;
        contact_data.single_contact.contacts[0].phonenumber = timestamp;
        contact_data.single_contact.contacts[0].firstname = contact_data.single_contact.contacts[0].firstname + randomNumber;

        let testReqObj = contact_data.single_contact;
        console.log(testReqObj);
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        console.log(body);
        expect(response.status).to.equal(200);
        expect(body.ids).to.have.lengthOf(1);

    });

    /*
       it('should add multiple contacts to the campaign', async function () {
            contact_data.multiple_contact.campaignid = new_campaignid;
            contact_data.multiple_contact.contacts[0].phonenumber = timestamp;
            contact_data.multiple_contact.contacts[0].altphonenumber = timestamp+1;
            contact_data.multiple_contact.contacts[0].firstname = contact_data.single_contact.contacts[0].firstname + randomNumber;
            contact_data.multiple_contact.contacts[0].email = randomNumber+contact_data.single_contact.contacts[0].email;
            contact_data.multiple_contact.contacts[1].phonenumber = timestamp;
            contact_data.multiple_contact.contacts[1].altphonenumber = timestamp+1;
            contact_data.multiple_contact.contacts[1].firstname = contact_data.single_contact.contacts[0].firstname + randomNumber;
            contact_data.multiple_contact.contacts[1].email = randomNumber+contact_data.single_contact.contacts[0].email;
             let testReqObj = contact_data.multiple_contact;
             const response = await add_contact(testReqObj, '/api/contacts');
             body = JSON.parse(JSON.stringify(response.body));
             expect(response.status).to.equal(200);
             expect(body.ids).to.have.lengthOf(2);
     
         });
    
    */
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
