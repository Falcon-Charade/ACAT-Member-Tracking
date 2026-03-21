import { ValidationIssue } from "./validation-result";

export function validateBoolean(input: unknown, field: string): ValidationIssue[] {
    if (input === undefined) {
        return [{
            field,
            code: 'missing_field',
            message: `${field} is required.`,
        }];
    }
    if (input === null) {
        return [{
            field,
            code: 'invalid_type',
            message: `${field} must not be null.`,
        }];
    }
    if (typeof input !== 'boolean') {
        return [{
            field,
            code: 'invalid_type',
            message: `${field} must be a boolean.`,
        }];
    }
    
    return [];
}