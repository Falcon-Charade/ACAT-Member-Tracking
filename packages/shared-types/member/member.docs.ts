import { MEMBER_ROLES, MEMBER_STAGES } from "./member.types";

export const memberFieldDocumentation = {
    id: {
        meaning: 'Unique identifier for the member.',
        example: 12,
        constraints: ['Required', 'Non-negative integer', 'System-generated on creation'],
    },
    name: {
        meaning: 'Primary display name of the member.',
        example: 'John Doe',
        constraints: ['Required', 'Trimmed string', 'Non-empty string'],
    },
    role: {
        meaning: 'Role of the member within the group.',
        example: 'Member',
        constraints: ['Optional', `Must be one of: ${MEMBER_ROLES.join(', ')}`, 'Empty string allowed to represent no role'],
    },
    recruiter: {
        meaning: 'Name of the person who ran the induction for the member.',
        example: 'Jane Smith',
        constraints: ['Required', 'Trimmed string', 'Non-empty string', 'Must map to an authorised recruiter/editor identity'],
    },
    stage: {
        meaning: 'Current stage of the member in their progression.',
        example: 'Complete',
        constraints: ['Required', `Must be one of: ${MEMBER_STAGES.join(', ')}`, 'Default is "Probation" on creation'],
    },
    joinedAt: {
        meaning: 'Date when the member joined the group.',
        example: '2024-01-15',
        constraints: ['Required', 'Valid ISO 8601 date string'],
    },
    basicTrainingCompleted: {
        meaning: 'Whether the member has completed basic training.',
        example: true,
        constraints: ['Required', 'Boolean value', 'Default is false on creation'],
    },
    progressionApplicant: {
        meaning: 'Date when the member progressed to Applicant.',
        example: '2024-01-15',
        constraints: ['Optional', 'Valid ISO 8601 date string'],
    },
    joinedMain: {
        meaning: 'Number of times the member has joined main missions.',
        example: 1,
        constraints: ['Required', 'Non-negative integer', 'Default is 0 on creation'],
    },
    joinedOther: {
        meaning: 'Number of times the member has joined other missions.',
        example: 3,
        constraints: ['Required', 'Non-negative integer', 'Default is 0 on creation'],
    },
    readyForPromotion: {
        meaning: 'Whether the member is ready for promotion to New Member.',
        example: false,
        constraints: ['Required', 'Boolean value', 'Default is false on creation'],
    },
    progressionNewMember: {
        meaning: 'Date when the member progressed to New Member.',
        example: '2024-02-20',
        constraints: ['Optional', 'Valid ISO 8601 date string'],
    },
    progressionMember: {
        meaning: 'Date when the member progressed to Member.',
        example: '2024-03-15',
        constraints: ['Optional', 'Valid ISO 8601 date string'],
    },
    notes: {
        meaning: 'Additional notes about the member.',
        example: 'Needs to complete advanced training.',
        constraints: ['Optional', 'String value', 'Can be null if no notes are present'],
    },
} as const;

export const sessionFieldDocumentation = {
    authenticated: {
        meaning: 'Whether the current session is authenticated.',
        example: true,
        constraints: ['Required', 'Boolean value'],
    },
    googleEmail: {
        meaning: 'Google email of the authenticated user.',
        example: 'john.doe@gmail.com',
        constraints: ['Optional', 'Valid email address'],
    },
    recruiterName: {
        meaning: 'Name of the recruiter associated with the authenticated user.',
        example: 'Jane Smith',
        constraints: ['Optional', 'Trimmed string', 'Non-empty string'],
    },
    permissions: {
        meaning: 'Permissions granted to the authenticated user.',
        example: {
            canViewMembers: true,
            canViewPrivateNotes: false,
            canCreateMembers: true,
            canEditMembers: true,
            canEditPrivateNotes: true
        },
        constraints: ['Required', 'Object with boolean values'],
    }
} as const;

export const permissionFieldDocumentation = {
    canViewMembers: {
        meaning: 'Whether the user has permission to view member information.',
        example: true,
        constraints: ['Required', 'Boolean value'],
    },
    canViewPrivateNotes: {
        meaning: 'Whether the user has permission to view private notes about members.',
        example: false,
        constraints: ['Required', 'Boolean value'],
    },
    canCreateMembers: {
        meaning: 'Whether the user has permission to create new member records.',
        example: true,
        constraints: ['Required', 'Boolean value'],
    },
    canEditMembers: {
        meaning: 'Whether the user has permission to edit existing member records.',
        example: true,
        constraints: ['Required', 'Boolean value'],
    },
    canEditPrivateNotes: {
        meaning: 'Whether the user has permission to edit private notes about members.',
        example: true,
        constraints: ['Required', 'Boolean value'],
    }
} as const;