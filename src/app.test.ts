import request from "supertest";
import { app } from "./app";

describe("App healthcheck", () => {
  it("deve responder status ok em GET /health", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body).toEqual({ status: "ok" });
  });
});
