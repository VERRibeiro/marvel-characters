import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterThumbnail from './CharacterThumbnail';
import { useMarvel } from '../../store/MarvelContext';

// Mock the useMarvel context
jest.mock('../../store/MarvelContext');

describe('CharacterThumbnail', () => {
  const character = {
    id: 1,
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
      extension: 'jpg',
    },
    name: 'Test Character',
    isFavorited: false,
  };

  it('renders the character thumbnail with a link', () => {
    useMarvel.mockReturnValue({
      favoritesCharacters: [{ id: 1009355, name: 'Char1', isFavorited: true }],
      setFavoritesCharacters: jest.fn(),
    });
    const { container } = render(
      <MemoryRouter>
        <CharacterThumbnail character={character} />
      </MemoryRouter>,
    );

    // Check if the link and image are rendered
    const link = container.querySelector('a');
    const image = container.querySelector('img');
    expect(link).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg');
  });

  it('renders the character name and FavoriteButton', () => {
    useMarvel.mockReturnValue({
      favoritesCharacters: [{ id: 1009355, name: 'Char1', isFavorited: true }],
      setFavoritesCharacters: jest.fn(),
    });
    const { container } = render(
      <MemoryRouter>
        <CharacterThumbnail character={character} />
      </MemoryRouter>,
    );

    // Check if the character name and FavoriteButton are rendered
    const characterName = container.querySelector('.characterName');
    const favoriteButton = container.querySelector('button.favoriteThumbnailButton');
    expect(characterName).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });
});
