import type { Member } from '@shared-types/member/member.types';
import type { MemberRole, MemberStage } from '@shared-types/member/member.types';

export interface MemberDraft {
  name: string;
  role: MemberRole | '';
  recruiter: string;
  stage: MemberStage;
  joinedAt: Date;
  basicTrainingCompleted: boolean;
  progressionApplicant: Date | null;
  joinedMain: number;
  joinedOther: number;
  readyForPromotion: boolean;
  progressionNewMember: Date | null;
  progressionMember: Date | null;
  notes: string | null;
}

export type MemberUpdate = Partial<MemberDraft>;

export function createMemberFromDraft(id: number, draft: MemberDraft): Member {
  return {
    id,
    name: draft.name,
    role: draft.role,
    recruiter: draft.recruiter,
    stage: draft.stage,
    joinedAt: draft.joinedAt,
    basicTrainingCompleted: draft.basicTrainingCompleted,
    progressionApplicant: draft.progressionApplicant,
    joinedMain: draft.joinedMain,
    joinedOther: draft.joinedOther,
    readyForPromotion: draft.readyForPromotion,
    progressionNewMember: draft.progressionNewMember,
    progressionMember: draft.progressionMember,
    notes: draft.notes,
  };
}

export function applyMemberUpdate(member: Member, update: MemberUpdate): Member {
  return {
    ...member,
    ...update,
    joinedAt: update.joinedAt ?? member.joinedAt,
    progressionApplicant: Object.hasOwn(update, 'progressionApplicant')
      ? update.progressionApplicant ?? null
      : member.progressionApplicant,
    progressionNewMember: Object.hasOwn(update, 'progressionNewMember')
      ? update.progressionNewMember ?? null
      : member.progressionNewMember,
    progressionMember: Object.hasOwn(update, 'progressionMember')
      ? update.progressionMember ?? null
      : member.progressionMember,
  };
}
