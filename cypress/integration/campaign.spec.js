import Campaign from "../support/pages/Campaigns";

let fixtureData;
let randNum = Math.floor(Math.random() * 100);
const addCamp = new Campaign();

describe("Add Campaign flow", () => {
  before(() => {
    cy.fixture("constants")
      .then((data) => (fixtureData = data))
      .then(() => {
        cy.visit(fixtureData.url, { failOnStatusCode: false });
      });
  });

  it.skip("Should Login", () => {
    cy.Login(fixtureData.username, fixtureData.password);
  });

  it("Should Add New Campaign ", () => {
    addCamp.clickCampaignMenu();
    cy.wait(3000);
    addCamp.clickAddNewCampaign();
    addCamp.enableAdvancedSwitchBar();
    addCamp.enterName(fixtureData.campaignName + randNum.toString());
    addCamp.selectDialingModeOption("Predictive Dialer");
    addCamp.clickNextCircleArrow();
    addCamp.selectCallerId("2830");
    addCamp.selectCallResultsOption("Answering Machine");
    addCamp.clickNextCircleArrow();
    addCamp.selectAgentsDrpdwn("Sandeep Kumar");
    addCamp.clickCreateCampButton();
  });

  it("Should show added contacts in table", () => {
    addCamp.clickCampaignMenu();
    addCamp.verifyAddedCampaign(fixtureData.campaignName + randNum.toString());
  });

  it("Verify Campaign Status is applied correctly", () => {
    addCamp.clickCampaignMenu();
    addCamp.changesCampaignStatus(
      fixtureData.campaignName + randNum.toString(),
      "active"
    );
    addCamp.clickToSelectPasused();
    addCamp.changeCampaignStatusByDrpdwn("Paused");
    addCamp.verifyAddedCampaign(fixtureData.campaignName + randNum.toString());
    addCamp.changesCampaignStatus(
      fixtureData.campaignName + randNum.toString(),
      "paused"
    );
    addCamp.clickToSelectActive();
    addCamp.changeCampaignStatusByDrpdwn("Active");
    addCamp.verifyAddedCampaign(fixtureData.campaignName + randNum.toString());
    cy.reload();
  });
});