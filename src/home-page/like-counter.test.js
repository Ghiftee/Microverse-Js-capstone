import { countItems } from './page-display.js';

const shows = [
  { id: 12, name: 'show1' },
  { id: 13, name: 'show2' },
  { id: 14, name: 'show3' },
  { id: 15, name: 'show4' },
];

describe('count items on page', () => {
  test('input an array with 4 elements', () => {
    expect(countItems(shows)).toEqual(4);
  });
});
