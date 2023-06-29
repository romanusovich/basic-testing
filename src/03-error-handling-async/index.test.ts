// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'value';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => { throwError('Error') }).toThrow('Error');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => { throwError() }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => { throwCustomError() }).toThrow(MyAwesomeError);
    expect(() => { throwCustomError() }).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError();
    } catch (e: any) {
      expect(e).toBeInstanceOf(MyAwesomeError);
      expect(e.message).toContain('This is my awesome custom error!');
    }
  });
});
