import { Router } from "express";
import { applicationController } from "./application.controller";

export const applicationRouter = Router();

applicationRouter.post("/", applicationController.create);
applicationRouter.get("/", applicationController.list);
applicationRouter.get("/:id", applicationController.getById);
applicationRouter.put("/:id", applicationController.update);
applicationRouter.delete("/:id", applicationController.delete);
