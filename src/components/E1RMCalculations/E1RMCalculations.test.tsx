import React from 'react';
import { render, fireEvent } from '@testing-library/react';

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
  {
    e1rm: '140',
    lift: 'ohp',
    weight: 110,
    reps: 5,
    rpe: 8,
  },
];

describe('E1RMCalculations', () => {
  it('should render a helper message if it gets 0 calculations', () => {
    const { getByText } = render(<E1RMCalculations calculations={[]} />);
    const empty = getByText(/You haven't calculated an estimated 1RM yet/);
    expect(empty).not.toBeNull();
  });

  it('should render a heading if it gets one or more calculations', () => {
    const { getByRole } = render(
      <E1RMCalculations calculations={mockCalculations} />
    );
    const heading = getByRole('heading', {
      name: /Previously Calculated E1RMs/,
    });
    expect(heading.textContent).not.toEqual('');
  });

  it('should filter the e1rms by the lift selected', async () => {
    const { getByRole, getByText, findAllByRole } = render(
      <E1RMCalculations calculations={mockCalculations} />
    );

    // Get all the current table rows
    let tableRows = await findAllByRole('row');
    // Table rows includes the header row
    expect(tableRows.length).toEqual(mockCalculations.length + 1);

    // Set the filter to bench
    const select = getByRole('combobox');
    fireEvent.change(select, {
      target: { value: 'bench' },
    });
    // No lifts in the mockCalculations match this filter, a message is shown.
    expect(getByText(/E1RMs for this lift/i)).toBeInTheDocument();

    // Switch the filter to overhead press, which has an e1rm
    fireEvent.change(select, {
      target: { value: 'ohp' },
    });
    tableRows = await findAllByRole('row');
    // Expect that there will be the one OHP row + the header row
    expect(tableRows.length).toEqual(2);
  });
});
