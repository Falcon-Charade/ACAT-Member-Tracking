import { Member } from '@shared-types/member/member.types';

export const sampleMembers: Member[] = [
  {
    id: 1,
    name: 'Aria Bennett',
    role: 'Member',
    recruiter: 'Mason Clarke',
    stage: 'Complete',
    joinedAt: new Date('2025-01-15'),
    basicTrainingCompleted: true,
    progressionApplicant: new Date('2025-02-23'),
    joinedMain: 18,
    joinedOther: 4,
    readyForPromotion: true,
    progressionNewMember: new Date('2025-03-09'),
    progressionMember: new Date('2025-04-20'),
    notes: 'Reliable attendance and ready to mentor applicants.',
  },
  {
    id: 2,
    name: 'Noah Singh',
    role: 'New Member',
    recruiter: 'Eli Turner',
    stage: 'Probation',
    joinedAt: new Date('2025-11-08'),
    basicTrainingCompleted: true,
    progressionApplicant: new Date('2025-11-15'),
    joinedMain: 7,
    joinedOther: 2,
    readyForPromotion: false,
    progressionNewMember: new Date('2025-12-01'),
    progressionMember: null,
    notes: 'Needs two more main sessions before review.',
  },
  {
    id: 3,
    name: 'Mia Lawson',
    role: 'Applicant',
    recruiter: 'Aria Bennett',
    stage: 'Probation',
    joinedAt: new Date('2026-01-12'),
    basicTrainingCompleted: false,
    progressionApplicant: null,
    joinedMain: 2,
    joinedOther: 1,
    readyForPromotion: false,
    progressionNewMember: null,
    progressionMember: null,
    notes: null,
  },
  {
    id: 4,
    name: 'Lucas Reed',
    role: 'Member',
    recruiter: 'Mason Clarke',
    stage: 'On Break',
    joinedAt: new Date('2024-09-30'),
    basicTrainingCompleted: true,
    progressionApplicant: new Date('2024-10-08'),
    joinedMain: 25,
    joinedOther: 6,
    readyForPromotion: false,
    progressionNewMember: new Date('2024-10-27'),
    progressionMember: new Date('2024-12-15'),
    notes: 'Returning after a scheduled break.',
  },
];

export function getMemberById(id: string | undefined) {
  return sampleMembers.find((member) => member.id.toString() === id);
}

export function formatDate(value: Date | string | null) {
  if (!value) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}
