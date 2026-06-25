import type { FastifyInstance } from 'fastify';
import { memberFieldDocumentation, sessionFieldDocumentation, permissionFieldDocumentation } from '@acat/shared-types/member/member.docs';

export async function docDTOMember(app: FastifyInstance): Promise<void> {
  app.get('/api/doc/DTO', async () => {
    return {
      member: "Documentation for the Member DTO",
      session: "Documentation for the Session DTO",
      permissions: "Documentation for the Permissions DTO"
    };
  });

  app.get('/api/doc/DTO/member', async () => {
    return memberFieldDocumentation;
  });

  app.get('/api/doc/DTO/session', async () => {
    return sessionFieldDocumentation;
  });

  app.get('/api/doc/DTO/permissions', async () => {
    return permissionFieldDocumentation;
  });
}