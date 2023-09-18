// eslint-disable-next-line import/prefer-default-export
export function decorateFavoriteCharacters(favoritesCharacters, allCharacters) {
  const favoritesIds = favoritesCharacters?.map((fChars) => fChars.id);
  return allCharacters.map((c) => (favoritesIds?.includes(c.id)
    ? { ...c, isFavorited: true } : c));
}
