import axiosMock from 'axios';

import { reducer } from '../e1rm.reducer';

jest.mock('axios');

describe('e1rm reducer', () => {
    it('should call dark api only once when calculating e1rm', async () => {
        const state = {
            reps: 5,
            weight: 225,
            rpe: 8,
            userId: '12345',
            calculations: [],
        };
        const newState = reducer(state, { type: 'calculate' });
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(newState.calculations.length).toEqual(1);
    });
});
