import { sum } from './test_fn';
// import { sum } from './test_fn'
// const sum = require('./test_fn')
 
describe('testing index file', () => {
//   test('empty string should result in zero', () => {
//     expect(sum('')).toBe(0);
//   });
  test('1 + 2 = 3', () => {
    expect(sum(1 , 2)).toBe(3);
  });
  test('Invalid Input types', () => {
    expect(sum('I', 2)).toThrowError
  }) ;
});

// describe('add 1 + 2', () => {
    
// });