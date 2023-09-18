/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CharacterThumbnail, OrderByName, SearchInput } from '../../components';
import { fetchAllCharacters, findByNameCharacter, orderByCharacterName } from '../../services/api';
import { decorateFavoriteCharacters } from '../../services/utils';
import { useMarvel } from '../../store/MarvelContext';
import favoritOn from '../../assets/favorito_01.svg';
import favoritOff from '../../assets/favorito_02.svg';
import logo from '../../assets/logo.svg';
import './Home.scss'; // Update the import statement for your SASS file

function Home() {
  const [characters, setCharacters] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const { charactersContext, setCharactersContext, favoritesCharacters } = useMarvel();
  const [searchParams] = useSearchParams();

  const setCharacterDecorated = (data) => {
    const decoratedChars = decorateFavoriteCharacters(favoritesCharacters, data);
    setCharacters(decoratedChars);
    setCharactersContext(decoratedChars);
  };
  const searchForName = useCallback((characterName) => {
    const charactersData = findByNameCharacter(characterName);
    charactersData.then((chars) => {
      setCharacterDecorated(chars.data.results);
      setShowFavorites(false);
    });
  });

  useEffect(() => {
    const charName = searchParams.get('searchName');
    if (charName) {
      searchForName(charName);
    } else {
      const charactersData = fetchAllCharacters();
      charactersData.then((chars) => {
        setCharacterDecorated(chars.data.results);
      }).catch((error) => console.log('error', error));
    }
  }, []);
  const toggleFavorite = useCallback(() => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      setCharacters((() => favoritesCharacters
      ));
    } else {
      setCharacters(charactersContext);
    }
  });

  const onOrderByName = useCallback((isOrderByName) => {
    if (isOrderByName) {
      const charactersData = orderByCharacterName();
      charactersData.then((chars) => {
        setCharacterDecorated(chars.data.results);
        setShowFavorites(false);
      });
    }
  });

  return (
    <div className="homeContainer">
      <img src={logo} alt="" />
      <h1 className="homeTitle">EXPLORE O UNIVERSO</h1>
      <p className="homeDescription">
        mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama -
        e aqueles que você descobrirá em breve!
      </p>
      <SearchInput onSearchName={searchForName} />

      <div className="filterContainer">
        <p className="resultQuantityText">{`Encontrados ${characters.length} heróis`}</p>
        <div className="orderFavoriteContainer">
          <OrderByName onClickOrderByName={onOrderByName} />
          <div className="favoritsContainer">
            <div
              role="button"
              tabIndex={0}
              onClick={toggleFavorite}
              className="showFavoritesButton"
            >
              <img src={showFavorites ? favoritOn : favoritOff} alt="" />
            </div>
            <p className="resultQuantityText">Somente favoritos</p>
          </div>
        </div>
      </div>
      <div className="charactersContainer">
        {characters.length > 0 && characters.map((character) => (
          <div key={character.id} className="singleCharactersContainer">
            <CharacterThumbnail
              character={character}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
