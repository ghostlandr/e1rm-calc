import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function E1RMForm({ rpe, weight, reps, setRpe, setWeight, setReps, onSubmit }) {
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="rpe">
                <Form.Label>RPE</Form.Label>
                <Form.Control
                    type="number"
                    max="10"
                    min="1"
                    value={rpe}
                    onChange={(event) => setRpe(event.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="weight">
                <Form.Label>Weight (lb)</Form.Label>
                <Form.Control
                    type="number"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="reps">
                <Form.Label>Repetitions</Form.Label>
                <Form.Control
                    type="number"
                    value={reps}
                    onChange={(event) => setReps(event.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
    );
}
