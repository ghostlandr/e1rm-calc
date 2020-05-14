import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface E1RMFormProps {
    rpe: number;
    weight: number;
    reps: number;
    lift: string;
    setRpe: (rpe: number) => void;
    setWeight: (weight: number) => void;
    setReps: (reps: number) => void;
    setLift: (lift: string) => void;
    onSubmit: any;
}

const E1RMForm: FunctionComponent<E1RMFormProps> = ({ rpe, weight, reps, lift, setRpe, setWeight, setReps, setLift, onSubmit }) => {
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="rpe">
                <Form.Label>RPE</Form.Label>
                <Form.Control
                    type="number"
                    max="10"
                    min="1"
                    value={rpe}
                    onChange={(event) => setRpe(+event.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="weight">
                <Form.Label>Weight (lb)</Form.Label>
                <Form.Control
                    type="number"
                    value={weight}
                    onChange={(event) => setWeight(+event.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="reps">
                <Form.Label>Repetitions</Form.Label>
                <Form.Control
                    type="number"
                    value={reps}
                    onChange={(event) => setReps(+event.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lift">
                <Form.Label>Lift</Form.Label>
                <Form.Control type="text" value={lift} onChange={(event) => setLift(event.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default E1RMForm;
