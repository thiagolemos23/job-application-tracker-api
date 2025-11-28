import { applicationService } from "./application.service";
import { applicationRepository } from "./application.repository";
import { Application } from "@prisma/client";

jest.mock("./application.repository", () => {
  return {
    applicationRepository: {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
});

const mockRepo = applicationRepository as jest.Mocked<typeof applicationRepository>;

describe("applicationService", () => {
  it("deve criar uma candidatura chamando o repository corretamente", async () => {
    const input = {
      company: "Empresa X",
      position: "Dev Jr Backend",
      status: "aplicado",
      source: "linkedin",
      notes: "primeira vaga",
    };

    const stored: Application = {
      id: "uuid-qualquer",
      company: input.company,
      position: input.position,
      status: input.status,
      source: input.source,
      appliedAt: new Date(),
      notes: input.notes ?? null,
    };

    mockRepo.create.mockResolvedValueOnce(stored);

    const result = await applicationService.createApplication(input);

    expect(mockRepo.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(stored);
  });

  it("deve lançar erro se a candidatura não for encontrada ao buscar por id", async () => {
    mockRepo.findById.mockResolvedValueOnce(null);

    await expect(
      applicationService.getApplication("id-inexistente")
    ).rejects.toThrow("Application not found");
  });
});

it("deve listar todas as candidaturas chamando o repository.findAll", async () => {
  const apps = [
    {
      id: "1",
      company: "Empresa A",
      position: "Dev Jr",
      status: "aplicado",
      source: "linkedin",
      appliedAt: new Date(),
      notes: null,
    },
    {
      id: "2",
      company: "Empresa B",
      position: "Dev Jr Backend",
      status: "entrevista",
      source: "gupy",
      appliedAt: new Date(),
      notes: "processo em andamento",
    },
  ] as any;

  mockRepo.findAll.mockResolvedValueOnce(apps);

  const result = await applicationService.listApplications();

  expect(mockRepo.findAll).toHaveBeenCalled();
  expect(result).toEqual(apps);
});

it("deve atualizar uma candidatura existente", async () => {
  const id = "uuid-existente";

  const existingApp = {
    id,
    company: "Empresa X",
    position: "Dev Jr",
    status: "aplicado",
    source: "linkedin",
    appliedAt: new Date(),
    notes: null,
  } as any;

  const updatedApp = {
    ...existingApp,
    status: "entrevista",
  };

  mockRepo.findById.mockResolvedValueOnce(existingApp);
  mockRepo.update.mockResolvedValueOnce(updatedApp);

  const result = await applicationService.updateApplication(id, {
    status: "entrevista",
  });

  expect(mockRepo.findById).toHaveBeenCalledWith(id);
  expect(mockRepo.update).toHaveBeenCalledWith(id, { status: "entrevista" });
  expect(result).toEqual(updatedApp);
});

it("deve deletar uma candidatura existente", async () => {
  const id = "uuid-para-deletar";

  const existingApp = {
    id,
    company: "Empresa X",
    position: "Dev Jr",
    status: "aplicado",
    source: "linkedin",
    appliedAt: new Date(),
    notes: null,
  } as any;

  mockRepo.findById.mockResolvedValueOnce(existingApp);
  mockRepo.delete.mockResolvedValueOnce(existingApp);

  await applicationService.deleteApplication(id);

  expect(mockRepo.findById).toHaveBeenCalledWith(id);
  expect(mockRepo.delete).toHaveBeenCalledWith(id);
});
