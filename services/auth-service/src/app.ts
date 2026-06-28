import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import { rateLimit } from "./middlewares/rateLimit.middleware";
import authRoutes from "./modules/routes/auth.route";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit);

app.use("/api/v1/auth", authRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
  });
});

app.use(errorHandler);

export default app;
