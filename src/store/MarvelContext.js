import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const MarvelContext = createContext();

// Componente provedor

export function MarvelProvider({ children }) {
  const [charactersContext, setCharactersContext] = useState([]);

  const [favoritesCharacters, setFavorites] = useState(() => {
    const storedData = localStorage.getItem('favoritesCharacters');
    return storedData ? JSON.parse(storedData) : [];
  });

  const setFavoritesCharacters = (newData) => {
    setFavorites(newData);
    localStorage.setItem('favoritesCharacters', JSON.stringify(newData));
  };
  const value = useMemo(() => ({
    charactersContext, setCharactersContext, favoritesCharacters, setFavoritesCharacters,
  }), [charactersContext, favoritesCharacters]);
  return (
    <MarvelContext.Provider value={value}>
      {children}
    </MarvelContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export const useMarvel = () => {
  const context = useContext(MarvelContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um provedor AppProvider');
  }
  return context;
};

MarvelProvider.propTypes = {
  children: PropTypes.node.isRequired,

};
