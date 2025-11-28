import { PrismaClient, Application } from "@prisma/client";

const prisma = new PrismaClient();

type CreateApplicationInput = {
  company: string;
  position: string;
  status: string;
  source: string;
  notes?: string;
};

type UpdateApplicationInput = Partial<CreateApplicationInput>;

export const applicationRepository = {
  create(data: CreateApplicationInput): Promise<Application> {
    return prisma.application.create({ data });
  },

  findAll(): Promise<Application[]> {
    return prisma.application.findMany({
      orderBy: { appliedAt: "desc" },
    });
  },

  findById(id: string): Promise<Application | null> {
    return prisma.application.findUnique({
      where: { id },
    });
  },

  update(id: string, data: UpdateApplicationInput): Promise<Application> {
    return prisma.application.update({
      where: { id },
      data,
    });
  },

  delete(id: string): Promise<Application> {
    return prisma.application.delete({
      where: { id },
    });
  },
};
