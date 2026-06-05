import { StatusPage, type StatusPageContent } from './StatusPage';

const statusContent = {
  created: {
    code: 201,
    title: 'Member added',
    description:
      'The member record was accepted and created successfully. This placeholder can become the confirmation screen after API integration.',
    tone: 'success',
    icon: 'success',
  },
  deleted: {
    code: 204,
    title: 'Member deleted',
    description:
      'The member record was deleted successfully and there is no response body to display.',
    tone: 'success',
    icon: 'trash',
  },
  badRequest: {
    code: 400,
    title: 'Invalid request data',
    description:
      'Some submitted fields were missing, invalid, or could not be understood by the server.',
    tone: 'warning',
    icon: 'invalid',
  },
  unauthenticated: {
    code: 401,
    title: 'Sign in required',
    description:
      'You need to authenticate with your Google account before accessing this action.',
    tone: 'warning',
    icon: 'auth',
  },
  forbidden: {
    code: 403,
    title: 'Permission required',
    description:
      'You are signed in, but your account does not have permission to perform this action.',
    tone: 'warning',
    icon: 'permission',
  },
  recordNotFound: {
    code: 404,
    title: 'Record not found',
    description:
      'The requested member record does not exist, may have been deleted, or is unavailable to this account.',
    tone: 'neutral',
    icon: 'not-found',
  },
  pageNotFound: {
    code: 404,
    title: 'Page not found',
    description:
      'The page address does not match any screen in the member tracking app.',
    tone: 'neutral',
    icon: 'not-found',
  },
  rateLimited: {
    code: 429,
    title: 'Rate limit exceeded',
    description:
      'Too many requests were sent in a short period. Wait a moment before trying again.',
    tone: 'warning',
    icon: 'rate-limit',
  },
  serverError: {
    code: 500,
    title: 'Server error',
    description:
      'Something went wrong on the server while processing the request.',
    tone: 'danger',
    icon: 'server',
  },
  maintenance: {
    code: 503,
    title: 'Backend under maintenance',
    description:
      'The backend is temporarily unavailable while maintenance is underway.',
    tone: 'warning',
    icon: 'maintenance',
  },
  timeout: {
    code: 504,
    title: 'Request timed out',
    description:
      'The backend did not respond in time. Try the request again shortly.',
    tone: 'warning',
    icon: 'timeout',
  },
} satisfies Record<string, StatusPageContent>;

export function CreatedPage() {
  return <StatusPage content={statusContent.created} />;
}

export function DeletedPage() {
  return <StatusPage content={statusContent.deleted} />;
}

export function BadRequestPage() {
  return <StatusPage content={statusContent.badRequest} />;
}

export function UnauthenticatedPage() {
  return <StatusPage content={statusContent.unauthenticated} />;
}

export function ForbiddenPage() {
  return <StatusPage content={statusContent.forbidden} />;
}

export function RecordNotFoundPage() {
  return <StatusPage content={statusContent.recordNotFound} />;
}

export function PageNotFoundPage() {
  return <StatusPage content={statusContent.pageNotFound} />;
}

export function RateLimitedPage() {
  return <StatusPage content={statusContent.rateLimited} />;
}

export function ServerErrorPage() {
  return <StatusPage content={statusContent.serverError} />;
}

export function MaintenancePage() {
  return <StatusPage content={statusContent.maintenance} />;
}

export function TimeoutPage() {
  return <StatusPage content={statusContent.timeout} />;
}
