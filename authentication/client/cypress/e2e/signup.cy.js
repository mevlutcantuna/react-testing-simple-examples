/// <reference types="Cypress" />

describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  // provide all inputs
  it("provide all inputs", () => {
    cy.get("button")
      .contains(/signup/i)
      .click();
    cy.get(".form-notification")
      .contains(/please provide all inputs.../i)
      .should("be.visible");
  });

  // the account exists
  it.only("the account exists", () => {
    cy.get('[type="text"]').type("Mevlüt Can Tuna");
    cy.get('[type="email"]').type("mttuna90@gmail.com");
    cy.get('[type="password"]').type("123123");

    // intercept is not working...
    cy.intercept("POST", "**/api/auth/signup", {
      errorMessage: "The Account Not Found...",
    }).as("signup");

    cy.get('[data-cy="signup-btn"]').click();

    cy.get(".form-notification")
      .contains(/loading/i)
      .should("be.visible");

    cy.get(".form-notification")
      .contains(/the account already exists/i)
      .should("be.visible");
  });

  // signup correctly and redirect to login page
  it("signup correctly and redirect to login page", () => {
    cy.get('[type="text"]').type("Example Example");
    cy.get('[type="email"]').type("example@gmail.com");
    cy.get('[type="password"]').type("123123");

    cy.intercept("POST", "**/api/auth/signup/*", { fixture: "user.json" }).as(
      "signup"
    );

    cy.get('[data-cy="signup-btn"]').click();

    cy.get(".form-notification")
      .contains(/loading/i)
      .should("be.visible");

    cy.get(".container__title").contains(/login/i);
  });
});
