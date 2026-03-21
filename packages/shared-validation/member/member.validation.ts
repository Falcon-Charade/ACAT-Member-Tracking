import { ValidationResult } from "../common/validation-result";
import { ValidationIssue } from "../common/validation-result";
import { validateBoolean } from "../common/boolean";
import { validateNonNegativeNumber } from "../common/number";
import { validateRequiredDateString, validateOptionalDateString, validateRequiredString, validateRole, validateStage } from "./member.rules";
import { CreateMemberRequestDto, UpdateMemberRequestDto } from "../../shared-types/src/member/member.dto";

export function validateCreateMemberRequest(input: unknown): ValidationResult<CreateMemberRequestDto> {
  const issues: ValidationIssue[] = [];

  if (typeof input !== 'object' || input === null) {
    return {
      success: false,
      issues: [{
        field: 'input',
        code: 'invalid_type',
        message: 'Input must be an object.',
      }],
    };
  }

  const value = input as CreateMemberRequestDto;

  issues.push(...validateRequiredString(value.name, 'name'));
  issues.push(...validateRole(value.role));
  issues.push(...validateRequiredString(value.recruiter, 'recruiter'));
  issues.push(...validateRequiredString(value.stage, 'stage'));
  issues.push(...validateRequiredDateString(value.joinedAt, 'joinedAt'));
  issues.push(...validateBoolean(value.basicTrainingCompleted, 'basicTrainingCompleted'));
  issues.push(...validateOptionalDateString(value.progressionApplicant, 'progressionApplicant'));
  issues.push(...validateNonNegativeNumber(value.joinedMain, 'joinedMain'));
  issues.push(...validateNonNegativeNumber(value.joinedOther, 'joinedOther'));
  issues.push(...validateBoolean(value.readyForPromotion, 'readyForPromotion'));
  issues.push(...validateOptionalDateString(value.progressionNewMember, 'progressionNewMember'));
  issues.push(...validateOptionalDateString(value.progressionMember, 'progressionMember'));

  if (issues.length > 0) {
    return {
      success: false,
      issues,
    };
  }

  return {
    success: true,
    value: value as CreateMemberRequestDto,
    issues: [],
  };
}

export function validateUpdateMemberRequest(input: unknown): ValidationResult<UpdateMemberRequestDto> {
  const issues: ValidationIssue[] = [];

  if (typeof input !== 'object' || input === null) {
    return {
      success: false,
      issues: [{
        field: 'input',
        code: 'invalid_type',
        message: 'Input must be an object.',
      }],
    };
  }

  const value = input as UpdateMemberRequestDto;

  if ('name' in value) {
    issues.push(...validateRequiredString(value.name, 'name'));
  }
  if ('role' in value) {
    issues.push(...validateRole(value.role));
  }
  if ('recruiter' in value) {
    issues.push(...validateRequiredString(value.recruiter, 'recruiter'));
  }
  if ('stage' in value) {
    issues.push(...validateStage(value.stage));
  }
  if ('joinedAt' in value) {
    issues.push(...validateRequiredDateString(value.joinedAt, 'joinedAt'));
  }
  if ('basicTrainingCompleted' in value) {
    issues.push(...validateBoolean(value.basicTrainingCompleted, 'basicTrainingCompleted'));
  }
  if ('progressionApplicant' in value) {
    issues.push(...validateOptionalDateString(value.progressionApplicant, 'progressionApplicant'));
  }
  if ('joinedMain' in value) {
    issues.push(...validateNonNegativeNumber(value.joinedMain, 'joinedMain'));
  }
  if ('joinedOther' in value) {
    issues.push(...validateNonNegativeNumber(value.joinedOther, 'joinedOther'));
  }
  if ('readyForPromotion' in value) {
    issues.push(...validateBoolean(value.readyForPromotion, 'readyForPromotion'));
  }
  if ('progressionNewMember' in value) {
    issues.push(...validateOptionalDateString(value.progressionNewMember, 'progressionNewMember'));
  }
  if ('progressionMember' in value) {
    issues.push(...validateOptionalDateString(value.progressionMember, 'progressionMember'));
  }

  if (issues.length > 0) {
    return {
      success: false,
      issues,
    };
  }

  return {
    success: true,
    value: value as UpdateMemberRequestDto,
    issues: [],
  };
}