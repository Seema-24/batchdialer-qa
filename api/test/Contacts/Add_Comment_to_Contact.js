const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const d = new Date();
let timestamp = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMilliseconds()].join('');
let randomNumber = [d.getSeconds(), d.getMilliseconds()].join('');
let phone_number = d.toISOString().split("T")[0].replace(/\-/g, "") + Math.floor(Math.random() * 90 + 10);
let phone_number1 = d.toISOString().split("T")[0].replace(/\-/g,"") + Math.floor(Math.random() * 90 + 10);

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const contact_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/Add_Contact_To_Campaign_or_List.json', 'utf8'));
const campaign_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/campaign.json', 'utf8'));
let new_campaignid = "";
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
//prepare add a new contact to the campaign
const add_contact = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}
const create_campaign = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-Token', `${token.internal_token}`)
        .send(request_body);
}

describe('should Add Comment to Contact', async function () {
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

    it('should add single contact to the campaign', async function () {
        //replacing values with dynamic data in contact.json
        contact_data.Addcontacts.campaignid = new_campaignid;
        contact_data.Addcontacts.contacts[0].phonenumber = phone_number;
        contact_data.Addcontacts.contacts[0].altphonenumber = phone_number1;
        contact_data.Addcontacts.contacts[0].firstname = contact_data.Addcontacts.contacts[0].firstname + randomNumber;
        let testReqObj = contact_data.Addcontacts;
        console.log(testReqObj);
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        console.log(body);
        expect(response.status).to.equal(200);
        expect(body.ids).to.have.lengthOf(1);

    });

     /*it('should Add Comment to Contact', async function () {
         let testReqObj = _data.Create_Contact_Comment;
         const response = await valid_key(testReqObj, `/api/contact/${new_contactid}/comment`);
         body = JSON.parse(JSON.stringify(response.body));
         expect(response.status).to.equal(200);
     });

    /* it('should return 403 status code for invaild api key', async function () {
         let testReqObj = _data.Create_Contact_Comment;
         const response = await valid_key(testReqObj, '/api/contact/150545516/comment');
         body = JSON.parse(JSON.stringify(response.body));
         expect(response.status).to.equal(403);
     });*/
});