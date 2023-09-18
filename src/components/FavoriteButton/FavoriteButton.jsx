import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import favoritOn from '../../assets/favorito_01.svg';
import favoritOff from '../../assets/favorito_02.svg';
import { useMarvel } from '../../store/MarvelContext';
import './FavoriteButton.scss';

const QTY_LIMIT_FAVORITE = 5;
function FavoriteButton({ character }) {
  const [isFavorited, setIsFavorited] = useState(character.isFavorited);
  const { favoritesCharacters, setFavoritesCharacters } = useMarvel();

  const toggleFavorite = useCallback(() => {
    if (!isFavorited) {
      if (favoritesCharacters.length < QTY_LIMIT_FAVORITE) {
        setFavoritesCharacters([...favoritesCharacters, { ...character, isFavorited: true }]);
        setIsFavorited(!isFavorited);
      }
    } else {
      setFavoritesCharacters(favoritesCharacters.filter((char) => char.id !== character.id));
      setIsFavorited(!isFavorited);
    }
  });

  return (

    <button type="button" onClick={toggleFavorite} className="favoriteThumbnailButton">
      <img src={isFavorited ? favoritOn : favoritOff} alt={`icone para ${isFavorited ? 'desfavoritar' : 'favoritar'}`} className="favoriteImage" />
    </button>

  );
}

FavoriteButton.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number,
    isFavorited: PropTypes.bool,
  }).isRequired,
};

export default FavoriteButton;
