import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrderByName from './OrderByName';

describe('OrderByName', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(<OrderByName onClickOrderByName={() => {}} />);

    // Check if the component renders with the text "Ordenar por nome - A/Z"
    expect(getByText('Ordenar por nome - A/Z')).toBeInTheDocument();

    // Check if the slider is initially in the "off" position
    const toggleSwitch = getByRole('button').closest('.toggleSwitch');
    expect(toggleSwitch).toHaveClass('off');
  });

  it('calls onClickOrderByName when clicked', () => {
    const onClickOrderByName = jest.fn();
    const { getByRole } = render(<OrderByName onClickOrderByName={onClickOrderByName} />);

    // Click the component to toggle the order
    const toggleSwitch = getByRole('button').closest('.toggleSwitch');
    fireEvent.click(toggleSwitch);

    // Check if onClickOrderByName is called with the correct argument (true)
    expect(onClickOrderByName).toHaveBeenCalledWith(true);

    // Click the component again to toggle back
    fireEvent.click(toggleSwitch);

    // Check if onClickOrderByName is called with the correct argument (false)
    expect(onClickOrderByName).toHaveBeenCalledWith(false);
  });

  it('toggles the slider when clicked', () => {
    const { getByRole } = render(<OrderByName onClickOrderByName={() => {}} />);

    // Click the component to toggle the order
    const toggleSwitch = getByRole('button').closest('.toggleSwitch');
    fireEvent.click(toggleSwitch);

    // Check if the slider is now in the "on" position
    expect(toggleSwitch).toHaveClass('on');

    // Click the component again to toggle back
    fireEvent.click(toggleSwitch);

    // Check if the slider is back in the "off" position
    expect(toggleSwitch).toHaveClass('off');
  });
});
