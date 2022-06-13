/// <reference types="Cypress" />

describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  // not found account
  it("not found account", () => {
    cy.get('[type="email"]').type("noneuser@gmail.com");
    cy.get('[type="password"]').type("nonepassword");

    const notification = "The Account Not Found...";

    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 404,
      body: { errorMessage: notification },
    }).as("login");

    cy.get('[data-cy="login-btn"]').click();

    cy.wait("@login").then((xhr) => {
      expect(xhr.response.statusCode).to.equal(404);
      expect(xhr.response.body.errorMessage).to.equal(notification);
    });

    cy.get(".form-notification")
      .contains(/the account not found.../i)
      .should("be.visible");
  });

  // the password is wrong
  it("the password is wrong", () => {
    cy.get('[type="email"]').type("mttuna90@gmail.com");
    cy.get('[type="password"]').type("wrongpassword");

    const notification = "The Password is Wrong";

    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 404,
      body: { errorMessage: notification },
    }).as("login");

    cy.get('[data-cy="login-btn"]').click();

    cy.wait("@login").then((xhr) => {
      expect(xhr.response.statusCode).to.equal(404);
      expect(xhr.response.body.errorMessage).to.equal(notification);
    });

    cy.get(".form-notification").contains(notification).should("be.visible");
  });

  // login correctly
  it.only("login correcty,then returns to app page", () => {
    cy.get('[type="email"]').type("example@gmail.com");
    cy.get('[type="password"]').type("123123");

    cy.intercept("POST", "**/api/auth/login", {
      fixture: "user.json",
      statusCode: 200,
    }).as("login");

    cy.get('[data-cy="login-btn"]').click();

    cy.wait("@login").then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.body.user.email).to.equal("example@gmail.com");
    });

    cy.get(".app").contains(/app page/i);
  });

  // go to signup link works correcty
});
