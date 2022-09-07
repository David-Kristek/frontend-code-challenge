describe("pages", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("should navigate to favorite page", () => {
    cy.contains("Favorites").click();
    cy.url().should("include", "favorites");
    cy.contains("All").click();
    cy.url().should("not.include", "favorites");
  });
  it("should change layout", () => {
    cy.get("[data-testid='listButton']").click();
    cy.get("[data-testid='layoutlist']").should("exist");
    cy.reload();
    cy.get("[data-testid='layoutlist']").should("exist");
    cy.get("[data-testid='gridButton']").click();
    cy.get("[data-testid='layoutgrid']").should("exist");
  });
});
