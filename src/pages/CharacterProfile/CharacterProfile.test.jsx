import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import CharacterProfile from './CharacterProfile';
import { useMarvel } from '../../store/MarvelContext';

jest.mock('../../store/MarvelContext');

jest.mock('axios');

describe('CharacterProfile', () => {
  it('renders character profile and comics', async () => {
    useMarvel.mockReturnValue({
      favoritesCharacters: [{ id: 1009355, name: 'Char1', isFavorited: true }],
      setFavoritesCharacters: jest.fn(),
    });
    const characterResponse = {
      data: {
        results: [
          {
            id: 1,
            name: 'Spider-Man',
            description: 'A web-slinging hero.',
            thumbnail: {
              path: 'path/to/image',
              extension: 'jpg',
            },
            stories: {
              available: 10,
            },
            series: {
              available: 5,
            },
          },
        ],
      },
    };

    const comicsResponse = {
      data: {
        results: [
          {
            id: 101,
            title: 'Comic Title 1',
            thumbnail: {
              path: 'path/to/comic',
              extension: 'jpg',
            },
          },
          {
            id: 102,
            title: 'Comic Title 2',
            thumbnail: {
              path: 'path/to/comic',
              extension: 'jpg',
            },
          },
        ],
      },
    };

    // Mock Axios.get to return the defined responses
    axios.get.mockResolvedValueOnce(characterResponse).mockResolvedValueOnce(comicsResponse);

    const { getByText, getByAltText } = render(
      <MemoryRouter initialEntries={['/profile?cid=1']}>
        <Routes>
          <Route path="/profile" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for data to load
    setTimeout(() => {
      expect(getByText('Spider-Man')).toBeInTheDocument();
      expect(getByText('A web-slinging hero.')).toBeInTheDocument();
      expect(getByText('Quadrinhos')).toBeInTheDocument();
      expect(getByText('Series')).toBeInTheDocument();
      expect(getByText('Rating')).toBeInTheDocument();
      expect(getByText('Últimos Lançamentos')).toBeInTheDocument();
      expect(getByText('Comic Title 1')).toBeInTheDocument();
      expect(getByText('Comic Title 2')).toBeInTheDocument();
      expect(getByAltText('Poster do personagem')).toBeInTheDocument();
      expect(getByAltText('Icone de busca de herói por nome')).toBeInTheDocument();
      expect(getByAltText('icone para')).toBeInTheDocument();
    }, 2000);
  });

  it('handles character loading state', async () => {
    useMarvel.mockReturnValue({
      favoritesCharacters: [{ id: 1009355, name: 'Char1', isFavorited: true }],
      setFavoritesCharacters: jest.fn(),
    });
    // Mock Axios.get to reject the request
    axios.get.mockRejectedValue(new Error('Error fetching character data'));

    const { getByText } = render(
      <MemoryRouter initialEntries={['/profile?cid=1']}>
        <Routes>
          <Route path="/profile" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for data to load
    await act(async () => {
      await waitFor(() => {
        expect(getByText('Carregando')).toBeInTheDocument();
      });
    });
  });
});
