export interface ValidationIssue {
  field: string;
  code: string;
  message: string;
}

export interface ValidationResult<T> {
  success: boolean;
  value?: T;
  issues: ValidationIssue[];
}