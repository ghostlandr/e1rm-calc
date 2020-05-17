import { calculateE1RM } from '../calculate';

test('calculateE1RM should return 0 if it is passed zeroes', () => {
    expect(calculateE1RM(0, 0, 0)).toEqual(0);
    expect(calculateE1RM(0, 1, 0)).toEqual(0);
    expect(calculateE1RM(150, 1, 0)).toEqual(0);
    expect(calculateE1RM(0, 1, 200)).toEqual(0);
});
