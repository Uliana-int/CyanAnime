import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AnimeCard from "./Components/AnimeCard";
import SearchAnime from "./Components/SearchAnime";
import AnimeDetail from "./Components/AnimeDetail";
import type { Anime } from "./types/index";
import { shuffleArray } from "./utils/shuffleArray";



interface JikanResponse {
  data: Anime[];
}

export default function App() {
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopAnime = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://api.jikan.moe/v4/anime");
      if (!response.ok) throw new Error("Failg to fetch top anime :(");
      const result: JikanResponse = await response.json();
      
      const shuffleData = shuffleArray(result.data)

      setFilteredAnime(shuffleData.slice(0, 20)); // want to take first 20
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      fetchTopAnime();
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
  };

  useEffect(() => {
    fetchTopAnime();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 text-slate-800 font-sans">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="relative flex justify-center mb-12">
                <h1
                  className="text-5xl md:text-6xl font-bold text-cyan-800 z-10
                          bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent"
                >
                  CyanAnime
                </h1>
                <div className="absolute inset-x-0 top-1/2 h-6 -z-0 bg-gradient-to-b from-cyan-200/30 to-transparent rounded-full blur-xl opacity-50"></div>
              </div>
              <SearchAnime onSearch={handleSearch} />

              {error && (
                <p className="text-red-500 text-center my-4">Error: {error}</p>
              )}

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                  {filteredAnime.length > 0 ? (
                    filteredAnime.map((anime) => (
                      <AnimeCard key={anime.mal_id} anime={anime} />
                    ))
                  ) : (
                    <p className="text-xl text-center text-slate-500 col-span-full mt-10">
                      No anime found...
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        }
      />
      <Route path="/anime/:id" element={<AnimeDetail />} />{" "}
    </Routes>
  );
}
