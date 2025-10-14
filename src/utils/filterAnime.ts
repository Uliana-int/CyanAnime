import type {Anime} from '../types/'

export function filterAnime(animeList: Anime[], query: string): Anime[] {
  if (!query.trim()) {
    return animeList;
  }

  const lowerQuery = query.toLowerCase();
  return animeList.filter((anime) =>
    anime.title.toLowerCase().includes(lowerQuery) ||
    anime.title_english?.toLowerCase().includes(lowerQuery) ||
    anime.title_japanese?.toLowerCase().includes(lowerQuery)
  );
}