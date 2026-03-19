import type { FastifyInstance } from 'fastify';

export async function apiRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api', async () => {
    return {
      health: "API to check the health of the service",
      docs: "API to access documentation"
    };
  });
}
