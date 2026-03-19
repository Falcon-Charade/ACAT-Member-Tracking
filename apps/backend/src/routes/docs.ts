import type { FastifyInstance } from 'fastify';

export async function docsRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/doc', async () => {
    return {
      DTO: "Documentation for Data Transfer Objects (DTOs) used in the API",
    };
  });
}
