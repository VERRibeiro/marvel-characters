import axios from 'axios';
// TODO offset para paginação
const gatewayUrl = 'https://gateway.marvel.com/v1/public/characters';
const apiKey = 'apikey=790ee6e72d13cee6cf7b6fc8c57046ab&hash=9e686cbd5b367ecab65ff2e2222b9060&ts=1';

/**
 * Represents a ComicList object.
 * @typedef {Object} ComicList
 * @property {number} available - The number of comics available.
 */

/**
 * Represents a SeriesList object.
 * @typedef {Object} SeriesList
 * @property {number} available - The number of series available.
 */

/**
 * Represents a Thumbnail object.
 * @typedef {Object} Thumbnail
 * @property {string} path - The path of the image resource.
 * @property {string} extension - The extension of the image resource.
 */

/**
 * Represents a Comic object.
 * @typedef {Object} Comic
 * @property {number} id - The comic unique identifier.
 * @property {string} title - The canonical title of the comic.
 * @property {Thumbnail} thumbnail - The representative image for this comic.
 */

/**
 * Represents a Comics set of object.
 * @typedef {Object} Comics
 * @property {number} offset - The requested offset (number of skipped results) of the call.
 * @property {number} limit - The requested result limit.
 * @property {number} total - The total number of resources available given the current filter set.
 * @property {number} count - The total number of results returned by this call.
 * @property {Date} modified - The date the resource was most recently modified.
 * @property {Comic[]} results - An array of Book objects.
 */

/**
 * Represents a Character object.
 * @typedef {Object} Character
 * @property {number} id - The unique ID of the character resource.
 * @property {string} name - The name of the character.
 * @property {string} description - A short bio or description of the character.
 * @property {Date} modified - The date the resource was most recently modified.
 * @property {Thumbnail} thumbnail - The representative image for this character.
 * @property {ComicList} comics  - A resource list containing comics which feature this character.
 * @property {SeriesList} series  - A resource list of series in which this character appears.
 */

/**
 * Represents a Character set of object.
 * @typedef {Object} Characters
 * @property {number} offset - The requested offset (number of skipped results) of the call.,
 * @property {number} limit - The requested result limit.,
 * @property {number} total - The total number of resources available given the current filter set.,
 * @property {number} count - The total number of results returned by this call.,
 * @property {Character[]} results - An array of Book objects.
 */

/**
 * Fetchs data from the firsts 20 characters
 * @returns {Characters} A Characters object .
 */
export async function fetchAllCharacters() {
  return axios.get(`${gatewayUrl}?${apiKey}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

/**
 * Fetchs data from the firsts 20 characters that the attribute name starts with characterName
 * @param {string} characterName - The character name
 * @returns {Characters} A Characters object  .
 */
export async function findByNameCharacter(characterName) {
  return axios.get(`${gatewayUrl}?${apiKey}&nameStartsWith=${characterName || 'a'}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

/**
 * Fetchs data from the firsts 20 characters order by the name attribute
 * @returns {Characters} A Characters object .
 */
export async function orderByCharacterName() {
  return axios.get(`${gatewayUrl}?${apiKey}&orderBy=name`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

/**
 * Fetchs data from the fists 10 comics by the character by character id
 * @param {string} characterId - The character id
 * @returns {Comics} A Characters object  .
 */
export async function findCharacterComicsById(characterId) {
  return axios.get(`${gatewayUrl}/${characterId}/comics?${apiKey}&limit=10`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

/**
 * Fetch data from the character by characterId
 * @param {string} characterId - The character id
 * @returns {Character} A Characters object  .
 */
export async function findCharacterById(characterId) {
  return axios.get(`${gatewayUrl}/${characterId}?${apiKey}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
