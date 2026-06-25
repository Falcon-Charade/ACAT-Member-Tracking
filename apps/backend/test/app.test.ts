import { describe, expect, it } from 'vitest';
import {
  memberFieldDocumentation,
  permissionFieldDocumentation,
  sessionFieldDocumentation
} from '@acat/shared-types/member/member.docs';
import { buildApp } from '../src/app.js';

describe('backend app routes', () => {
  it('reports service health', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/api/health'
    });

    await app.close();

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      success: true,
      service: 'backend'
    });
    expect(Date.parse(response.json().timestamp)).not.toBeNaN();
  });

  it('lists top-level API resources', async () => {
    const app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/api'
    });

    await app.close();

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      health: 'API to check the health of the service',
      docs: 'API to access documentation'
    });
  });

  it('serves DTO documentation indexes', async () => {
    const app = buildApp();

    const docsResponse = await app.inject({
      method: 'GET',
      url: '/api/doc'
    });
    const dtoResponse = await app.inject({
      method: 'GET',
      url: '/api/doc/DTO'
    });

    await app.close();

    expect(docsResponse.statusCode).toBe(200);
    expect(docsResponse.json()).toEqual({
      DTO: 'Documentation for Data Transfer Objects (DTOs) used in the API'
    });
    expect(dtoResponse.statusCode).toBe(200);
    expect(dtoResponse.json()).toEqual({
      member: 'Documentation for the Member DTO',
      session: 'Documentation for the Session DTO',
      permissions: 'Documentation for the Permissions DTO'
    });
  });

  it('serves shared member, session, and permission documentation', async () => {
    const app = buildApp();

    const memberResponse = await app.inject({
      method: 'GET',
      url: '/api/doc/DTO/member'
    });
    const sessionResponse = await app.inject({
      method: 'GET',
      url: '/api/doc/DTO/session'
    });
    const permissionsResponse = await app.inject({
      method: 'GET',
      url: '/api/doc/DTO/permissions'
    });

    await app.close();

    expect(memberResponse.statusCode).toBe(200);
    expect(memberResponse.json()).toEqual(memberFieldDocumentation);
    expect(sessionResponse.statusCode).toBe(200);
    expect(sessionResponse.json()).toEqual(sessionFieldDocumentation);
    expect(permissionsResponse.statusCode).toBe(200);
    expect(permissionsResponse.json()).toEqual(permissionFieldDocumentation);
  });
});
