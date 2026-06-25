import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MembersProvider } from '@/features/members/MembersProvider';
import { sampleMembers } from '../member-data';
import { MemberForm as AddMemberForm } from '../AddMemberForm';
import { MemberForm as EditMemberForm } from '../EditMemberForm';
import { MemberForm as ViewMemberForm } from '../ViewMemberForm';

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <MembersProvider>{ui}</MembersProvider>
    </MemoryRouter>,
  );
}

describe('member forms', () => {
  it('renders add member textboxes and shows validation when required fields are empty', () => {
    renderWithProviders(
      <AddMemberForm
        title="Add member"
        description="Create a member"
        submitLabel="Add member"
      />,
    );

    expect(screen.getByLabelText('User name')).toHaveValue('');
    expect(screen.getByLabelText('Recruiter')).toHaveValue('');
    expect(screen.getByLabelText('Joined date')).toHaveValue(
      new Date().toISOString().slice(0, 10),
    );

    fireEvent.change(screen.getByLabelText('Joined date'), {
      target: { value: '' },
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Add member' }).closest('form')!);

    expect(screen.getByText('User name is required.')).toBeInTheDocument();
    expect(screen.getByText('Recruiter is required.')).toBeInTheDocument();
    expect(screen.getByText('Joined date must be valid.')).toBeInTheDocument();
  });

  it('renders edit member fields with current values and validates numeric inputs', () => {
    const member = sampleMembers[0];

    renderWithProviders(
      <EditMemberForm
        title={`Edit ${member.name}`}
        description="Edit member"
        submitLabel="Save changes"
        member={member}
      />,
    );

    expect(screen.getByLabelText('User name')).toHaveValue(member.name);
    expect(screen.getByLabelText('Recruiter')).toHaveValue(member.recruiter);
    expect(screen.getByLabelText('Joined date')).toHaveValue('2025-01-15');
    expect(screen.getByLabelText('Main sessions')).toHaveValue(
      member.joinedMain,
    );
    expect(screen.getByLabelText('Other sessions')).toHaveValue(
      member.joinedOther,
    );
    expect(screen.getByLabelText('Basic training completed')).toBeChecked();
    expect(screen.getByLabelText('Ready for promotion review')).toBeChecked();

    fireEvent.change(screen.getByLabelText('Main sessions'), {
      target: { value: '-1' },
    });
    fireEvent.change(screen.getByLabelText('Other sessions'), {
      target: { value: '-2' },
    });
    fireEvent.submit(
      screen.getByRole('button', { name: 'Save changes' }).closest('form')!,
    );

    expect(screen.getByText('Main sessions cannot be negative.')).toBeInTheDocument();
    expect(screen.getByText('Other sessions cannot be negative.')).toBeInTheDocument();
  });

  it('renders view member fields disabled and only exposes close navigation', () => {
    const member = sampleMembers[0];

    renderWithProviders(
      <ViewMemberForm
        title={`Viewing ${member.name}`}
        description="Read-only member details."
        member={member}
      />,
    );

    expect(screen.getByLabelText('User name')).toBeDisabled();
    expect(screen.getByLabelText('Recruiter')).toBeDisabled();
    expect(screen.getByLabelText('Joined date')).toBeDisabled();
    expect(screen.getByLabelText('Main sessions')).toBeDisabled();
    expect(screen.getByLabelText('Other sessions')).toBeDisabled();
    expect(screen.getByLabelText('Notes / Observations')).toBeDisabled();
    expect(screen.getByRole('link', { name: 'Close' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument();
  });
});
