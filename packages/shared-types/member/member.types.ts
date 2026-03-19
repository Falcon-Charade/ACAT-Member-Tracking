export const MEMBER_ROLES = ['Applicant', 'New Member', 'Member'] as const;
export type MemberRole = (typeof MEMBER_ROLES)[number];

export const MEMBER_STAGES = ['Probation', 'Complete', 'Left', 'On Break'] as const;
export type MemberStage = (typeof MEMBER_STAGES)[number];

export interface Member {
  id: number;
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