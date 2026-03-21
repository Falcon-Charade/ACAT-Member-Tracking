import { describe, expect, it } from 'vitest';
import { validateBoolean } from '../common/boolean';

describe('validateBoolean', () => {
  it('validates true', () => {
    const boolCheck = validateBoolean(true, 'true');
    expect(boolCheck).toEqual([]);
  });
  it('validates false', () => {
    const boolCheck = validateBoolean(false, 'false');
    expect(boolCheck).toEqual([]);
  });
  it('rejects string', () => {
    const boolCheck = validateBoolean('true', 'string');
    expect(boolCheck).toEqual([{
      field: 'string',
      code: 'invalid_type',
      message: 'string must be a boolean.',
    }]);
  });
  it('rejects number', () => {
    const boolCheck = validateBoolean(1, 'number');
    expect(boolCheck).toEqual([{
      field: 'number',
      code: 'invalid_type',
      message: 'number must be a boolean.',
    }]);
});
  it('rejects null', () => {
    const boolCheck = validateBoolean(null, 'null');
    expect(boolCheck).toEqual([{
      field: 'null',
      code: 'invalid_type',
      message: 'null must not be null.',
    }]);
  });
  it('rejects undefined', () => {
    const boolCheck = validateBoolean(undefined, 'undefined');
    expect(boolCheck).toEqual([{
      field: 'undefined',
      code: 'missing_field',
      message: 'undefined is required.',
    }]);
  });
});