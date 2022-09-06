describe("pokemons filtering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("should search for pokemons", () => {
    cy.get("input[type=text]").type("Ve");
    cy.get("[data-testid='filterLoading']").should("exist");
    cy.get("[data-testid='skeletonLoadinggrid']").should("not.exist");
    cy.get('[data-testid="card"]')
      .should("have.length", 5)
      .each(($card, index, $cards) => {
        cy.wrap($card).find("h3").contains("Ve", { matchCase: false });
      });
    cy.get("input[type=text]").focus().clear();
    cy.get('[data-testid="card"]').should("have.length", 16);
    cy.get("[data-testid='filterLoading']").should("not.exist");
  });
  it("should fiter pokemons by types", () => {
    cy.get("[data-testid='pokemonTypeSelect']").click();
    cy.contains("Grass").click();
    cy.get("[data-testid='filterLoading']").should("exist");
    cy.get("[data-testid='skeletonLoadinggrid']").should("not.exist");
    cy.get('[data-testid="card"]')
      .should("have.length", 14)
      .each(($card, index, $cards) => {
        cy.wrap($card).find("p").contains("grass", { matchCase: false });
      });
    cy.get("[data-testid='pokemonTypeSelect']").click();
    cy.get("[data-testid='pokemonTypeSelect']").contains("All").click();
    cy.get("[data-testid='filterLoading']").should("not.exist");
    cy.get('[data-testid="card"]')
      .should("have.length", 16)
      .each(($card, index, $cards) => {
        if (index === 3) cy.wrap($card).find("p").contains("Fire");
      });
  });
});
