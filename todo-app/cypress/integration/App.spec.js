describe("App Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Add Todo", () => {
    cy.get("input").type("todo 1");
    cy.get("button").click();
    cy.get("li").contains('todo 1')
  });
});
