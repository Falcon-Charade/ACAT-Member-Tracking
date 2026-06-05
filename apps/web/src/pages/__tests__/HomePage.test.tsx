import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MembersProvider } from '@/features/members/MembersProvider';
import { HomePage } from '../HomePage';

describe('HomePage', () => {
  it('renders the member register from member state', () => {
    window.localStorage.clear();

    render(
      <MemoryRouter>
        <MembersProvider>
          <HomePage />
        </MembersProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Member register')).toBeInTheDocument();
    expect(screen.getAllByText('Aria Bennett').length).toBeGreaterThan(0);
  });
});
