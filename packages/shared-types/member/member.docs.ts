import { read } from "fs";
import { MEMBER_ROLES, MEMBER_STAGES } from "./member.types";

export const memberFieldDocumentation = {
    id: {
        meaning: 'Unique identifier for the member.',
        example: 12,
        contraints: ['Required', 'Non-negative integer', 'System-generated on creation'],
    },
    name: {
        meaning: 'Primary display name of the member.',
        example: 'John Doe',
        contraints: ['Required', 'Trimmed string', 'Non-empty string'],
    },
    role: {
        meaning: 'Role of the member within the group.',
        example: 'Member',
        contraints: ['Optional', `Must be one of: ${MEMBER_ROLES.join(', ')}`, 'Empty string allowed to represent no role'],
    },
    recruiter: {
        meaning: 'Name of the person who ran the induction for the member.',
        example: 'Jane Smith',
        contraints: ['Required', 'Trimmed string', 'Non-empty string', 'Must map to an authorised recruiter/editor identity'],
    },
    stage: {
        meaning: 'Current stage of the member in their progression.',
        example: 'Complete',
        contraints: ['Required', `Must be one of: ${MEMBER_STAGES.join(', ')}`, 'Default is "Probation" on creation'],
    },
    joinedAt: {
        meaning: 'Date when the member joined the group.',
        example: '2024-01-15',
        contraints: ['Required', 'Valid ISO 8601 date string'],
    },
    basicTrainingCompleted: {
        meaning: 'Whether the member has completed basic training.',
        example: true,
        contraints: ['Required', 'Boolean value', 'Default is false on creation'],
    },
    progressionApplicant: {
        meaning: 'Date when the member progressed to Applicant.',
        example: '2024-01-15',
        contraints: ['Optional', 'Valid ISO 8601 date string'],
    },
    joinedMain: {
        meaning: 'Number of times the member has joined main missions.',
        example: 1,
        contraints: ['Required', 'Non-negative integer', 'Default is 0 on creation'],
    },
    joinedOther: {
        meaning: 'Number of times the member has joined other missions.',
        example: 3,
        contraints: ['Required', 'Non-negative integer', 'Default is 0 on creation'],
    },
    readyForPromotion: {
        meaning: 'Whether the member is ready for promotion to New Member.',
        example: false,
        contraints: ['Required', 'Boolean value', 'Default is false on creation'],
    },
    progressionNewMember: {
        meaning: 'Date when the member progressed to New Member.',
        example: '2024-02-20',
        contraints: ['Optional', 'Valid ISO 8601 date string'],
    },
    progressionMember: {
        meaning: 'Date when the member progressed to Member.',
        example: '2024-03-15',
        contraints: ['Optional', 'Valid ISO 8601 date string'],
    },
    notes: {
        meaning: 'Additional notes about the member.',
        example: 'Needs to complete advanced training.',
        contraints: ['Optional', 'String value', 'Can be null if no notes are present'],
    },
} as const;

export const sessionFieldDocumentation = {
    authenticated: {
        meaning: 'Whether the current session is authenticated.',
        example: true,
        contraints: ['Required', 'Boolean value'],
    },
    googleEmail: {
        meaning: 'Google email of the authenticated user.',
        example: 'john.doe@gmail.com',
        contraints: ['Optional', 'Valid email address'],
    },
    recruiterName: {
        meaning: 'Name of the recruiter associated with the authenticated user.',
        example: 'Jane Smith',
        contraints: ['Optional', 'Trimmed string', 'Non-empty string'],
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
        contraints: ['Required', 'Object with boolean values'],
    }
} as const;

export const permissionFieldDocumentation = {
    canViewMembers: {
        meaning: 'Whether the user has permission to view member information.',
        example: true,
        contraints: ['Required', 'Boolean value'],
    },
    canViewPrivateNotes: {
        meaning: 'Whether the user has permission to view private notes about members.',
        example: false,
        contraints: ['Required', 'Boolean value'],
    },
    canCreateMembers: {
        meaning: 'Whether the user has permission to create new member records.',
        example: true,
        contraints: ['Required', 'Boolean value'],
    },
    canEditMembers: {
        meaning: 'Whether the user has permission to edit existing member records.',
        example: true,
        contraints: ['Required', 'Boolean value'],
    },
    canEditPrivateNotes: {
        meaning: 'Whether the user has permission to edit private notes about members.',
        example: true,
        contraints: ['Required', 'Boolean value'],
    }
} as const;