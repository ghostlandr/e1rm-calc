import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { formatDistance } from 'date-fns';

import { Calculation } from '../../reducers/e1rm.reducer';

import './E1RMCalculations.css';

interface E1RMCalculationsProps {
    calculations: Calculation[];
}

export default function E1RMCalculations({ calculations }: E1RMCalculationsProps) {
    const [liftFilter, setLiftFilter] = useState('');
    if (calculations.length < 1) {
        return <span data-testid="no-data"></span>;
    }
    const now = new Date();
    if (liftFilter !== '') {
        calculations = calculations.filter(calc => calc.lift === liftFilter);
    }
    const listItems = calculations.map((calc: Calculation) => <tr key={JSON.stringify(calc)}>
        <td>{calc.created ? formatDistance(new Date(calc.created), now) + ' ago' : 'Unknown'}</td>
        <td>{calc.e1rm}</td>
        <td>{calc.lift}</td>
        <td>{calc.weight}</td>
        <td>{calc.reps}</td>
        <td>{calc.rpe}</td>
    </tr>);

    return (
        <div className="calculations">
            <h2 className="calculations__heading">
                Previously Calculated E1RMs
                <Form.Control className="lift-selector" as="select" required={true} value={liftFilter} onChange={(event) => setLiftFilter(event.target.value)}>
                    <option value="">All lifts</option>
                    <option value="squat">Squat</option>
                    <option value="bench">Bench</option>
                    <option value="deadlift">Deadlift</option>
                    <option value="ohp">Overhead Press</option>
                    <option value="other">Other</option>
                </Form.Control>
            </h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>Recorded</th>
                        <th>E1RM</th>
                        <th>Lift</th>
                        <th>Weight</th>
                        <th>Reps</th>
                        <th>RPE</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </Table>
        </div>
    );
}
