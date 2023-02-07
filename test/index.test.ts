// import { add } from './test_fn';
require('./test_fn')
 
describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(add('')).toBe(0);
  });
});

describe('add 1 + 2', () => {
    test('1 + 2 = 3', () => {
      expect(add(1 , 2)).toBe(3);
    });
});