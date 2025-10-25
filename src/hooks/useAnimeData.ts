import { useState, useEffect, useCallback } from "react";
import type { Anime } from "../types/index";
import { shuffleArray } from "../utils/shuffleArray";

interface JikanResponse {
  data: Anime[];
}

export const useAnimeData = () => {
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopAnime = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://api.jikan.moe/v4/anime");
      if (!response.ok) throw new Error("Failed to fetch top anime :(");
      const result: JikanResponse = await response.json();

      const shuffleData = shuffleArray(result.data);
      setFilteredAnime(shuffleData.slice(0, 20)); // want to take first 20
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []) 

  const handleSearch = useCallback( async (query: string) => {
    if (!query.trim()) {
      await fetchTopAnime();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Search faild :(");
      const result: JikanResponse = await response.json();
      setFilteredAnime(result.data.slice(0, 20));
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [fetchTopAnime]) 

  useEffect(() => {
    fetchTopAnime();
  }, [fetchTopAnime]);

  return {
    filteredAnime,
    loading,
    error,
    handleSearch
  }
};
