import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AuthProvider } from '@/features/auth/auth-state';
import { sampleMembers } from '../member-data';
import { DeleteMemberDialog } from '../DeleteMemberDialog';
import { LoginDialog } from '../LoginDialog';

describe('dialogs', () => {
  it('renders login dialog and closes after placeholder Google sign in', () => {
    const onOpenChange = vi.fn();

    render(
      <AuthProvider>
        <LoginDialog open onOpenChange={onOpenChange} />
      </AuthProvider>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue with Google' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Continue with Google' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders delete confirmation with username and supports cancel or confirm', () => {
    const onOpenChange = vi.fn();
    const onConfirm = vi.fn();
    const member = sampleMembers[0];

    const { rerender } = render(
      <DeleteMemberDialog
        member={member}
        open
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Delete member?')).toBeInTheDocument();
    expect(screen.getByText(member.name)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    rerender(
      <DeleteMemberDialog
        member={member}
        open
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Confirm delete' }));
    expect(onConfirm).toHaveBeenCalled();
  });
});
