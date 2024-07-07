describe("graphify", () => {
	it("exports diagram as XML", () => {
		cy.visit("http://localhost:4200/");
		cy.get("#export-btn").click();
		cy.get("#export-as-xml").click();
	});
});
