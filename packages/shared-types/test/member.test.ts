import { describe, expect, it } from 'vitest';
import {
  memberFieldDocumentation,
  permissionFieldDocumentation,
  sessionFieldDocumentation
} from '../src/member/member.docs';
import { MEMBER_ROLES, MEMBER_STAGES } from '../src/member/member.types';

describe('member shared types runtime exports', () => {
  it('defines the supported member roles and stages', () => {
    expect(MEMBER_ROLES).toEqual(['Applicant', 'New Member', 'Member']);
    expect(MEMBER_STAGES).toEqual(['Probation', 'Complete', 'Left', 'On Break']);
  });

  it('documents every member field used by the DTO contract', () => {
    expect(Object.keys(memberFieldDocumentation)).toEqual([
      'id',
      'name',
      'role',
      'recruiter',
      'stage',
      'joinedAt',
      'basicTrainingCompleted',
      'progressionApplicant',
      'joinedMain',
      'joinedOther',
      'readyForPromotion',
      'progressionNewMember',
      'progressionMember',
      'notes'
    ]);
    expect(memberFieldDocumentation.role.constraints).toContain('Must be one of: Applicant, New Member, Member');
    expect(memberFieldDocumentation.stage.constraints).toContain('Must be one of: Probation, Complete, Left, On Break');
  });

  it('documents session and permission capabilities', () => {
    expect(Object.keys(sessionFieldDocumentation)).toEqual([
      'authenticated',
      'googleEmail',
      'recruiterName',
      'permissions'
    ]);
    expect(Object.keys(permissionFieldDocumentation)).toEqual([
      'canViewMembers',
      'canViewPrivateNotes',
      'canCreateMembers',
      'canEditMembers',
      'canEditPrivateNotes'
    ]);
  });
});
