const request = require("supertest");
const app = require("../app");

test("GET /campgrounds should return status 200", async () => {
  const response = await request(app).get("/campgrounds");
  expect(response.statusCode).toBe(200);
});
