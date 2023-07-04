describe("User's HTTP Requests", () => {
  // it("LOGIN", () => {
  //   cy.fixture("newUser").then((data) => {
  //     const newUser = data;

  //     cy.request({
  //       method: "POST",
  //       url: "http://localhost:5000/api/auth/login",
  //       body: newUser,
  //     }).then((response) => {
  //       expect(response.status).to.eq(200);
  //       expect(response.body.accessToken);
  //     });
  //   });
  // });

  let initialAllUsersLength;
  let initialUserAllListsLength;
  let newUserId = "64a2cea948dc1af679aeeafa";
  let newListId;

  it("GET All Users", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:5000/api/user",
    }).then((response) => {
      expect(response.status).to.eq(200);

      initialAllUsersLength = response.body.length;
    });
  });

  it("GET User", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:5000/api/user/${newUserId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("POST List", () => {
    cy.fixture("newList").then((data) => {
      cy.request({
        method: "POST",
        url: `http://localhost:5000/api/user/${newUserId}/newList`,
        body: data,
      }).then((response) => {
        expect(response.status).to.eq(201);

        newListId = response.body._id;
      });
    });
  });

  it("UPDATE List", () => {
    cy.fixture("updatedList").then((data) => {
      cy.request({
        method: "PUT",
        url: `http://localhost:5000/api/user/${newUserId}/list/${newListId}/updatedList`,
        body: data,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it("DELETE List", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:5000/api/user/${newUserId}/list/${newListId}/deletedList`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
