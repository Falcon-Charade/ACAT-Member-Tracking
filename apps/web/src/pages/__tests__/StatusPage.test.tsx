import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { StatusPage } from '../StatusPage';
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
} from '../status-pages';

describe('StatusPage', () => {
  it('renders status code and message content', () => {
    render(
      <MemoryRouter>
        <StatusPage
          content={{
            code: 401,
            title: 'Sign in required',
            description: 'Authentication is required.',
            tone: 'warning',
            icon: 'auth',
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Status 401')).toBeInTheDocument();
    expect(screen.getByText('Sign in required')).toBeInTheDocument();
    expect(screen.getByText('Authentication is required.')).toBeInTheDocument();
  });
});

describe('status page wrappers', () => {
  const pages = [
    [CreatedPage, 'Status 201', 'Member added'],
    [DeletedPage, 'Status 204', 'Member deleted'],
    [BadRequestPage, 'Status 400', 'Invalid request data'],
    [UnauthenticatedPage, 'Status 401', 'Sign in required'],
    [ForbiddenPage, 'Status 403', 'Permission required'],
    [RecordNotFoundPage, 'Status 404', 'Record not found'],
    [PageNotFoundPage, 'Status 404', 'Page not found'],
    [RateLimitedPage, 'Status 429', 'Rate limit exceeded'],
    [ServerErrorPage, 'Status 500', 'Server error'],
    [MaintenancePage, 'Status 503', 'Backend under maintenance'],
    [TimeoutPage, 'Status 504', 'Request timed out'],
  ] as const;

  it.each(pages)('renders %s placeholder content', (Page, code, title) => {
    render(
      <MemoryRouter>
        <Page />
      </MemoryRouter>,
    );

    expect(screen.getByText(code)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
