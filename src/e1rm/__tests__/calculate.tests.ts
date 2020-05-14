import { calculateE1RM } from '../calculate';

test('calculateE1RM should return empty string if it is passed zeroes', () => {
    expect(calculateE1RM(0, 0, 0)).toEqual('');
});
