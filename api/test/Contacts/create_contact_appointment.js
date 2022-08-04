const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const baseUrl = supertest(token.baseUrl);
const createAppointment_data = JSON.parse(fs.readFileSync('./api/data/Contacts/create_contact_appointment.json', 'utf8'));
const d = new Date();
let randomNumber = [d.getSeconds(), d.getMilliseconds()].join('');
let randomNumber1 = [d.getSeconds(), d.getMilliseconds()].join('');
let timestamp = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getMilliseconds()].join('');
const contact_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/add_contact_to_campaign_or_list.json', 'utf8'));
const campaign_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/campaign.json', 'utf8'));
let new_campaignid = "";
let new_contactid = "";


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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const get_phone_number = function () {
    let tStamp = new Date().toISOString().replace(/(-)|(T)|(Z)|(:)|(\.)/g, "");
    let phone_number = tStamp.substring(tStamp.length - 10, tStamp.length);
    return phone_number;
}

//prepare create new campaign API request
const create_campaign = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-Token', `${token.internal_token}`)
        .send(request_body);
}

const add_contact = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}

describe('Create Contact Appointment', async function () {

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
        new_contactid = body.ids[0];
        console.log(new_contactid);
    });


    it('should Create Contact Appointment', async function () {
        let testReqObj = createAppointment_data.Create_Contact_Appointment;
        createAppointment_data.Create_Contact_Appointment.duedate = new Date(d.setDate(d.getDate() + 5));
        const response = await valid_key(testReqObj, `/api/contact/${new_contactid}/appointment`);
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });

    it('should return 403 status code for invalid api key', async function () {
        let testReqObj = createAppointment_data.Create_Contact_Appointment;
        createAppointment_data.Create_Contact_Appointment.duedate = new Date(d.setDate(d.getDate() + 5));
        const response = await invalid_key(testReqObj, `/api/contact/${new_contactid}/appointment`);
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
    });

    it('should return 500 status code not passing required field', async function () {
        let testReqObj = createAppointment_data.Create_Appointment_without_status;
        createAppointment_data.Create_Contact_Appointment.duedate = new Date(d.setDate(d.getDate() + 5));
        const response = await valid_key(testReqObj, `/api/contact/${new_contactid}/appointment`);
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(500);
    });

    it('should return 500 status code without passing date', async function () {
        let testReqObj = createAppointment_data.Create_Appointment_without_date;
        createAppointment_data.Create_Contact_Appointment.duedate = new Date(d.setDate(d.getDate() + 5));
        const response = await valid_key(testReqObj, `/api/contact/${new_contactid}/appointment`);
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(500);
    });

});