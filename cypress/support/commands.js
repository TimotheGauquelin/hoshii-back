Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:5000/api/auth/login",
    body: {
      username: "TestUser",
      password: "TestUser",
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.setLocalStorage("accessToken", response.body.accessToken);
  });
});
