import React, { useReducer, useEffect, FormEvent, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import E1RMForm from './components/E1RMForm/E1RMForm';
import E1RMCalculations from './components/E1RMCalculations/E1RMCalculations';
import Name from './components/Name/Name';

import { reducer, State } from './reducers/e1rm.reducer';

export const initialState: State = {
    reps: 0,
    weight: 0,
    rpe: 8,
    calculations: [],
    lastCalculation: undefined,
    loaded: false,
    lift: '',
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser] = useState({
        userId: '',
        name: ''
    });

    useEffect(() => {
        if (user.userId !== '') {
            return;
        }
        let { userId } = localStorage;
        if (!!userId) {
            async function fetchUser(uId: string) {
                const response = await axios.get('https://ghostlander-e1rm.builtwithdark.com/user?userId=' + uId);
                setUser(response.data);
            }
            fetchUser(userId);
            return;
        }
        // If they don't already have one, let's generate them one.
        userId = uuidv4();
        async function createUser(uId: string) {
            const response = await axios.post('https://ghostlander-e1rm.builtwithdark.com/user', { userId: uId });
            if (response.status === 200) {
                setUser(u => {
                    u.userId = uId;
                    return u;
                });
                localStorage.userId = uId;
            }
        }
        createUser(userId);
    }, [user.userId]);

    useEffect(() => {
        if (state.loaded || user.userId === '') {
            return;
        }
        async function fetchData() {
            const response = await axios.get('https://ghostlander-e1rm.builtwithdark.com/e1rms?userId=' + user.userId);
            dispatch({ type: 'load-calculations', payload: response.data });
        }
        fetchData();
    }, [state.loaded, user.userId]);

    // FIXME: How to prevent this from firing off on initial load if they had a name to start with?
    // Maybe split the user stuff up and put it in a separate state object or perhaps the context? Need to read more
    // about how context works.
    useEffect(() => {
        if (user.name === '') {
            return;
        }
        axios.post('https://ghostlander-e1rm.builtwithdark.com/user', {
            userId: user.userId,
            name: user.name,
        });
    }, [user.name, user.userId]);

    useEffect(() => {
        if (!state.lastCalculation) {
            return;
        }
        axios.post('https://ghostlander-e1rm.builtwithdark.com/e1rm', {
            ...state.lastCalculation,
            userId: user.userId,
        });
    }, [state.lastCalculation, user.userId]);

    let calculationsArea = <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>;
    if (state.loaded) {
        calculationsArea = <E1RMCalculations calculations={state.calculations} />;
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Navbar bg="light" className="justify-content-between">
                        <Navbar.Brand href="#home">Estimated 1 rep max calculator</Navbar.Brand>
                        <span>
                            E1RMs for <Name
                                name={user.name}
                                onChange={(name: string) => setUser({ ...user, name })}
                            />
                        </span>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
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
                </Col>
                <Col md={8}>
                    {calculationsArea}
                </Col>
            </Row>
        </Container>
    );
}

export default App;
