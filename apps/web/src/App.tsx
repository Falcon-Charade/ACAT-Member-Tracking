import { useState } from 'react';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { Activity, Users } from 'lucide-react';
import { AuthProvider } from '@/features/auth/auth-state';
import { RouteGuard } from '@/features/auth/RouteGuard';
import { MembersProvider } from '@/features/members/MembersProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddMemberPage } from '@/pages/AddMemberPage';
import { EditMemberPage } from '@/pages/EditMemberPage';
import { ViewMemberPage } from '@/pages/ViewMemberPage';
import { HomePage } from '@/pages/HomePage';
import { LoginDialog } from '@/pages/LoginDialog';
import {
  BadRequestPage,
  CreatedPage,
  DeletedPage,
  ForbiddenPage,
  MaintenancePage,
  PageNotFoundPage,
  RateLimitedPage,
  RecordNotFoundPage,
  ServerErrorPage,
  TimeoutPage,
  UnauthenticatedPage,
} from '@/pages/status-pages';
import { STATUS_ROUTES } from '@/routes/status-routes';

function AppLayout() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Users className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                ACAT Member Tracking
              </h1>
              <p className="text-sm text-muted-foreground">
                Membership status, progression, and readiness
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden gap-1.5 sm:inline-flex">
              <Activity className="size-3.5" aria-hidden="true" />
              Local setup
            </Badge>
            <Button type="button" onClick={() => setLoginOpen(true)}>
              Sign in
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}

function AppProviders() {
  return (
    <AuthProvider>
      <MembersProvider>
        <AppLayout />
      </MembersProvider>
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppProviders />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'add',
        element: (
          <RouteGuard requirePermission="canCreateMembers">
            <AddMemberPage />
          </RouteGuard>
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteGuard requirePermission="canViewMembers">
            <ViewMemberPage />
          </RouteGuard>
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteGuard requirePermission="canEditMembers">
            <EditMemberPage />
          </RouteGuard>
        ),
      },
      {
        path: STATUS_ROUTES.created.slice(1),
        element: <CreatedPage />,
      },
      {
        path: STATUS_ROUTES.deleted.slice(1),
        element: <DeletedPage />,
      },
      {
        path: STATUS_ROUTES.badRequest.slice(1),
        element: <BadRequestPage />,
      },
      {
        path: STATUS_ROUTES.unauthenticated.slice(1),
        element: <UnauthenticatedPage />,
      },
      {
        path: STATUS_ROUTES.forbidden.slice(1),
        element: <ForbiddenPage />,
      },
      {
        path: STATUS_ROUTES.recordNotFound.slice(1),
        element: <RecordNotFoundPage />,
      },
      {
        path: STATUS_ROUTES.rateLimited.slice(1),
        element: <RateLimitedPage />,
      },
      {
        path: STATUS_ROUTES.serverError.slice(1),
        element: <ServerErrorPage />,
      },
      {
        path: STATUS_ROUTES.maintenance.slice(1),
        element: <MaintenancePage />,
      },
      {
        path: STATUS_ROUTES.timeout.slice(1),
        element: <TimeoutPage />,
      },
      {
        path: '*',
        element: <PageNotFoundPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
