const request = require("supertest");
const app = require("../app");

test("GET /campgrounds should respond within 500ms", async () => {
  const start = Date.now();

  const response = await request(app).get("/campgrounds");

  const duration = Date.now() - start;

  console.log("Response time:", duration, "ms");

  expect(response.statusCode).toBe(200);
  expect(duration).toBeLessThan(500);
});
