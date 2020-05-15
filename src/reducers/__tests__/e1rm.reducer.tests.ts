import { reducer, State } from '../e1rm.reducer';

export const initialState: State = {
    reps: 0,
    weight: 0,
    rpe: 1,
    calculations: [],
    lastCalculation: undefined,
    loaded: false,
    userId: '',
    name: '',
    lift: '',
};

describe('e1rm reducer', () => {
    describe('calculate', () => {
        it('should not update state if calculation did not work', () => {
            const newState = reducer(initialState, { type: 'calculate' });
            expect(newState).toEqual(initialState);
        });

        it('should add the new calculation if it succeeded', () => {
            const goodState = { ...initialState, reps: 5, weight: 100, rpe: 8, lift: 'squat' };
            const newState = reducer(goodState, { type: 'calculate' });
            expect(newState.lastCalculation).not.toBeUndefined();
            expect(newState.calculations.length).toEqual(1);
        });
    });
});
