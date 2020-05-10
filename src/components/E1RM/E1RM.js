import React from 'react';

import { calculateE1RM } from '../../e1rm/calculate';

const allowedRPEs = ['6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'];

export default function E1RM({ weight, reps, rpe }) {
    if (weight === 0 || reps === 0) {
        return <span data-testid="e1rm-none"></span>;
    }
    if (allowedRPEs.indexOf(rpe) === -1) {
        return (
            <div>
                E1RM can only be calculated for these RPE:{' '}
                <span data-testid="allowed-rpe">{allowedRPEs.join(', ')}</span>
            </div>
        );
    }

    const e1rm = calculateE1RM(weight, rpe, reps);

    if (e1rm < 1) {
        return <span data-testid="e1rm-none"></span>;
    }

    const successfulE1RM = e1rm.toFixed(2);

    return (
        <div>
            Estimated 1RM: <span data-testid="estimated-1rm">{successfulE1RM}</span>
        </div>
    );
}
