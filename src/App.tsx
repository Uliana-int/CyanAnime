import { useState, useEffect } from 'react';
import AnimeCard from './Components/AnimeCard';
import SearchAnime from './Components/SearchAnime';
import allAnimeData from './data/all-anime.json';

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
  title_english?: string;
  title_japanese?: string;
}

interface AnimeApiResponse {
  pagination: unknown;
  data: Anime[];
}

const typedAllAnimeData = allAnimeData as AnimeApiResponse;

export default function App() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setAnimeList(typedAllAnimeData.data);
      return;
    }

    const filtered = typedAllAnimeData.data.filter((anime) =>
      anime.title.toLowerCase().includes(query.toLowerCase()) ||
      (anime.title_english?.toLowerCase().includes(query.toLowerCase())) ||
      (anime.title_japanese?.toLowerCase().includes(query.toLowerCase()))
    );
    setAnimeList(filtered);
  };

  useEffect(() => {
    setAnimeList(typedAllAnimeData.data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center my-6">Bleach Anime Collection</h1>
      <SearchAnime onSearch={handleSearch} />
      <div className="flex flex-col items-center">
        {animeList.length > 0 ? (
          animeList.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              title={anime.title}
              imageUrl={anime.images.jpg.image_url}
              synopsis={anime.synopsis}
            />
          ))
        ) : (
          <p className="text-xl mt-10">No anime found...</p>
        )}
      </div>
    </div>
  );
}
