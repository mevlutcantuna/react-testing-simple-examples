/// <reference types="cypress" />

const allChractersUrl = "https://rickandmortyapi.com/api/character?page=1";

const searchCharactersUrl =
  "https://rickandmortyapi.com/api/character?name=Alan&Rails";

describe("app tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", allChractersUrl, { fixture: "characters.json" }).as(
      "getAll"
    );
  });

  it("headers renders correctly", () => {
    cy.get('[data-cy="header"]')
      .contains(/rick and morty/i)
      .should("be.visible");
  });

  // before loading characters, shows loading
  it("before loading characters, shows loading", () => {
    cy.get('[data-cy="loading"]')
      .contains(/loading/i)
      .should("be.visible");
  });

  // loads characters when page initializes
  it("loads characters when page initializes", () => {
    cy.get('[data-cy="card-item"]').should("have.length", 3);
  });

  it("search characters correctly", () => {
    cy.intercept("GET", searchCharactersUrl, {
      fixture: "searchCharacters.json",
    });
    cy.get('[type="text"]').type("Alan Rails");
    cy.get('[data-cy="search"]').click();

    cy.get('[data-cy="card-item"]').should("have.length", 1);
    cy.get('[data-cy="card-item"]')
      .contains(/alan rails/i)
      .should("be.visible");
  });
});
