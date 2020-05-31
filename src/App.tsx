import React, {
  useReducer,
  useEffect,
  FormEvent,
  useState,
  useRef,
} from 'react';
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

require('dotenv').config();

const useDark = true;
const darkRoot = 'https://ghostlander-e1rm.builtwithdark.com';

export const initialState: State = {
  reps: 1,
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
    name: '',
  });
  const userSetName = useRef(false);

  useEffect(() => {
    if (user.userId !== '') {
      return;
    }
    let { userId } = localStorage;
    if (!!userId) {
      async function fetchUser(uId: string) {
        let url = '/user?userId=' + uId;
        if (useDark) {
          url = darkRoot + url;
        }
        const response = await axios.get(url);
        console.log(response.data);
        setUser(response.data);
      }
      fetchUser(userId);
      return;
    }
    // If they don't already have one, let's generate them one.
    userId = uuidv4();
    async function createUser(uId: string) {
      let url = '/user';
      if (useDark) {
        url = darkRoot + url;
      }
      const response = await axios.post(url, { userId: uId });
      if (response.status === 200) {
        setUser((u) => {
          u.userId = uId;
          return u;
        });
        localStorage.userId = uId;
      }
    }
    createUser(userId);
  }, [user.userId]);

  useEffect(() => {
    if (state.loaded) {
      return;
    }
    if (user.userId === '') {
      // don't set loaded to true - this way we can still refetch if a userId is found later
      dispatch({ type: 'load-calculations-no-user' });
      return;
    }
    async function fetchData() {
      console.log(user.userId);
      let url = '/e1rms?userId=' + user.userId;
      if (useDark) {
        url = darkRoot + url;
      }
      const response = await axios.get(url);
      dispatch({ type: 'load-calculations', payload: response.data });
    }
    fetchData();
  }, [state.loaded, user.userId]);

  useEffect(() => {
    if (user.name === '') {
      return;
    }
    if (!userSetName.current) {
      return;
    }
    axios.post('/user', {
      userId: user.userId,
      name: user.name,
    });
  }, [user.name, user.userId]);

  useEffect(() => {
    if (!state.lastCalculation) {
      return;
    }
    axios.post('/e1rm', {
      ...state.lastCalculation,
      userId: user.userId,
    });
  }, [state.lastCalculation, user.userId]);

  let calculationsArea = (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
  if (state.loaded) {
    calculationsArea = <E1RMCalculations calculations={state.calculations} />;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbar bg="light" className="justify-content-between">
            <Navbar.Brand href="#home">
              Estimated 1 rep max calculator
            </Navbar.Brand>
            <span>
              E1RMs for{' '}
              <Name
                name={user.name}
                onChange={(name: string) => {
                  userSetName.current = true;
                  setUser({ ...user, name });
                }}
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
            setWeight={(weight: number) =>
              dispatch({ type: 'weight', payload: weight })
            }
            setReps={(reps: number) =>
              dispatch({ type: 'reps', payload: reps })
            }
            setRpe={(rpe: number) => dispatch({ type: 'rpe', payload: rpe })}
            setLift={(lift: string) =>
              dispatch({ type: 'set-lift', payload: lift })
            }
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              dispatch({ type: 'calculate' });
            }}
          />
        </Col>
        <Col md={8}>{calculationsArea}</Col>
      </Row>
    </Container>
  );
}

export default App;
