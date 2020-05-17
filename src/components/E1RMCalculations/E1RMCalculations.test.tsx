import React from 'react';
import { render } from '@testing-library/react';

import E1RMCalculations from './E1RMCalculations';
import { Calculation } from '../../reducers/e1rm.reducer';

const mockCalculations: Calculation[] = [
    {
        e1rm: '201',
        lift: 'squat',
        weight: 150,
        reps: 5,
        rpe: 7,
    },
    {
        e1rm: '200',
        lift: 'squat',
        weight: 150,
        reps: 5,
        rpe: 7,
    },
];

describe('E1RMCalculations', () => {
    it('renders nothing if it gets 0 calculations', () => {
        const { getByTestId } = render(<E1RMCalculations calculations={[]} />);
        const empty = getByTestId('no-data');
        expect(empty.textContent).toEqual('');
    });

    it('renders heading if it gets two calculations', () => {
        const { getByRole } = render(<E1RMCalculations calculations={mockCalculations} />);
        const heading = getByRole('heading', { name: /Previously Calculated E1RMs/ });
        expect(heading.textContent).not.toEqual('');
    });
});
