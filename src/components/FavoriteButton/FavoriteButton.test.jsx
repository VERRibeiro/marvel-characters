import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import FavoriteButton from './FavoriteButton';
import { useMarvel } from '../../store/MarvelContext';

// Mock the useMarvel context
jest.mock('../../store/MarvelContext');

describe('FavoriteButton Component', () => {
  it('renders the button with the correct alt text', () => {
    useMarvel.mockReturnValue({
      favoritesCharacters: [{ id: 1009355, name: 'Char1', isFavorited: true }],
      setFavoritesCharacters: jest.fn(),
    });
    const character = { id: 1, isFavorited: false };
    const { getByAltText } = render(<FavoriteButton character={character} />);
    const altText = getByAltText('icone para favoritar');
    expect(altText).toBeInTheDocument();
  });

  it('toggles favorited button and calls setFavoritesCharacters', () => {
    useMarvel.mockReturnValue({
      favoritesCharacters: [{ id: 1009355, name: 'Char1', isFavorited: true },
      ],
      setFavoritesCharacters: jest.fn(),
    });
    const character = { id: 1, isFavorited: false };
    const { getByRole, getByAltText } = render(<FavoriteButton character={character} />);
    const button = getByRole('button');

    fireEvent.click(button);

    // Verifying if favorite is checked
    const altTextUnfavorite = getByAltText('icone para desfavoritar');
    expect(altTextUnfavorite).toBeInTheDocument();

    fireEvent.click(button);
    // Verifying if favorite is unchecked
    const altTextFavorite = getByAltText('icone para favoritar');
    expect(altTextFavorite).toBeInTheDocument();
  });

  it('dont allow to favorite more than 5 characters', () => {
    useMarvel.mockReturnValue({
      favoritesCharacters: [{ id: 1009355, name: 'Char1', isFavorited: true },
        { id: 1009356, name: 'Char2', isFavorited: true },
        { id: 1009357, name: 'Char3', isFavorited: true },
        { id: 1009358, name: 'Char4', isFavorited: true },
        { id: 1009358, name: 'Char5', isFavorited: true }],
      setFavoritesCharacters: jest.fn(),
    });

    const character = { id: 1, isFavorited: false };
    const { getByRole, getByAltText } = render(<FavoriteButton character={character} />);
    const button = getByRole('button');
    fireEvent.click(button);

    // Verifying if component is not checked when favoriteCharacters have size equals to 5
    const altTextUnfavorite = getByAltText('icone para favoritar');
    expect(altTextUnfavorite).toBeInTheDocument();
  });
});
