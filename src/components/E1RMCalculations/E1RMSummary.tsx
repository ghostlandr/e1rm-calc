import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { Calculation } from '../../reducers/e1rm.reducer';

const E1RMSummary = ({ calculation }: { calculation: Calculation }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div>
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

export default E1RMSummary;
