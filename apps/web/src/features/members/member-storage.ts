import type { Member } from '@shared-types/member/member.types';
import { sampleMembers } from '@/pages/member-data';

const STORAGE_KEY = 'acat.members.v1';

type StoredMember = Omit<
  Member,
  | 'joinedAt'
  | 'progressionApplicant'
  | 'progressionNewMember'
  | 'progressionMember'
> & {
  joinedAt: string;
  progressionApplicant: string | null;
  progressionNewMember: string | null;
  progressionMember: string | null;
};

function serializeMember(member: Member): StoredMember {
  return {
    ...member,
    joinedAt: member.joinedAt.toISOString(),
    progressionApplicant: member.progressionApplicant?.toISOString() ?? null,
    progressionNewMember: member.progressionNewMember?.toISOString() ?? null,
    progressionMember: member.progressionMember?.toISOString() ?? null,
  };
}

function deserializeMember(member: StoredMember): Member {
  return {
    ...member,
    joinedAt: new Date(member.joinedAt),
    progressionApplicant: member.progressionApplicant
      ? new Date(member.progressionApplicant)
      : null,
    progressionNewMember: member.progressionNewMember
      ? new Date(member.progressionNewMember)
      : null,
    progressionMember: member.progressionMember
      ? new Date(member.progressionMember)
      : null,
  };
}

export function loadStoredMembers(): Member[] {
  if (typeof window === 'undefined') {
    return sampleMembers;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return sampleMembers;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredMember[];
    return parsed.map(deserializeMember);
  } catch (error) {
    console.warn('Unable to load stored members; falling back to samples.', error);
    return sampleMembers;
  }
}

export function saveStoredMembers(members: Member[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(members.map(serializeMember)),
  );
}
