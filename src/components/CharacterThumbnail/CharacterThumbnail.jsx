import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from '../FavoriteButton';
import './CharacterThumbnail.scss';

function CharacterThumbnail({ character }) {
  return (
    <div className="characterThumbnailContainer">
      <Link to={`/characters?cid=${character.id}`}>
        <img
          src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
          alt={`Imagem em miniatura do personagem ${character.name}`}
          className="thumbnail"
        />
      </Link>
      <div className="characterNameContainer">
        <h2 className="characterName">{character.name}</h2>
        <FavoriteButton character={character} />
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
