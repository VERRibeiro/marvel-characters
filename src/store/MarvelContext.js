import React, {
  createContext, useContext, useState,
} from 'react';

const MarvelContext = createContext();

// Componente provedor
// eslint-disable-next-line react/prop-types
export function MarvelProvider({ children }) {
  const [charactersContext, setCharactersContext] = useState([]);

  const [favoritesCharacters, setFavoritesCharacters] = useState([]);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MarvelContext.Provider value={{
      charactersContext, setCharactersContext, favoritesCharacters, setFavoritesCharacters,
    }}
    >
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
