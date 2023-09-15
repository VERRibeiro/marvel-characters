import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import favoritOn from '../../assets/favorito_01.svg';
import favoritOff from '../../assets/favorito_02.svg';
import { useMarvel } from '../../store/MarvelContext';
import './CharacterThumbnail.sass';

const QTY_LIMIT_FAVORITE = 5;
function CharacterThumbnail({ character }) {
  const [isFavorited, setIsFavorited] = useState(character.isFavorited);
  const { favoritesCharacters, setFavoritesCharacters } = useMarvel();

  const toggleFavorite = useCallback(() => {
    if (!isFavorited) {
      if (favoritesCharacters.length < QTY_LIMIT_FAVORITE) {
        setFavoritesCharacters((prev) => [...prev, { ...character, isFavorited: true }]);
        setIsFavorited(!isFavorited);
      }
    } else {
      setFavoritesCharacters(favoritesCharacters.filter((char) => char.id !== character.id));
      setIsFavorited(!isFavorited);
    }
  });

  return (
    <div className="characterThumbnailcontainer">
      <img src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`} alt="Imagem em miniatura do personagem" className="thumbnail" />
      <div className="characterNameContainer">
        <h2 className="characterName">{character.name}</h2>

        <button type="button" onClick={toggleFavorite} className="favoriteThumbnailButton">
          <img src={isFavorited ? favoritOn : favoritOff} alt={`icone para ${isFavorited ? 'desfavoritar' : 'favoritar'}`} />
        </button>
      </div>
    </div>
  );
}

CharacterThumbnail.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number,
    thumbnail: PropTypes.shape({
      path: PropTypes.string,
      extension: PropTypes.string,
    }),
    name: PropTypes.string,
    isFavorited: PropTypes.bool,
  }).isRequired,
};

export default CharacterThumbnail;
