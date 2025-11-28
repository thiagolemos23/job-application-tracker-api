import { applicationRepository } from "./application.repository";

type CreateApplicationInput = {
  company: string;
  position: string;
  status: string;
  source: string;
  notes?: string;
};

type UpdateApplicationInput = Partial<CreateApplicationInput>;

export const applicationService = {
  async createApplication(data: CreateApplicationInput) {
    // aqui depois você pode validar status, campos obrigatórios, etc.
    return applicationRepository.create(data);
  },

  async listApplications() {
    return applicationRepository.findAll();
  },

  async getApplication(id: string) {
    const app = await applicationRepository.findById(id);

    if (!app) {
      // depois vamos tratar isso melhor nos testes
      throw new Error("Application not found");
    }

    return app;
  },

  async updateApplication(id: string, data: UpdateApplicationInput) {
    // garante que existe antes de tentar atualizar
    await this.getApplication(id);
    return applicationRepository.update(id, data);
  },

  async deleteApplication(id: string) {
    await this.getApplication(id);
    await applicationRepository.delete(id);
  },
};
