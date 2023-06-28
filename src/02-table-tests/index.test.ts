// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 4, action: Action.Divide, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 3, b: 1, action: Action, expected: null },
  { a: 2, b: 2, action: Action, expected: null },
  { a: 1, b: 3, action: Action, expected: null },
  { a: '3', b: '1', action: Action.Add, expected: null },
  { a: '2', b: '2', action: Action.Subtract, expected: null },
  { a: '1', b: '3', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)('should return $expected if $a $action $b', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
