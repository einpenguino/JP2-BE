import { sum } from './test_fn';
// import { sum } from './test_fn'
// const sum = require('./test_fn')
 
describe('testing index file', () => {

  test('1 + 2 = 3', () => {
    expect(sum(1 , 2)).toBe(3);
  });
  test('Invalid Input types', () => {
    expect(sum('I', 2)).toThrowError
  });
  test('Addition of null sets', () => {
    expect(sum([], 1)).toThrowError
  });
});