import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByAltText } = render(<SearchInput onSearchName={() => {}} />);

    // Check if the input element is rendered with the correct placeholder text
    const searchInput = getByPlaceholderText('Procure por heróis');
    expect(searchInput).toBeInTheDocument();

    // Check if the search icon button is rendered
    const searchIcon = getByAltText('Icone de busca de herói por nome');
    expect(searchIcon).toBeInTheDocument();
  });

  it('calls onSearchName when the search icon button is clicked', () => {
    const mockSearchName = jest.fn();
    const {
      getByPlaceholderText,
      getByRole,
    } = render(<SearchInput onSearchName={mockSearchName} />);

    // Find and type into the input element
    const searchInput = getByPlaceholderText('Procure por heróis');
    fireEvent.input(searchInput, 'Spider-Man');
    // Find and click the search icon button
    const searchIcon = getByRole('button');
    fireEvent.click(searchIcon);

    // Check if onSearchName is called 1 time
    expect(mockSearchName).toHaveBeenCalledTimes(1);
  });

  it('calls onSearchName when Enter key is pressed', () => {
    const mockSearchName = jest.fn();
    const { getByPlaceholderText } = render(<SearchInput onSearchName={mockSearchName} />);

    // Find the input element
    const searchInput = getByPlaceholderText('Procure por heróis');

    // Simulate typing and pressing Enter
    fireEvent.change(searchInput, { target: { value: 'Thor' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    // Check if onSearchName is called 1 time
    expect(mockSearchName).toHaveBeenCalledTimes(1);
  });
});
