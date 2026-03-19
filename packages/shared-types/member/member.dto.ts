import type { Member, MemberRole, MemberStage } from './member.types';

/**
 * Public API DTO for Member, excludes sensitive fields like 'id' and 'notes'.
 */
export type PublicMemberDto = Omit<Member, 'id' | 'notes'>;

/**
 * Editable DTO for privileged editing clients.
 * Includes all editable fields, including notes.
 */
export type EditableMemberDto = Member;

/**
 * Request DTO for creating a member.
 * memberId is omitted because it is system-generated.
 */
export interface CreateMemberRequestDto {
    name: string;
    role: '';
    recruiter: string;
    stage: "Probation";
    joinedAt: Date;
    basicTrainingCompleted: false;
    progressionApplicant: null;
    joinedMain: 0;
    joinedOther: 0;
    readyForPromotion: false;
    progressionNewMember: null;
    progressionMember: null;
}

/**
 * Request DTO for updating an existing member.
 * Partial so callers can patch only the fields they want to change.
 */
export interface UpdateMemberRequestDto {
    name?: string;
    role?: MemberRole | '';
    recruiter?: string;
    stage?: MemberStage;
    joinedAt?: Date;
    basicTrainingCompleted?: boolean;
    progressionApplicant?: Date | null;
    joinedMain?: number;
    joinedOther?: number;
    readyForPromotion?: boolean;
    progressionNewMember?: Date | null;
    progressionMember?: Date | null;
    notes?: string | null;
}

/**
 * Session DTO returned by the backend to describe the current caller.
 */
export interface SessionDto {
    authenticated: boolean;
    googleEmail: string | null;
    recruiterName: string | null;
    permissions: PermissionDto;
}

/**
 * Permission DTO for client-side capability gating.
 */
export interface PermissionDto {
    canViewMembers: boolean;
    canViewPrivateNotes: boolean;
    canCreateMembers: boolean;
    canEditMembers: boolean;
    canEditPrivateNotes: boolean;
}