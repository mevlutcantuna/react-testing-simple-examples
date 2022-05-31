/// <reference types="cypress" />

describe("App Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Add Todo", () => {
    const newItem1 = "Todo 1";
    const newItem2 = "Todo 2";
    cy.get(".addInput").type(newItem1);
    cy.get(".addButton").click();
    cy.get("li").contains(newItem1).should("exist");

    cy.get(".addInput").type(newItem2);
    cy.get(".addButton").click();
    cy.get("li").contains(newItem2).should("exist");

    cy.get("ul > li").should("have.length", 2);
  });

  it("delete a todo", () => {
    const newItem1 = "Todo 1";
    const newItem2 = "Todo 2";
    cy.get(".addInput").type(newItem1);

    cy.get(".addButton").click();

    cy.get(".addInput").type(newItem2);
    cy.get(".addButton").click();

    // delete first todo
    cy.get("ul > li").last().contains("Delete").click();
    cy.get("li").should("have.length", 1);
  });

  it("check a todo", () => {
    const newItem = "Todo 1";
    cy.get(".addInput").type(newItem);
    cy.get(".addButton").click();

    // check todo
    cy.get("ul > li").get('input[type="checkbox"]').check();
  });
});
