import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Member } from '@shared-types/member/member.types';
import type { MemberDraft } from './member-model';
import { applyMemberUpdate, createMemberFromDraft } from './member-model';
import { loadStoredMembers, saveStoredMembers } from './member-storage';

interface MembersContextValue {
  members: Member[];
  isLoading: boolean;
  addMember: (draft: MemberDraft) => Member;
  updateMember: (id: number, update: Partial<MemberDraft>) => Member | null;
  deleteMember: (id: number) => boolean;
  getMemberById: (id: string | number | undefined) => Member | undefined;
}

const MembersContext = createContext<MembersContextValue | null>(null);

function getNextId(members: Member[]) {
  return Math.max(0, ...members.map((member) => member.id)) + 1;
}

export function MembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>(() => loadStoredMembers());
  const isLoading = false;

  useEffect(() => {
    saveStoredMembers(members);
  }, [members]);

  const value = useMemo<MembersContextValue>(
    () => ({
      members,
      isLoading,
      addMember: (draft) => {
        const member = createMemberFromDraft(getNextId(members), draft);
        setMembers((current) => [...current, member]);
        return member;
      },
      updateMember: (id, update) => {
        let updatedMember: Member | null = null;

        setMembers((current) =>
          current.map((member) => {
            if (member.id !== id) {
              return member;
            }

            updatedMember = applyMemberUpdate(member, update);
            return updatedMember;
          }),
        );

        return updatedMember;
      },
      deleteMember: (id) => {
        const exists = members.some((member) => member.id === id);
        setMembers((current) => current.filter((member) => member.id !== id));
        return exists;
      },
      getMemberById: (id) => {
        if (id === undefined) {
          return undefined;
        }

        return members.find((member) => member.id.toString() === id.toString());
      },
    }),
    [isLoading, members],
  );

  return (
    <MembersContext.Provider value={value}>{children}</MembersContext.Provider>
  );
}

export function useMembers() {
  const value = useContext(MembersContext);

  if (!value) {
    throw new Error('useMembers must be used within MembersProvider.');
  }

  return value;
}
