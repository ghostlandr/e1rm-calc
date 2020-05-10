import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import './calculations.css';

export function E1RMSummary({ calculation }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div class="calculations--item">
            {calculation.e1rm}{' '}
            <Button data-testid="details-btn" onClick={() => setExpanded(!expanded)}>
                See details
            </Button>
            {expanded && (
                <div data-testid="expanded-details">
                    Weight: {calculation.weight}, Reps: {calculation.reps}, RPE: {calculation.rpe}
                </div>
            )}
        </div>
    );
}

export default function E1RMCalculations({ calculations }) {
    if (calculations.length <= 1) {
        return <span data-testid="no-data"></span>;
    }
    const listItems = calculations.map((calc) => <E1RMSummary key={JSON.stringify(calc)} calculation={calc} />);

    return (
        <div className="calculations">
            <h2 data-testid="calculation--heading">Previously Calculated E1RMs</h2>
            <div className="calculations--items">{listItems}</div>
        </div>
    );
}
