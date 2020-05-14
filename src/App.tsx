import React, { useReducer, useEffect, FormEvent } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
// import E1RM from './components/E1RM/E1RM';
import E1RMForm from './components/E1RMForm/E1RMForm';
import E1RMCalculations from './components/E1RMCalculations/E1RMCalculations';
import Name from './components/Name/Name';

import { reducer, State } from './reducers/e1rm.reducer';

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

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.userId !== '') {
            return;
        }
        let { userId } = localStorage;
        if (!!userId) {
            async function fetchUser(uId: string) {
                const response = await axios.get('https://ghostlander-e1rm.builtwithdark.com/user?userId=' + uId);
                dispatch({ type: 'add-user', payload: response.data });
            }
            fetchUser(userId);
            return;
        }
        // If they don't already have one, let's generate them one.
        userId = uuidv4();
        async function createUser(uId: string) {
            const response = await axios.post('https://ghostlander-e1rm.builtwithdark.com/user', { userId: uId });
            if (response.status === 200) {
                dispatch({ type: 'add-user', payload: {userId: uId} });
                localStorage.userId = uId;
            }
        }
        createUser(userId);
    }, [state.userId]);

    useEffect(() => {
        if (state.loaded || state.userId === '') {
            return;
        }
        async function fetchData() {
            const response = await axios.get('https://ghostlander-e1rm.builtwithdark.com/e1rms?userId=' + state.userId);
            dispatch({ type: 'load-calculations', payload: response.data });
        }
        fetchData();
    }, [state.loaded, state.userId]);

    useEffect(() => {
        if (!state.lastCalculation) {
            return;
        }
        axios.post('https://ghostlander-e1rm.builtwithdark.com/e1rm', {
            ...state.lastCalculation,
            userId: state.userId,
            created: new Date(),
        });
    }, [state.lastCalculation, state.userId]);

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand href="#home">Estimated 1 rep max calculator</Navbar.Brand>
            </Navbar>
            <div className="app">
                <div className="e1rms">
                    <div className="e1rms--form">
                        <Name
                            name={state.name}
                            onChange={(name: string) => dispatch({ type: 'save-name', payload: name })}
                        />
                        {state.lastCalculation !== undefined && <div>Estimated 1RM: {state.lastCalculation.e1rm}</div>}
                        <E1RMForm
                            weight={state.weight}
                            reps={state.reps}
                            rpe={state.rpe}
                            lift={state.lift}
                            setWeight={(weight: number) => dispatch({ type: 'weight', payload: weight })}
                            setReps={(reps: number) => dispatch({ type: 'reps', payload: reps })}
                            setRpe={(rpe: number) => dispatch({ type: 'rpe', payload: rpe })}
                            setLift={(lift: string) => dispatch({ type: 'set-lift', payload: lift })}
                            onSubmit={(e: FormEvent) => {
                                e.preventDefault();
                                dispatch({ type: 'calculate' });
                            }}
                        />
                    </div>
                    <E1RMCalculations calculations={state.calculations} />
                </div>
            </div>
        </div>
    );
}

export default App;
