import axios from 'axios';
// TODO offset para paginação
const apiUrl = 'https://gateway.marvel.com/v1/public/characters?apikey=790ee6e72d13cee6cf7b6fc8c57046ab&hash=9e686cbd5b367ecab65ff2e2222b9060&ts=1';

export async function fetchAllCharacters() {
  return axios.get(apiUrl)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function findByNameCharacter(characterName) {
  return axios.get(`${apiUrl}&nameStartsWith=${characterName || 'a'}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function orderByCharacterName() {
  return axios.get(`${apiUrl}&orderBy=name`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
