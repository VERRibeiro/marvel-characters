import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/ic_busca.svg';

import './SearchInput.sass';

function SearchInput({ onSearchName }) {
  const [characterName, setCharacterName] = useState('');

  const handleSearch = () => {
    onSearchName(characterName);
  };

  const handleInputChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="searchInputContainer">
      <button type="button" className="searchIconButton" onClick={handleSearch}>
        <img src={searchIcon} className="searchIcon" alt="Icone de busca de herói por nome" />
      </button>
      <input type="text" className="searchInput" placeholder="Procure por heróis" value={characterName} onInput={handleInputChange} onKeyDown={handleKeyDown} />
    </div>
  );
}

SearchInput.propTypes = {
  onSearchName: PropTypes.func.isRequired,
};
export default SearchInput;
