import React from 'react';
import { render } from '@testing-library/react';

import E1RM from '../E1RM';

test('E1RM renders empty string if weight is 0', () => {
    const { getByTestId } = render(<E1RM weight={0} reps={5} />);
    const empty = getByTestId('e1rm-none');
    expect(empty.textContent).toEqual('');
});

test('E1RM renders empty string if reps are 0', () => {
    const { getByTestId } = render(<E1RM weight={225} reps={0} />);
    const empty = getByTestId('e1rm-none');
    expect(empty.textContent).toEqual('');
});

test('E1RM renders warning message if rpe not in the right range', () => {
    const { getByTestId } = render(<E1RM rpe="1" weight={225} reps={5} />);
    const rpes = getByTestId('allowed-rpe');
    expect(rpes.textContent).toEqual('6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10');
});

test('E1RM renders a number if props are proper', () => {
    const { getByTestId } = render(<E1RM rpe="8" weight={225} reps={5} />);
    const e1rm = getByTestId('estimated-1rm');
    expect(e1rm.textContent).toEqual('277.78');
});
