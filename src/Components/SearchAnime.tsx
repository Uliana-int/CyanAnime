import { useState } from 'react';

interface SearchAnimeProps {
  onSearch: (query: string) => void;
}

export default function SearchAnime({ onSearch }: SearchAnimeProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-2 m-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anime..."
        className="bg-blue-50 rounded-2xl w-full max-w-2xl p-3 text-black"
      />
      <button
        type="submit"
        className="bg-yellow-600 rounded-2xl p-3 font-bold whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}