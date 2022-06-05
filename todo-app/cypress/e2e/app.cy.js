/// <reference types="cypress" />
import { v4 as uuidv4 } from "uuid";

describe("app tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("if there is no todo, shows not found ", () => {
    cy.get(".notFound").contains(/not found/i);
  });

  it("get todos", () => {
    cy.request("GET", "http://localhost:3000/todos");
    cy.get(".leftTodos").should("have.text", "0 left");
  });

  it("add todo", () => {
    const newTodo = {
      name: "Todo Example",
      id: uuidv4(),
      completed: false,
    };
    cy.intercept("POST", "http://localhost:3000/todos", newTodo);
    cy.get(".addInput")
      .type("Todo Example")
      .should("have.value", "Todo Example");
    cy.get(".addButton").should("contains", /add/i).click();
    cy.get(".addInput").should("have.value", "");

    cy.get(".leftTodos").should("have.text", "1 left");
  });

  it("delete Todo", () => {
    cy.get(".addInput").type("Todo Item");
    cy.get(".addButton").click();

    cy.get(".leftTodos").contains("1 left");

    cy.get(".todo-item")
      .first()
      .contains(/delete/i)
      .click();

    cy.get(".leftTodos").contains("0 left");
  });

  it.only("check a todo", () => {
    cy.get(".addInput").type("Todo 1");
    cy.get(".addButton").click();

    cy.get(".leftTodos").contains(/1 left/i);
    cy.get(".todo-item").first().get('[type="checkbox"]').click();
    cy.get(".leftTodos").contains(/0 left/i);
  });
});
