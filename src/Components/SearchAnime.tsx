import { useState } from 'react';

interface SearchAnimeProps {
  onSearch: (query: string) => void;
}

export default function SearchAnime({ onSearch }: SearchAnimeProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-10">
      <div className='relative'>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Let's search anime!"
        className={`
            w-full p-4 pl-6 pr-12 rounded-full border border-slate-300
            bg-white text-slate-700
            transition-all duration-300 ease-in-out
            ${isFocused ? 'shadow-lg scale-[1.02]' : 'shadow-md'}
            focus:outline-none
            `}      />

            
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        aria-label='Search'
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
      </button>
      </div>
    </form>
  );
}