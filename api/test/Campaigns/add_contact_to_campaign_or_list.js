const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');
const { threadId } = require('worker_threads');
const { waitForDebugger } = require('inspector');

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

const get_phone_number = function () {
    let tStamp = new Date().toISOString().replace(/(-)|(T)|(Z)|(:)|(\.)/g, "");
    let phone_number = tStamp.substring(tStamp.length - 10, tStamp.length);
    return phone_number;
}

describe('Add contact to campaign or list API tests', async function () {
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
        let testReqObj = contact_data.singlecontact_with_All_Phone_Numbers;
        //replacing values with dynamic data in contact.json
        contact_data.singlecontact_with_All_Phone_Numbers.campaignid = new_campaignid;
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].altphonenumber = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].firstname = contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].firstname + randomNumber;
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].lastname = contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].lastname + randomNumber1;
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber1 = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber2 = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber3 = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber4 = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber5 = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber6 = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber7 = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber8 = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber9 = get_phone_number();
        await sleep(10);
        contact_data.singlecontact_with_All_Phone_Numbers.contacts[0].phonenumber10 = get_phone_number();
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body.ids).to.have.lengthOf(1);
    });

    it('should add multiple contacts to the campaign', async function () {
        contact_data.multiple_contact.campaignid = new_campaignid;
        contact_data.multiple_contact.contacts[0].phonenumber = get_phone_number();
        await sleep(10);
        contact_data.multiple_contact.contacts[0].altphonenumber = get_phone_number();
        await sleep(10);
        contact_data.multiple_contact.contacts[0].firstname = contact_data.multiple_contact.contacts[0].firstname + randomNumber;
        contact_data.multiple_contact.contacts[0].lastname = contact_data.multiple_contact.contacts[0].lastname + randomNumber1;
        contact_data.multiple_contact.contacts[1].phonenumber = get_phone_number();
        await sleep(10);
        contact_data.multiple_contact.contacts[1].altphonenumber = get_phone_number();
        await sleep(10);
        contact_data.multiple_contact.contacts[1].firstname = contact_data.multiple_contact.contacts[0].firstname + randomNumber;
        contact_data.multiple_contact.contacts[0].lastname = contact_data.multiple_contact.contacts[0].lastname + randomNumber1;
        let testReqObj = contact_data.multiple_contact;
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body.ids).to.have.lengthOf(2);
    });

    it('should add contacts to the list', async function () {
        contact_data.addContact_list.contacts[0].phonenumber = get_phone_number();
        await sleep(10);
        contact_data.addContact_list.contacts[0].altphonenumber = get_phone_number();
        await sleep(10);
        contact_data.addContact_list.contacts[0].firstname = contact_data.addContact_list.contacts[0].firstname + randomNumber;
        await sleep(10);
        contact_data.addContact_list.contacts[0].lastname = contact_data.addContact_list.contacts[0].lastname + randomNumber1;
        let testReqObj = contact_data.addContact_list;
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body.ids).to.have.lengthOf(1);
    });

    it('should return 404 error for invaild url ', async function () {
        let testReqObj = contact_data.single_contact;
        const response = await add_contact(testReqObj, '/api/contac');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(404);

    });

    it('should return 403 status code with invaild api key ', async function () {
        let testReqObj = contact_data.single_contact;
        const response = await invalid_key(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");

    });

    it('should return 400 response for without passing campid or listid', async function () {
        let testReqObj = contact_data.no_camp_or_list;
        const response = await valid_key(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(400);
        expect(body.msg).to.equal("listid, campaignid or campaignids field is required");


    });

    it('should throw warnings msg for empty phonenumber', async function () {
        let testReqObj = contact_data.no_phonenumber;
        const response = await valid_key(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body.warnings[0]).to.equal("Contact 0: all contact's phone numbers are used by another contacts from the batch, skipping");
        expect(body.success).to.equal(false);

    });
});