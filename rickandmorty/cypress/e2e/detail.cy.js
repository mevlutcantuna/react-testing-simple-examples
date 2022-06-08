const detailUrl = "https://rickandmortyapi.com/api/character/2";

describe("detail page tests", () => {
  beforeEach(() => {
    cy.visit("/character/2");
    cy.intercept("GET", detailUrl, { fixture: "detailChracter.json" });
  });

  it("loads details of the character correctly", () => {
    cy.get('[alt="detail-img"]').should("be.visible");
  });
});
