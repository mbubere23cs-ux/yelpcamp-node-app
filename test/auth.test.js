const middleware = require("../middleware");

test("isLoggedIn middleware should be defined", () => {
  expect(middleware.isLoggedIn).toBeDefined();
});

test("checkCampgroundOwnership middleware should be defined", () => {
  expect(middleware.checkCampgroundOwnership).toBeDefined();
});
