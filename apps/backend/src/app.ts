import Fastify, { type FastifyInstance } from 'fastify';
import { apiRoutes } from './routes/base.js';
import { docsRoutes } from './routes/docs.js';
import { healthRoutes } from './routes/health.js';
import { docDTOMember } from './routes/DTOs.js';

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true
  });

  app.register(apiRoutes);
  app.register(docsRoutes);
  app.register(healthRoutes);
  app.register(docDTOMember);

  return app;
}
