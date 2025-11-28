import request from "supertest";
import { app } from "../../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Applications routes (integration)", () => {
  beforeAll(async () => {
    await prisma.$connect();
    await prisma.application.deleteMany();
  });

  afterAll(async () => {
    await prisma.application.deleteMany();
    await prisma.$disconnect();
  });

  it("deve criar uma candidatura via POST /applications", async () => {
    const response = await request(app)
      .post("/applications")
      .send({
        company: "Empresa Teste",
        position: "Dev Jr Backend",
        status: "aplicado",
        source: "linkedin",
        notes: "candidatura criada no teste",
      })
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.company).toBe("Empresa Teste");
  });

  it("deve listar candidaturas via GET /applications", async () => {
    const response = await request(app).get("/applications").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0]).toHaveProperty("company");
    expect(response.body[0]).toHaveProperty("position");
  });
});

it("deve buscar uma candidatura por id via GET /applications/:id", async () => {
  // cria primeiro
  const createResponse = await request(app).post("/applications").send({
    company: "Empresa Y",
    position: "Dev Jr Fullstack",
    status: "aplicado",
    source: "gupy",
  });

  const id = createResponse.body.id as string;

  const getResponse = await request(app)
    .get(`/applications/${id}`)
    .expect(200);

  expect(getResponse.body.id).toBe(id);
  expect(getResponse.body.company).toBe("Empresa Y");
});

it("deve atualizar uma candidatura via PUT /applications/:id", async () => {
  const createResponse = await request(app).post("/applications").send({
    company: "Empresa Z",
    position: "Dev Jr Backend",
    status: "aplicado",
    source: "linkedin",
  });

  const id = createResponse.body.id as string;

  const updateResponse = await request(app)
    .put(`/applications/${id}`)
    .send({ status: "entrevista" })
    .expect(200);

  expect(updateResponse.body.status).toBe("entrevista");
});

it("deve deletar uma candidatura via DELETE /applications/:id", async () => {
  const createResponse = await request(app).post("/applications").send({
    company: "Empresa W",
    position: "Dev Jr",
    status: "aplicado",
    source: "referencia",
  });

  const id = createResponse.body.id as string;

  await request(app).delete(`/applications/${id}`).expect(204);

  // garante que o controller trate o 404
  await request(app).get(`/applications/${id}`).expect(404);
});

it("deve retornar 404 ao tentar atualizar candidatura inexistente", async () => {
  await request(app)
    .put("/applications/id-inexistente")
    .send({ status: "oferta" })
    .expect(404);
});

it("deve retornar 404 ao tentar deletar candidatura inexistente", async () => {
  await request(app).delete("/applications/id-inexistente").expect(404);
});
