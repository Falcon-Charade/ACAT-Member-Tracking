import { useParams } from 'react-router-dom';
import { useMembers } from '@/features/members/MembersProvider';
import { MemberForm } from './ViewMemberForm';
import { RecordNotFoundPage } from './status-pages';

export function ViewMemberPage() {
  const { id } = useParams();
  const { getMemberById } = useMembers();
  const member = getMemberById(id);

  if (!member) {
    return <RecordNotFoundPage />;
  }

  return (
    <MemberForm
      title={`Viewing ${member.name}`}
      description="Read-only member details."
      member={member}
    />
  );
}
