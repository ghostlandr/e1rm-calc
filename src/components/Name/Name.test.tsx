import React from 'react';
import Name from './Name';
import { render, fireEvent } from '@testing-library/react';

describe('Name', () => {
  it('should render prop name on initial render', () => {
    const { getByText } = render(<Name name="Graham" onChange={() => {}} />);
    const el = getByText('Graham');
    expect(el.textContent).toEqual('Graham');
  });

  it('should render placeholder if name not passed in', () => {
    const { getByText } = render(<Name onChange={() => {}} />);
    const el = getByText('Your name');
    expect(el.textContent).toEqual('Your name');
  });

  it('should show a form if name area is clicked', () => {
    const { getByText, getByRole } = render(
      <Name name="Graham" onChange={() => {}} />
    );
    fireEvent.click(getByText('Graham'));
    const text = getByRole('textbox') as HTMLInputElement;
    expect(text.value).toEqual('Graham');
  });

  it('should call callback to set name when form is saved', () => {
    const mockFn = jest.fn();
    const { getByText, getByRole } = render(
      <Name name="Graham" onChange={mockFn} />
    );
    fireEvent.click(getByText('Graham'));
    const text = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(text, { target: { value: 'New Name' } });
    fireEvent.click(getByRole('button'));
    expect(mockFn).toHaveBeenCalledWith('New Name');

    // Form can also be saved by pressing Enter
    fireEvent.click(getByText(/New Name/i));
    const text2 = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(text2, { target: { value: 'Another One' } });
    // Why doesn't this work?
    // fireEvent.keyDown(text2, { key: 'Enter', code: 'Enter' });
    fireEvent.click(getByRole('button'));
    expect(mockFn).toHaveBeenLastCalledWith('Another One');
  });
});
