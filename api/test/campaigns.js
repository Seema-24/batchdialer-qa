const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const tv4 = require('tv4');
const fs = require('fs');

const d = new Date();
let timestamp= [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()].join('');

const token = JSON.parse(fs.readFileSync('./api/data/token.json', 'utf8'));
const campaign_data = JSON.parse(fs.readFileSync('./api/data/campaign.json', 'utf8'));


//adding timestamp in the campaignname
campaign_data.newCampaign.name = campaign_data.newCampaign.name + timestamp;
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
//create new campaign API request
const create_campaign = async function (request_body,endpoint) {
    return baseUrl.post(endpoint)
        .set('Content-Type', 'application/json')
        .set('X-Token', `${token.internal_token}`)
        .send(request_body);
}

describe('Campaigns API tests', async function () {
  
    it('should create a new campaign', async function () {
        let testReqObj = campaign_data.newCampaign;
        console.log(campaign_data.newCampaign.name);
        const response = await create_campaign(testReqObj,'/api/campaign');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });
    
    it('should return status code 200 with valid key', async function () {
        const response = await valid_key('/api/campaigns');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
    });
    
    it('should check if newly created campaign present in the response', async function () {
        const response = await valid_key('/api/campaigns');
        body = JSON.parse(JSON.stringify(response.body));        
        expect(body.map(e => (e.name))).to.include(campaign_data.newCampaign.name);
    });

    it('should verify if response is a valid json and an array', async function () {
        const response = await valid_key('/api/campaigns');
        body = JSON.parse(JSON.stringify(response.body));
        expect(body).to.be.an('array');
    });

    it('should return status code 403 with invalid key', async function () {
        const response = await invalid_key('/api/campaigns');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(403);
        expect(body.msg).to.equal("Wrong API key");
    });

    it('should return status code 404 with invalid url', async function () {
        const response = await valid_key('/api/campaig');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(404);
        
    });

    it('should verify all fields in the response', async function () {
        const response = await valid_key('/api/campaigns');
        body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body[0]).to.have.property("id");
        expect(body[0]).to.have.property("parentid");
        expect(body[0]).to.have.property("name");
        expect(body[0]).to.have.property("mode");
        expect(body[0]).to.have.property("recyclecount");
        expect(body[0]).to.have.property("level");
    });
});
