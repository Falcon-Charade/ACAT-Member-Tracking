import { MemberForm } from './AddMemberForm';

export function AddMemberPage() {
  return (
    <MemberForm
      title="Add member"
      description="Create a local sample member record. API persistence will be added after member endpoints exist."
      submitLabel="Add member"
    />
  );
}
