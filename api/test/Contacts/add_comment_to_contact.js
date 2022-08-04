const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const d = new Date();

let randomNumber = [d.getSeconds(), d.getMilliseconds()].join('');
let randomNumber1 = [d.getSeconds(), d.getMilliseconds()].join('');
let timestamp = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getMilliseconds()].join('');
const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const contact_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/add_contact_to_campaign_or_list.json', 'utf8'));
const campaign_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/campaign.json', 'utf8'));
let new_campaignid = "";

const baseUrl = supertest(token.baseUrl);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//preparing comments APIs request
const valid_key = async function (endpoint, comment) {
    return baseUrl.post(endpoint)
        .type('form')
        .set('Content-Type', 'multipart/form-data')
        .set('X-ApiKey', `${token.apiKey}`)
        .field('comment', comment)
}

const invalid_key = async function (endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.invalid_apiKey}`);
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

const get_phone_number = function () {
    let tStamp = new Date().toISOString().replace(/(-)|(T)|(Z)|(:)|(\.)/g, "");
    let phone_number = tStamp.substring(tStamp.length - 10, tStamp.length);
    return phone_number;
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
        contact_data.Addcontacts_withSingle_PhoneNumber.campaignid = new_campaignid;
        contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].phonenumber = get_phone_number();
        await sleep(10);
        contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].altphonenumber = get_phone_number();
        await sleep(10);
        contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].firstname = contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].firstname + randomNumber;
        await sleep(10);
        contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].lastname = contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].lastname + randomNumber1;
        let testReqObj = contact_data.Addcontacts_withSingle_PhoneNumber;
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body.ids).to.have.lengthOf(1);
        new_contactid = body.ids[0];

    });

    it('should Add Comment to Contact', async function () {
        const comment = `This is a test comment added by automated test ${randomNumber}`
        const response = await valid_key(`/api/contact/${new_contactid}/comment`, comment);
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body).to.have.property("id")

    });

    it('should return 403 status code for invaild api key', async function () {
        const comment =  `This is a test comment added by automated test ${randomNumber}`
        const response = await invalid_key( `/api/contact/${new_contactid}/comment`, comment);
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");

    });

    
   it('should throw error for passing empty comment', async function () {
        const comment = ''
        const response = await valid_key( `/api/contact/${new_contactid}/comment`, comment);
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(400);
        expect(body.msg).to.equal("Please enter comment");
    });
});