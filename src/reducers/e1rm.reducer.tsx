import { calculateE1RM } from '../e1rm/calculate';

import axios from 'axios';

type Actions = 
    | { type: 'weight', payload: string }
    | { type: 'reps', payload: string }
    | { type: 'rpe', payload: string }
    | { type: 'set-lift', payload: string }
    // TODO: Add type
    | { type: 'load-calculations', payload: any }
    | { type: 'add-user', payload: { userId: string, name?: string } }
    | { type: 'calculate' }
    | { type: 'save-name', payload: string };

export function reducer(state: any, action: Actions) {
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
            if (e1rm === '') {
                return state;
            }
            const calculation = {
                reps: state.reps,
                weight: state.weight,
                rpe: state.rpe,
                lift: state.lift,
                e1rm: e1rm.toFixed(2),
            };
            return {
                ...state,
                lastCalculation: calculation,
                calculations: [calculation, ...state.calculations],
            };
        case 'load-calculations':
            return { ...state, loaded: true, calculations: action.payload };
        case 'add-user':
            return { ...state, userId: action.payload.userId, name: action.payload.name };
        case 'save-name':
            axios.post('https://ghostlander-e1rm.builtwithdark.com/user', {
                userId: state.userId,
                name: action.payload,
            });
            return { ...state, name: action.payload };
        default:
            throw new Error();
    }
}
