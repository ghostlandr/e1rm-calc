import React from 'react';
import Table from 'react-bootstrap/Table';
import { formatDistance } from 'date-fns';

import { Calculation } from '../../reducers/e1rm.reducer';

type E1RMCalculationsProps = {
    calculations: Calculation[];
}

export default function E1RMCalculations({ calculations }: E1RMCalculationsProps) {
    if (calculations.length < 1) {
        return <span data-testid="no-data"></span>;
    }
    const now = new Date();
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
            <h2>Previously Calculated E1RMs</h2>
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
