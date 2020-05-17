import { calculateE1RM } from '../e1rm/calculate';

export interface Calculation {
    weight: number;
    rpe: number;
    reps: number;
    lift: string;
    e1rm: string;
    created?: Date;
}

export interface State {
    weight: number;
    rpe: number;
    reps: number;
    lift: string;
    loaded: boolean;
    calculations: Calculation[];
    lastCalculation?: Calculation;
}

// Discriminated union 💁🏼‍♂️ https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
export type Actions =
    | { type: 'weight'; payload: number }
    | { type: 'reps'; payload: number }
    | { type: 'rpe'; payload: number }
    | { type: 'set-lift'; payload: string }
    | { type: 'load-calculations'; payload: Calculation[] }
    | { type: 'calculate' };

export function reducer(state: State, action: Actions): State {
    switch (action.type) {
        case 'weight':
            return { ...state, weight: action.payload };
        case 'reps':
            return { ...state, reps: action.payload };
        case 'rpe':
            return { ...state, rpe: action.payload };
        case 'set-lift':
            return { ...state, lift: action.payload };
        case 'calculate':
            const e1rm = calculateE1RM(state.weight, state.rpe, state.reps);
            if (e1rm === 0) {
                return state;
            }
            const calculation: Calculation = {
                reps: state.reps,
                weight: state.weight,
                rpe: state.rpe,
                lift: state.lift,
                e1rm: e1rm.toFixed(2),
                created: new Date(),
            };
            return {
                ...state,
                lastCalculation: calculation,
                calculations: [calculation, ...state.calculations],
            };
        case 'load-calculations':
            return { ...state, loaded: true, calculations: action.payload };
        default:
            throw new Error();
    }
}
