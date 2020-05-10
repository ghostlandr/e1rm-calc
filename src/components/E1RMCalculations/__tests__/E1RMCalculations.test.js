import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import E1RMCalculations, { E1RMSummary } from '../E1RMCalculations';

describe('E1RMCalculations', () => {
    it('renders nothing if it gets 0 calculations', () => {
        const { getByTestId } = render(<E1RMCalculations calculations={[]} />);
        const empty = getByTestId('no-data');
        expect(empty.textContent).toEqual('');
    });

    it('renders nothing if it gets 1 calculation', () => {
        const { getByTestId } = render(<E1RMCalculations calculations={[{ something: 'good' }]} />);
        const empty = getByTestId('no-data');
        expect(empty.textContent).toEqual('');
    });

    it('renders heading if it gets two calculations', () => {
        const { getByTestId } = render(<E1RMCalculations calculations={[{ id: 1 }, { id: 2 }]} />);
        const heading = getByTestId('calculation-heading');
        expect(heading.textContent).not.toEqual('');
    });
});

describe('E1RMSummary', () => {
    it('shows details when see details button clicked', () => {
        const { getByTestId, queryByTestId } = render(<E1RMSummary calculation={{}} />);
        const detailsBtn = getByTestId('details-btn');
        fireEvent.click(detailsBtn);
        const details = getByTestId('expanded-details');
        expect(details.textContent).not.toEqual('');
        fireEvent.click(detailsBtn);
        const details2 = queryByTestId('expanded-details');
        expect(details2).toEqual(null);
    });
});
