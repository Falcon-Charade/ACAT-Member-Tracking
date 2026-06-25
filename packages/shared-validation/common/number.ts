import { ValidationIssue } from "./validation-result";

export function validateNonNegativeNumber(value: unknown, field: string): ValidationIssue[] {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return [{
      field,
      code: 'invalid_type',
      message: `${field} must be an integer.`,
    }];
  }

  if (value < 0) {
    return [{
      field,
      code: 'negative_value',
      message: `${field} must be a 0 or greater.`,
    }];
  }

  return [];
}