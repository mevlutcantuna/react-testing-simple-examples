/// <reference types="Cypress" />

describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("passes", () => {});
});
