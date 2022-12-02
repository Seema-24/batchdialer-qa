const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');
const d = new Date();
const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const baseUrl = supertest(token.baseUrl);
const createcontact_data = JSON.parse(fs.readFileSync('./api/data/Contacts/create_contact.json', 'utf8'));
let randomNumber = [d.getSeconds(), d.getMilliseconds()].join('');
let randomNumber1 = [d.getSeconds(), d.getMilliseconds()].join('');
let timestamp = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getMilliseconds()].join('');
const contact_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/add_contact_to_campaign_or_list.json', 'utf8'));
const campaign_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/campaign.json', 'utf8'));
let new_campaignid = "";
let new_contactid = "";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

//prepare add a new contact to the campaign
const add_contact = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}

describe('Create Contacts API tests', async function () {

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

    

    it('should create contact in new campaign ', async function () {
        createcontact_data.Create_Contact_Camp.phonenumbers[0].phonenumber = get_phone_number();
        createcontact_data.Create_Contact_Camp.campaignid= new_campaignid;
        await sleep(10);
        let testReqObj = createcontact_data.Create_Contact_Camp;
        const response = await valid_key(testReqObj, '/api/contact');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });

    /*it('should create contact in list ', async function () {
        createcontact_data.Create_Contact_List.phonenumbers[0].phonenumber = get_phone_number();
        await sleep(10);
        let testReqObj = createcontact_data.Create_Contact_List;
        console.log(testReqObj);
        const response = await valid_key(testReqObj, '/api/contact');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });

    it('should create contact in list and campaign', async function () {
        createcontact_data.Create_Contact_List_and_camp.phonenumbers[0].phonenumber = get_phone_number();
        await sleep(10);
        let testReqObj = createcontact_data.Create_Contact_List_and_camp;
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
    });
    it('should return 403 for invalid api key', async function () {
        createcontact_data.Create_Contact_List.phonenumbers[0].phonenumber = get_phone_number();
        await sleep(10);
        let testReqObj = createcontact_data.Create_Contact_List;
        const response = await invalid_key(testReqObj, '/api/contact');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
    });*/

    /*it('should throw error for not passing phonenumber', async function () {
        createcontact_data.Create_Contact_without_phonenumber.phonenumbers[0].phonenumber = get_phone_number();
        await sleep(10);
        let testReqObj = createcontact_data.Create_Contact_without_phonenumber;
        const response = await invalid_key(testReqObj, '/api/contact');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
    });*/
});