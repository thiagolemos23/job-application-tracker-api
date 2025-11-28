import { Request, Response } from "express";
import { applicationService } from "./application.service";

export const applicationController = {
  async create(req: Request, res: Response) {
    try {
      const app = await applicationService.createApplication(req.body);
      return res.status(201).json(app);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Error creating application" });
    }
  },

  async list(req: Request, res: Response) {
    const apps = await applicationService.listApplications();
    return res.json(apps);
  },

  async getById(req: Request, res: Response) {
    try {
      const app = await applicationService.getApplication(req.params.id);
      return res.json(app);
    } catch (err) {
      return res.status(404).json({ message: "Application not found" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const app = await applicationService.updateApplication(
        req.params.id,
        req.body
      );
      return res.json(app);
    } catch (err) {
      return res.status(404).json({ message: "Application not found" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await applicationService.deleteApplication(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(404).json({ message: "Application not found" });
    }
  },
};
