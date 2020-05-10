import { calculateE1RM } from '../e1rm/calculate';

import axios from 'axios';

export const Actions = {
    loadCalculations: 'load-calculations',
    addUser: 'add-user',
    calculate: 'calculate',
    saveName: 'save-name',
};

export function reducer(state, action) {
    switch (action.type) {
        case 'weight':
            return { ...state, weight: action.payload };
        case 'reps':
            return { ...state, reps: action.payload };
        case 'rpe':
            return { ...state, rpe: action.payload };
        case Actions.calculate:
            const e1rm = calculateE1RM(state.weight, state.rpe, state.reps);
            if (e1rm === '') {
                return state;
            }
            const calculation = {
                reps: state.reps,
                weight: state.weight,
                rpe: state.rpe,
                e1rm: e1rm.toFixed(2),
            };
            console.log('making save');
            axios.post('https://ghostlander-e1rm.builtwithdark.com/e1rm', {
                ...calculation,
                userId: state.userId,
                created: new Date(),
                lift: '',
            });
            return {
                ...state,
                lastCalculation: calculation,
                calculations: [calculation, ...state.calculations],
            };
        case Actions.loadCalculations:
            return { ...state, loaded: true, calculations: action.payload };
        case Actions.addUser:
            return { ...state, userId: action.payload.userId, name: action.payload.name };
        case Actions.saveName:
            axios.post('https://ghostlander-e1rm.builtwithdark.com/user', {
                userId: state.userId,
                name: action.payload,
            });
            return { ...state, name: action.payload };
        default:
            throw new Error();
    }
}
