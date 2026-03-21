import { ValidationIssue } from "../common/validation-result";
import { isValidDate } from "../common/date";
import { MEMBER_ROLES, MEMBER_STAGES } from '../../shared-types/src/member/member.types';

// Helper function to check if a value is a valid enum value
export function isEnumValue<T extends readonly string[] | Record<string, string>>(
  enumObject: T,
  value: unknown,
): value is T extends readonly string[] ? T[number] : T[keyof T] {
  const values = Array.isArray(enumObject) ? enumObject : Object.values(enumObject);
  return typeof value === 'string' && values.includes(value);
}

// Validate role has the correct type and value
export function validateRole(value: unknown): ValidationIssue[] {
    if (typeof value !== 'string') {
        return [{
            field: 'role',
            code: 'invalid_type',
            message: 'Role must be a string.',
        }];
    }

    if (!isEnumValue(MEMBER_ROLES, value)) {
        return [{
            field: 'role',
            code: 'invalid_value',
            message: `Role must be one of: ${Object.values(MEMBER_ROLES).join(', ')}.`,
        }];
    }

    return [];
}

// Validate stage has the correct type and value
export function validateStage(value: unknown): ValidationIssue[] {
    if (typeof value !== 'string') {
        return [{
            field: 'stage',
            code: 'invalid_type',
            message: 'Stage must be a string.',
        }];
    }

    if (!isEnumValue(MEMBER_STAGES, value)) {
        return [{
            field: 'stage',
            code: 'invalid_value',
            message: `Stage must be one of: ${Object.values(MEMBER_STAGES).join(', ')}.`,
        }];
    }

    return [];
}

// Validate required string fields
export function validateRequiredString(value: unknown, fieldName: string): ValidationIssue[] {
    if (typeof value !== 'string') {
        return [{
            field: fieldName,
            code: 'invalid_type',
            message: `${fieldName} must be a string.`,
        }];
    }
    return [];
}

// Validate optional string fields
export function validateOptionalDateString(value: unknown, fieldName: string): ValidationIssue[] {
    if (value === undefined || value === null) {
        return [];
    }
    else if (value !== null && typeof value !== 'string') {
        return [{
            field: fieldName,
            code: 'invalid_type',
            message: `${fieldName} must be a string or null.`,
        }];
    }        
    else {
        return isValidDate(value) ? [] : [{
            field: fieldName,
            code: 'invalid_date',
            message: `${fieldName} must be a valid date.`,
        }];
    }
}

// Validate required date string fields
export function validateRequiredDateString(value: unknown, fieldName: string): ValidationIssue[] {
    if (typeof value !== 'string') {
        return [{
            field: fieldName,
            code: 'invalid_type',
            message: `${fieldName} must be a string.`,
        }];
    }
    return isValidDate(value) ? [] : [{
        field: fieldName,
        code: 'invalid_date',
        message: `${fieldName} must be a valid date.`,
    }];
}