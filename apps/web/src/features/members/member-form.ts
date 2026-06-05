import type { Member } from '@shared-types/member/member.types';
import {
  MEMBER_ROLES,
  MEMBER_STAGES,
  type MemberRole,
  type MemberStage,
} from '@shared-types/member/member.types';
import type { MemberDraft } from './member-model';

export type MemberFormErrors = Partial<Record<keyof MemberDraft, string>>;

export interface AddMemberFormValues {
  name: string;
  recruiter: string;
  joinedAt: string;
}

export interface EditMemberFormValues extends AddMemberFormValues {
  role: MemberRole | '';
  stage: MemberStage;
  basicTrainingCompleted: boolean;
  progressionApplicant: string;
  joinedMain: number;
  joinedOther: number;
  readyForPromotion: boolean;
  progressionNewMember: string;
  progressionMember: string;
  notes: string;
}

export const emptyAddMemberValues: AddMemberFormValues = {
  name: '',
  recruiter: '',
  joinedAt: new Date().toISOString().slice(0, 10),
};

export function toDateInputValue(value: Date) {
  return value.toISOString().slice(0, 10);
}

export function toEditMemberValues(member: Member): EditMemberFormValues {
  return {
    name: member.name,
    role: member.role,
    recruiter: member.recruiter,
    stage: member.stage,
    joinedAt: toDateInputValue(member.joinedAt),
    basicTrainingCompleted: member.basicTrainingCompleted,
    progressionApplicant: member.progressionApplicant
      ? toDateInputValue(member.progressionApplicant)
      : '',
    joinedMain: member.joinedMain,
    joinedOther: member.joinedOther,
    readyForPromotion: member.readyForPromotion,
    progressionNewMember: member.progressionNewMember
      ? toDateInputValue(member.progressionNewMember)
      : '',
    progressionMember: member.progressionMember
      ? toDateInputValue(member.progressionMember)
      : '',
    notes: member.notes ?? '',
  };
}

function getString(formData: FormData, field: string) {
  return String(formData.get(field) ?? '').trim();
}

function getNumber(formData: FormData, field: string) {
  return Number(formData.get(field) ?? 0);
}

function getOptionalDate(value: string) {
  return value ? new Date(value) : null;
}

function validateBaseFields(input: {
  name: string;
  recruiter: string;
  joinedAt: string;
}) {
  const errors: MemberFormErrors = {};

  if (!input.name) {
    errors.name = 'User name is required.';
  }

  if (!input.recruiter) {
    errors.recruiter = 'Recruiter is required.';
  }

  if (!input.joinedAt || Number.isNaN(new Date(input.joinedAt).getTime())) {
    errors.joinedAt = 'Joined date must be valid.';
  }

  return errors;
}

export function hasFormErrors(errors: MemberFormErrors) {
  return Object.keys(errors).length > 0;
}

function validateRoleValue(value: MemberRole | '') {
  return value === '' || MEMBER_ROLES.includes(value);
}

function validateStageValue(value: MemberStage) {
  return MEMBER_STAGES.includes(value);
}

export function parseAddMemberForm(formData: FormData): {
  draft: MemberDraft;
  errors: MemberFormErrors;
} {
  const input = {
    name: getString(formData, 'name'),
    recruiter: getString(formData, 'recruiter'),
    joinedAt: getString(formData, 'joinedAt'),
  };
  const errors = validateBaseFields(input);

  return {
    errors,
    draft: {
      name: input.name,
      role: '',
      recruiter: input.recruiter,
      stage: 'Probation',
      joinedAt: new Date(input.joinedAt),
      basicTrainingCompleted: false,
      progressionApplicant: null,
      joinedMain: 0,
      joinedOther: 0,
      readyForPromotion: false,
      progressionNewMember: null,
      progressionMember: null,
      notes: null,
    },
  };
}

export function parseEditMemberForm(formData: FormData): {
  draft: MemberDraft;
  errors: MemberFormErrors;
} {
  const role = getString(formData, 'role') as MemberRole | '';
  const stage = getString(formData, 'stage') as MemberStage;
  const input = {
    name: getString(formData, 'name'),
    role,
    recruiter: getString(formData, 'recruiter'),
    stage,
    joinedAt: getString(formData, 'joinedAt'),
    basicTrainingCompleted: formData.has('basicTrainingCompleted'),
    progressionApplicant: getString(formData, 'progressionApplicant'),
    joinedMain: getNumber(formData, 'joinedMain'),
    joinedOther: getNumber(formData, 'joinedOther'),
    readyForPromotion: formData.has('readyForPromotion'),
    progressionNewMember: getString(formData, 'progressionNewMember'),
    progressionMember: getString(formData, 'progressionMember'),
    notes: getString(formData, 'notes'),
  };
  const errors = validateBaseFields(input);

  if (!validateRoleValue(input.role)) {
    errors.role = 'Role must be a valid member role.';
  }

  if (!validateStageValue(input.stage)) {
    errors.stage = 'Stage must be a valid member stage.';
  }

  if (input.joinedMain < 0) {
    errors.joinedMain = 'Main sessions cannot be negative.';
  }

  if (input.joinedOther < 0) {
    errors.joinedOther = 'Other sessions cannot be negative.';
  }

  return {
    errors,
    draft: {
      name: input.name,
      role: input.role,
      recruiter: input.recruiter,
      stage: input.stage,
      joinedAt: new Date(input.joinedAt),
      basicTrainingCompleted: input.basicTrainingCompleted,
      progressionApplicant: getOptionalDate(input.progressionApplicant),
      joinedMain: input.joinedMain,
      joinedOther: input.joinedOther,
      readyForPromotion: input.readyForPromotion,
      progressionNewMember: getOptionalDate(input.progressionNewMember),
      progressionMember: getOptionalDate(input.progressionMember),
      notes: input.notes || null,
    },
  };
}
