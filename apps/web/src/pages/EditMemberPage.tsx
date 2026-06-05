import { useParams } from 'react-router-dom';
import { useMembers } from '@/features/members/MembersProvider';
import { MemberForm } from './EditMemberForm';
import { RecordNotFoundPage } from './status-pages';

export function EditMemberPage() {
  const { id } = useParams();
  const { getMemberById } = useMembers();
  const member = getMemberById(id);

  if (!member) {
    return <RecordNotFoundPage />;
  }

  return (
    <MemberForm
      title={`Edit ${member.name}`}
      description="Update this local sample member record. API persistence will be added after member endpoints exist."
      submitLabel="Save changes"
      member={member}
    />
  );
}
