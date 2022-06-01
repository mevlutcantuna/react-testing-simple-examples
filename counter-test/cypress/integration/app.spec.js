/// <reference types="Cypress" />

describe("Test App Comp", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("increase count", () => {
    cy.get(".count").should("have.text", 0);
    cy.get(".increment").click();
    cy.get(".count").should("have.text", 1);
  });

  it("decrease count", () => {
    cy.get(".count").should("have.text", 0);
    cy.get(".decrement").click();
    cy.get(".count").should("have.text", -1);
  });
});
