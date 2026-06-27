import { Redis } from "@upstash/redis";
// import { env } from "./env";

export const redis = new Redis({
  url: "https://smashing-mayfly-100824.upstash.io",
  token: "gQAAAAAAAYnYAAIgcDJlZTc4MGY2YzcyNjk0NDg0Yjg4YmRhODIyOTY2Zjk5Mw",
});
