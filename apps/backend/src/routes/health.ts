import type { FastifyInstance } from 'fastify';

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/health', async () => {
    return {
      success: true,
      service: 'backend',
      timestamp: new Date().toISOString()
    };
  });
}
