/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { findCharacterById, findCharacterComicsById } from '../../services/api';
import { decorateFavoriteCharacters } from '../../services/utils';
import { SearchInput, FavoriteButton } from '../../components';
import { useMarvel } from '../../store/MarvelContext';
import comicIcon from '../../assets/ic_quadrinhos.svg';
import trailerIcon from '../../assets/ic_trailer.svg';
import starOnIcon from '../../assets/avaliacao_on.svg';
import logo from '../../assets/logo_menor.svg';
import './CharacterProfile.scss';

const characterDefaultText = 'In the realm of fictional characters, there exists a figure cloaked in enigmatic allure';
// TODO tratar erros
function CharacterProfile() {
  const [character, setCharacter] = useState({});
  const [comics, setComics] = useState([]);
  const { favoritesCharacters } = useMarvel();
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const charId = searchParams.get('cid');
    const charactersData = findCharacterById(charId);
    charactersData.then((char) => {
      setCharacter(decorateFavoriteCharacters(favoritesCharacters, char.data.results)[0]);
      setIsReady(true);
    }).catch((error) => console.log('error', error));

    const comicsData = findCharacterComicsById(charId);
    comicsData.then((value) => {
      setComics(value.data.results);
    }).catch((error) => console.log('error', error));
  }, []);

  const searchForName = useCallback((characterName) => {
    navigate(`/?searchName=${characterName}`);
  });
  return (
    <div className="characterProfileContainer">
      <div className="characterProfileHeader">
        <Link to="/">
          <img src={logo} alt="Logo da marvel" />
        </Link>
        <SearchInput onSearchName={searchForName} />
      </div>
      {isReady ? (
        <div className="characterInfoPosterContainer">
          <div className="characterInfoContainer">
            <div className="characterNameContainer">
              <h2 className="characterName">{character.name}</h2>
              <FavoriteButton character={character} />
            </div>
            <p className="characterDescprition">
              {character.description || characterDefaultText}
            </p>
            <div className="comicsAndMovies">
              <div className="comicsAndMoviesDetails">
                <p>Quadrinhos</p>
                <div className="comicsAndMoviesImageContainer">
                  <img src={comicIcon} alt="icone para" />
                  <p>{character.stories?.available || 0}</p>
                </div>
              </div>
              <div className="comicsAndMoviesDetails">
                <p>Series</p>
                <div className="comicsAndMoviesImageContainer">
                  <img src={trailerIcon} alt="icone para" />
                  <p>{character.series?.available || 0 }</p>
                </div>
              </div>
            </div>
            <div className="ratingContainer">
              <p>Rating</p>
              <img src={starOnIcon} alt="" />
              <img src={starOnIcon} alt="" />
              <img src={starOnIcon} alt="" />
              <img src={starOnIcon} alt="" />
              <img src={starOnIcon} alt="" />
            </div>
            <div className="lastModifiedContainer">
              <p>
                <strong>Última Publicação:</strong>
                {' '}
                { comics
                  ? new Date(comics[0]?.modified || null).toLocaleDateString() : 'Sem publicações'}
                {' '}
              </p>
            </div>
          </div>
          <div className="characterPoster">
            <img src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`} alt="Poster do personagem" />
          </div>
        </div>
      ) : <div> Carregando </div>}
      <h2>Últimos Lançamentos</h2>
      <div className="comicsContainer">
        {comics.length > 0 && comics.map((comic) => (
          <div className="comicThumbnailContainer" key={comic.id}>
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" className="comicThumbnail" />
            <h3>{comic.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterProfile;
