import { reducer, State, Calculation } from './e1rm.reducer';

export const initialState: State = {
    reps: 0,
    weight: 0,
    rpe: 1,
    calculations: [],
    lastCalculation: undefined,
    loaded: false,
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

        it('should load calculations and set loaded to true', () => {
            expect(initialState.loaded).toEqual(false);
            const newState = reducer(initialState, {
                type: 'load-calculations',
                payload: [{} as Calculation, {} as Calculation],
            });
            expect(newState.calculations.length).toEqual(2);
            expect(newState.loaded).toEqual(true);
        });

        it('should set various and sundry values', () => {
            let newState = reducer(initialState, { type: 'reps', payload: 5 });
            expect(newState.reps).toEqual(5);
            newState = reducer(newState, { type: 'rpe', payload: 8 });
            expect(newState.rpe).toEqual(8);
            newState = reducer(newState, { type: 'weight', payload: 8 });
            expect(newState.weight).toEqual(8);
            newState = reducer(newState, { type: 'set-lift', payload: 'squat' });
            expect(newState.lift).toEqual('squat');
        });
    });
});
