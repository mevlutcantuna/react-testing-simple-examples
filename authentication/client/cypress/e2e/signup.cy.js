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
  it("the account exists", () => {
    cy.get('[type="text"]').type("Mevlüt Can Tuna");
    cy.get('[type="email"]').type("mttuna90@gmail.com");
    cy.get('[type="password"]').type("123123");

    // intercept is not working...
    cy.intercept("POST", "**/api/auth/signup", {
      statusCode: 404,
      body: {
        errorMessage: "The Account Already Exists...",
      },
    }).as("signup");

    cy.get('[data-cy="signup-btn"]').click();

    cy.wait("@signup").then((xhr) => {
      expect(xhr.response.statusCode).to.equal(404);
      expect(xhr.response.body.errorMessage).to.equal(
        "The Account Already Exists..."
      );
    });

    cy.get(".form-notification")
      .contains(/the account already exists/i)
      .should("be.visible");
  });

  // signup correctly and redirect to login page
  it("signup correctly and redirect to login page", () => {
    cy.get('[type="text"]').type("Example Example");
    cy.get('[type="email"]').type("example@gmail.com");
    cy.get('[type="password"]').type("123123");

    cy.intercept("POST", "**/api/auth/signup", {
      fixture: "user.json",
      statusCode: 200,
    }).as("signup");

    cy.get('[data-cy="signup-btn"]').click();

    cy.wait("@signup").then((xhr) => {
      console.log(xhr.response.body);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.body.user.email).to.equal("example@gmail.com");
    });

    cy.get(".container__title").contains(/login/i);
  });

  it("go to login button works correctly", () => {
    cy.get('[data-cy="link-item"]').click();
    cy.get(".container__title").contains(/login/i);
  });
});
