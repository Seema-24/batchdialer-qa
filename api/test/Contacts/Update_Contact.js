const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');
const d = new Date();
const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const Updatecontact_data = JSON.parse(fs.readFileSync('./api/data/Contacts/Update_Contact.json', 'utf8'));
const baseUrl = supertest(token.baseUrl); 
let randomNumber = [d.getSeconds(), d.getMilliseconds()].join('');
let randomNumber1 = [d.getSeconds(), d.getMilliseconds()].join('');
let timestamp = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getMilliseconds()].join('');

const contact_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/Add_Contact_To_Campaign_or_List.json', 'utf8'));
const campaign_data = JSON.parse(fs.readFileSync('./api/data/Campaigns/campaign.json', 'utf8'));
let new_campaignid = "";
let new_contactid = "";
//let phone_number = d.toISOString().split("T")[0].replace(/\-/g, "") + Math.floor(Math.random() * 90 + 10);
//let phone_number1 = d.toISOString().split("T")[0].replace(/\-/g, "") + Math.floor(Math.random() * 90 + 10);
//let phone_number13 = d.toISOString().split("T")[0].replace(/\-/g, "") + Math.floor(Math.random() * 90 + 10);


//prepare create new campaign API request
const create_campaign = async function (request_body, endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-Token', `${token.internal_token}`)
        .send(request_body);
}

//preparing property APIs request
const valid_key = async function (request_body, endpoint) {
    return baseUrl.put(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-ApiKey', `${token.apiKey}`)
        .send(request_body);
}
const invalid_key = async function (request_body, endpoint) {
    return baseUrl.put(endpoint)
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

const get_phone_number = function () {
    let tStamp = new Date().toISOString().replace(/(-)|(T)|(Z)|(:)|(\.)/g,"");
    let phone_number = tStamp.substring(tStamp.length-10,tStamp.length);
    return phone_number;
}

describe('Update Contact Api', async function () {

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
        contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].altphonenumber = get_phone_number();
        contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].firstname = contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].firstname + randomNumber;
        contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].lastname = contact_data.Addcontacts_withSingle_PhoneNumber.contacts[0].lastname + randomNumber1;
        let testReqObj = contact_data.Addcontacts_withSingle_PhoneNumber;
        console.log(testReqObj);
        const response = await add_contact(testReqObj, '/api/contacts');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        new_contactid = body.ids[0];
        console.log(new_contactid);
    });

    it('should return 200 status code and update contact', async function () {
        Updatecontact_data.UpdateContact.phonenumbers[0].phonenumber = get_phone_number();
        let testReqObj = Updatecontact_data.UpdateContact;
        console.log(testReqObj);
        const response = await valid_key(testReqObj, `/api/contact/${new_contactid}`);
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

    it('should return 403 status code for invaild api key', async function () {
        let testReqObj = Updatecontact_data.UpdateContact;
        const response = await invalid_key(testReqObj, `/api/contact/${new_contactid}`);
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
    });

    /*it('should return 200 update new list in the contact', async function () {
        let testReqObj = Updatecontact_data.UpdateContact_list;
        const response = await valid_key(testReqObj, `/api/contact/${new_contactid}`);
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });*/
});