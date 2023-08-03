describe("AUTH Requests", () => {

  it("REGISTER NOT SUCCESS - Username already used", () => {
    cy.fixture("newUser").then((data) => {
      const newUser = data;

      cy.request({
        method: "POST",
        url: "http://localhost:5000/api/auth/register",
        body: newUser,
      }).then((response) => {
        if (response.status !== 201) {
          cy.log({
            name: 'Authentication',
            message: 'failed'
          })
        } else {
          expect(response.status).to.eq(201);
        }
      })
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
