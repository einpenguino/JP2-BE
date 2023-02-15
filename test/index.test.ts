import { sum } from './test_fn';
// import { sum } from './test_fn'
// const sum = require('./test_fn')
import { miniScheduler } from '../API/Datetime';
 
// describe('testing index file', () => {

//   test('1 + 2 = 3', () => {
//     expect(sum(1 , 2)).toBe(3);
//   });
//   test('Invalid Input types', () => {
//     expect(sum('I', 2)).toThrowError
//   });
//   test('Addition of null sets', () => {
//     expect(sum([], 1)).toThrowError
//   });
// });

describe('testing mini scheduler', () => {
  test('db is up to date (rainfall)', () => {
    expect(miniScheduler(new Date(2023,1,1,13,45), new Date(2023,1,1,13,53), 5, 10)).toStrictEqual([])
  });
  test('db is up to date (1 min sensors)', () => {
    expect(miniScheduler(new Date(2023,1,1,13,45), new Date(2023,1,1,13,47), 1, 5)).toStrictEqual([])
  });
  test('invalid start time ( < db start )', () => {
    expect(miniScheduler(new Date(2023,1,1,13,45), new Date(2023,1,1,13,40), 5, 10)).toStrictEqual([])
  });
  test('db will be updated (rainfall)', () => {
    expect(miniScheduler(new Date(2023,1,13,13,40), new Date(2023,1,13,13,55,20), 5, 10)).toStrictEqual(['2023-02-13T13:45:00'])
  });
  test('db will be updated (1 min sensors)', () => {
    expect(miniScheduler(new Date(2023,1,13,13,47), new Date(2023,1,13,13,53,20), 1, 5)).toStrictEqual(['2023-02-13T13:48:00'])
  })
  test('multiple rows db will be updated (rainfall)', () => {
    expect(miniScheduler(new Date(2023,1,13,13,35), new Date(2023,1,13,13,58,20), 5, 10))
    .toStrictEqual(
      [
        '2023-02-13T13:40:00',
        '2023-02-13T13:45:00'
      ]
      )
  })
  test('multiple rows db will be updated (1 min sensors)', () => {
    expect(miniScheduler(new Date(2023,1,13,13,45), new Date(2023,1,13,13,58,20), 1, 5))
    .toStrictEqual(
      [
        '2023-02-13T13:46:00',
        '2023-02-13T13:47:00',
        '2023-02-13T13:48:00',
        '2023-02-13T13:49:00',
        '2023-02-13T13:50:00',
        '2023-02-13T13:51:00',
        '2023-02-13T13:52:00',
        '2023-02-13T13:53:00'
      ]
    )
  })
})