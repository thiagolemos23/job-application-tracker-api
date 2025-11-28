import express from "express";
import cors from "cors";
import { applicationRouter } from "./modules/applications/application.routes";

const app = express();

app.use(cors());
app.use(express.json());

// healthcheck básico
app.get("/health", (req, res) => {
  return res.json({ status: "ok" });
});

// rotas de candidaturas
app.use("/applications", applicationRouter);

export { app };

