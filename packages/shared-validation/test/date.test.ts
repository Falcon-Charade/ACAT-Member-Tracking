import { describe, expect, it } from 'vitest';
import { formatDateToDdMmYyyy, parseDdMmYyyyDate } from '../common/date';

describe('parseDdMmYyyyDate', () => {
  it('parses a valid date', () => {
    const result = parseDdMmYyyyDate('2026-03-21');
    expect(result).not.toBeNull();
    expect(result?.getUTCFullYear()).toBe(2026);
    expect(result?.getUTCMonth()).toBe(2);
    expect(result?.getUTCDate()).toBe(21);
  });

  it('rejects an impossible date', () => {
    expect(parseDdMmYyyyDate('2026-02-31')).toBeNull();
  });

  it('rejects wrong format', () => {
    expect(parseDdMmYyyyDate('2026.03.21')).toBeNull();
  });
});

describe('formatDateToDdMmYyyy', () => {
  it('formats a UTC date correctly', () => {
    const date = new Date(Date.UTC(2026, 2, 21));
    expect(formatDateToDdMmYyyy(date)).toBe('2026-03-21');
  });
});