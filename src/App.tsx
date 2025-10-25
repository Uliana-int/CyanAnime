import { Routes, Route } from "react-router-dom";
import AnimeCard from "./Components/AnimeCard";
import SearchAnime from "./Components/SearchAnime";
import AnimeDetail from "./Components/AnimeDetail";
import { useInfiniteScrollAnime } from "./hooks/useInfiniteScrollAnime";
import { useCallback, useRef } from "react";
import type { Anime } from "./types/index";


export default function App() {
  const { displayedAnime, loading, hasMore, loadMore, handleSearch } = useInfiniteScrollAnime();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastAnimeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );


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

                {loading && displayedAnime.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                  {displayedAnime.length > 0 ? (
                    displayedAnime.map((anime: Anime, index: number) => {
                      if (displayedAnime.length === index + 1) {
                        return <AnimeCard key={anime.mal_id} ref={lastAnimeRef} anime={anime} />;
                      } else {
                        return <AnimeCard key={anime.mal_id} anime={anime} />;
                      }
                    })
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
