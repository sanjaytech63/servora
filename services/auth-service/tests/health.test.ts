import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../src/app";

describe("Health Check", () => {
  it("returns 200", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
  });
});
