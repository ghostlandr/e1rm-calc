import React from 'react';

import E1RMSummary from './E1RMSummary';
import { Calculation } from '../../reducers/e1rm.reducer';

type E1RMCalculationsProps = {
    calculations: Calculation[];
}

export default function E1RMCalculations({ calculations }: E1RMCalculationsProps) {
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
