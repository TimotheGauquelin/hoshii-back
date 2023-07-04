describe("AUTH Requests", () => {
  it("REGISTER", () => {
    cy.fixture("newUser").then((data) => {
      const newUser = data;

      cy.request({
        method: "POST",
        url: "http://localhost:5000/api/auth/register",
        body: newUser,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.username).to.eq(newUser.username);
        expect(response.body.email).to.eq(newUser.email);
      });
    });
  });

  it("LOGIN", () => {
    cy.fixture("newUser").then((data) => {
      const newUser = data;

      cy.request({
        method: "POST",
        url: "http://localhost:5000/api/auth/login",
        body: newUser,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.accessToken);
      });
    });
  });
});
