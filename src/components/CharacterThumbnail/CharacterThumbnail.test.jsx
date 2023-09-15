import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterThumbnail from './CharacterThumbnail';

jest.mock('../../store/MarvelContext', () => ({
  useMarvel: () => ({
    favoritesCharacters: [],
    setFavoritesCharacters: jest.fn(),
  }),
}));

const character = {
  id: 1,
  name: 'Iron Man',
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55',
    extension: 'jpg',
  },
  isFavorited: false,
};

test('renders the character thumbnail and name', () => {
  render(<CharacterThumbnail character={character} />);

  const thumbnailElement = screen.getByAltText('Imagem em miniatura do personagem');
  const nameElement = screen.getByText('Iron Man');

  expect(thumbnailElement).toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
});

test('toggles favorite status on button click then remove favorite status', () => {
  render(<CharacterThumbnail character={character} />);

  const favoriteButton = screen.getByRole('button');
  fireEvent.click(favoriteButton);
  const favoriteElement = screen.getByAltText('icone para desfavoritar');
  expect(favoriteElement).toBeInTheDocument();
  fireEvent.click(favoriteButton);
  const unFavoriteElement = screen.getByAltText('icone para favoritar');
  expect(favoriteElement).toBeInTheDocument();
});

