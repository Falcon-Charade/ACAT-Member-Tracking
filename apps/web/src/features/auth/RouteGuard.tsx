import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { STATUS_ROUTES } from '@/routes/status-routes';
import { useAuth } from './auth-state';

interface RouteGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requirePermission?: keyof Pick<
    ReturnType<typeof useAuth>,
    'canViewMembers' | 'canCreateMembers' | 'canEditMembers' | 'canDeleteMembers'
  >;
}

export function RouteGuard({
  children,
  requireAuth = false,
  requirePermission,
}: RouteGuardProps) {
  const auth = useAuth();

  if (requireAuth && !auth.authenticated) {
    return <Navigate to={STATUS_ROUTES.unauthenticated} replace />;
  }

  if (requirePermission && !auth[requirePermission]) {
    return <Navigate to={STATUS_ROUTES.forbidden} replace />;
  }

  return children;
}
