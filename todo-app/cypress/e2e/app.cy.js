/// <reference types="cypress" />
import { v4 as uuidv4 } from "uuid";

describe("app tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "**/todos", { fixture: "todos.json" });
  });

  // all todos load correctly
  it("all todos load correctly", () => {
    cy.get(".leftTodos").should("have.text", "3 left");
  });

  // add a new todo correctly
  it("add a new todo correctly", () => {
    const newTodo = {
      id: 20,
      name: "New Todo 20",
      completed: false,
    };
    cy.intercept("POST", "**/todos", newTodo);

    cy.get(".addInput").type(newTodo.name);
    cy.get(".addButton").click();

    cy.get(".todos").contains(newTodo.name).should("be.visible");
  });

  // delete a todo correctly
  it.only("delete a todo correctly", () => {
    cy.intercept("DELETE", "**/todos/1", {});
    cy.get(".todos")
      .first()
      .contains(/delete/i)
      .click();

    const leftTodos = [
      {
        name: "Todo 2",
        id: "2",
        completed: false,
      },
      {
        name: "Go to Garden",
        id: "3",
        completed: false,
      },
    ];

    cy.intercept("GET", "**/todos", {
      body: leftTodos,
    });

    //cy.get(".leftTodos").should("have.text", "2 left");
  });

  // check todo correctly
  // uncheck todo correctly
  // delete all todo,shows not found todo correctly
});
