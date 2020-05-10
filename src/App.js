import React, { useReducer, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
// import E1RM from './components/E1RM/E1RM';
import E1RMForm from './components/E1RMForm/E1RMForm';
import E1RMCalculations from './components/E1RMCalculations/E1RMCalculations';
import Name from './components/Name/Name';

import { reducer, Actions } from './reducers/e1rm.reducer';

export const initialState = {
    reps: 0,
    weight: 0,
    rpe: 1,
    calculations: [],
    lastCalculation: null,
    loaded: false,
    userId: '',
    name: '',
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.userId !== '') {
            return;
        }
        let { userId } = localStorage;
        if (!!userId) {
            async function fetchUser(uId) {
                const response = await axios.get('https://ghostlander-e1rm.builtwithdark.com/user?userId=' + uId);
                dispatch({ type: Actions.addUser, payload: response.data });
            }
            fetchUser(userId);
            return;
        }
        // If they don't already have one, let's generate them one.
        userId = uuidv4();
        async function createUser(uId) {
            const response = await axios.post('https://ghostlander-e1rm.builtwithdark.com/user', { userId: uId });
            if (response.status === 200) {
                dispatch({ type: Actions.addUser, payload: uId });
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
            dispatch({ type: Actions.loadCalculations, payload: response.data });
        }
        fetchData();
    }, [state.loaded, state.userId]);

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand href="#home">Estimated 1 rep max calculator</Navbar.Brand>
            </Navbar>
            <div className="app">
                {/* <E1RM
                    weight={state.weight}
                    reps={state.reps}
                    rpe={state.rpe}
                    onCalculation={(calc) => dispatch({ type: 'calculation', payload: calc })}
                /> */}
                <div className="e1rms">
                    <div className="e1rms--form">
                        <Name
                            name={state.name}
                            saveName={(name) => dispatch({ type: Actions.saveName, payload: name })}
                        />
                        {state.lastCalculation !== null && <div>Estimated 1RM: {state.lastCalculation.e1rm}</div>}
                        <E1RMForm
                            weight={state.weight}
                            reps={state.reps}
                            rpe={state.rpe}
                            setWeight={(weight) => dispatch({ type: 'weight', payload: weight })}
                            setReps={(reps) => dispatch({ type: 'reps', payload: reps })}
                            setRpe={(rpe) => dispatch({ type: 'rpe', payload: rpe })}
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
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
