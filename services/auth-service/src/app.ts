import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import { rateLimit } from "./middlewares/rateLimit.middleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit);
app.use(errorHandler);

export default app;