import { describe, expect, it } from 'vitest';
import { validateNonNegativeNumber } from '../common/number';

describe('validateNonNegativeNumber', () => {
    it('validates a non-negative integer', () => {
        const result = validateNonNegativeNumber(5, 'positiveField');
        expect(result).toEqual([]);
    });

    it('rejects a negative integer', () => {
        const result = validateNonNegativeNumber(-3, 'negativeField');
        expect(result).toEqual([{
            field: 'negativeField',
            code: 'negative_value',
            message: 'negativeField must be a 0 or greater.',
        }]);
    });

    it('rejects a non-integer number', () => {
        const result = validateNonNegativeNumber(3.14, 'nonIntegerField');
        expect(result).toEqual([{
            field: 'nonIntegerField',
            code: 'invalid_type',
            message: 'nonIntegerField must be an integer.',
        }]);
    });

    it('rejects a non-number type', () => {
        const result = validateNonNegativeNumber('not a number', 'stringField');
        expect(result).toEqual([{
            field: 'stringField',
            code: 'invalid_type',
            message: 'stringField must be an integer.',
        }]);
    });
});