export const STATUS_ROUTES = {
  created: '/status/201',
  deleted: '/status/204',
  badRequest: '/status/400',
  unauthenticated: '/status/401',
  forbidden: '/status/403',
  recordNotFound: '/status/404-record',
  rateLimited: '/status/429',
  serverError: '/status/500',
  maintenance: '/status/503',
  timeout: '/status/504',
} as const;

export type StatusRouteKey = keyof typeof STATUS_ROUTES;
