import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ReactNode } from 'react';
import { MembersProvider, useMembers } from '../MembersProvider';

function Harness({ children }: { children: ReactNode }) {
  return <MembersProvider>{children}</MembersProvider>;
}

function MemberCount() {
  const { members, addMember, deleteMember } = useMembers();

  return (
    <div>
      <p>Members: {members.length}</p>
      <button
        type="button"
        onClick={() =>
          addMember({
            name: 'Test Member',
            role: '',
            recruiter: 'Test Recruiter',
            stage: 'Probation',
            joinedAt: new Date('2026-01-01T00:00:00.000Z'),
            basicTrainingCompleted: false,
            progressionApplicant: null,
            joinedMain: 0,
            joinedOther: 0,
            readyForPromotion: false,
            progressionNewMember: null,
            progressionMember: null,
            notes: null,
          })
        }
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => deleteMember(members[members.length - 1]?.id ?? 0)}
      >
        Delete
      </button>
    </div>
  );
}

describe('MembersProvider', () => {
  it('adds and deletes members in session state', () => {
    window.localStorage.clear();

    render(<MemberCount />, { wrapper: Harness });

    expect(screen.getByText('Members: 4')).toBeInTheDocument();

    act(() => screen.getByRole('button', { name: 'Add' }).click());
    expect(screen.getByText('Members: 5')).toBeInTheDocument();

    act(() => screen.getByRole('button', { name: 'Delete' }).click());
    expect(screen.getByText('Members: 4')).toBeInTheDocument();
  });
});
