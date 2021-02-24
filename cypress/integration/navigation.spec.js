describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday and background color should be white", ()=> {
    cy.contains('[data-testid=day]', 'Tuesday').click().should("have.class", "day-list__item--selected");
  });
});
