/// <reference types="cypress" />

describe("app tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "**/todos", { fixture: "todos.json" }).as("deneme");
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
  it("delete a todo correctly", () => {
    cy.intercept("DELETE", "**/todos/1", {}).as("del-todo");

    cy.get(".todos")
      .first()
      .contains(/delete/i)
      .click();

    cy.wait("@del-todo");

    cy.get(".leftTodos").should("have.text", "2 left");
  });

  // check todo correctly
  it("check todo correctly", () => {
    const updatedTodo = {
      name: "Buy Milk",
      id: "1",
      completed: true,
    };

    cy.intercept("PUT", "**/todos/*", { body: updatedTodo }).as("check-todo");
    cy.get('.todo-item > [type="checkbox"]').first().check();

    cy.wait("@check-todo");

    cy.get(".leftTodos").contains("2 left");
  });

  // uncheck todo correctly
  it("uncheck todo correctly", () => {
    cy.get(".leftTodos").contains("3 left");

    // check last todo
    const checkedTodo = {
      name: "Go to Garden",
      id: "3",
      completed: true,
    };

    cy.intercept("PUT", "**/todos/*", { body: checkedTodo }).as("check-todo");
    cy.get('.todo-item > [type="checkbox"]').last().check();
    cy.wait("@check-todo");

    cy.get(".leftTodos").contains("2 left");

    // uncheck last todo
    const uncheckedTodo = {
      name: "Go to Garden",
      id: "3",
      completed: false,
    };

    cy.intercept("PUT", "**/todos/*", { body: uncheckedTodo }).as(
      "uncheck-todo"
    );
    cy.get('.todo-item > [type="checkbox"]').last().uncheck();
    cy.wait("@uncheck-todo");

    cy.get(".leftTodos").contains("3 left");
  });

  // delete all todo,shows not found todo correctly
  it("delete all todo,shows not found todo correctly", () => {
    cy.intercept("DELETE", "**/todos/*", {}).as("del-todo");

    cy.get(".todos > .todo-item").each(($el, index, $list) => {
      cy.intercept("DELETE", "**/todos/*", {}).as("del-todo");
      cy.get(".todo-item")
        .last()
        .contains(/delete/i)
        .click();

      cy.wait("@del-todo");
    });

    cy.get(".notFound").should("be.visible");

    cy.get(".leftTodos").contains(/0 left/i);
  });
});
