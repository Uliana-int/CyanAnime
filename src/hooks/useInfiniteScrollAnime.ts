import { useState, useEffect, useCallback} from "react";
import type { Anime } from "../types/index";
import { shuffleArray } from "../utils/shuffleArray";

interface JikanResponse {
  data: Anime[];
  pagination: {
    has_next_page: boolean;
  };
}

const ITEMS_PER_PAGE = 20;

export const useInfiniteScrollAnime = () => {
  const [displayedAnime, setDisplayedAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const fetchAnime = useCallback(
    async (pageNum: number, query: string | null) => {
      try {
        setLoading(true);
        let url;
        if (query) {
          url = `http://localhost:5000/api/jikan/v4/anime?q=${encodeURIComponent(
            query
          )}&page=${pageNum}&limit=${ITEMS_PER_PAGE}`;
        } else {
          url = `http://localhost:5000/api/jikan/v4/anime?order_by=score&sort=desc&page=${pageNum}&limit=${ITEMS_PER_PAGE}`;
        }

        console.log(`Fetching from proxy: ${url}`)

        const res = await fetch(url);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data: JikanResponse = await res.json();

        if (!query) {
          const shuffled = shuffleArray(data.data);
          return { ...data, data: shuffled };
        }
        return data;
      } catch (err) {
        console.error("Failed to fetch anime:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    

    const nextPage = page + 1;
    try {
      const data = await fetchAnime(nextPage, searchQuery);
      setDisplayedAnime((prev) => [...prev, ...data.data]);
      setHasMore(data.pagination.has_next_page);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to load more anime:", err);
    }
  }, [fetchAnime, loading, hasMore, page, searchQuery]);

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setPage(1);
      setLoading(true);

      try {
        const data = await fetchAnime(1, query);
        setDisplayedAnime(data.data);
        setHasMore(data.pagination.has_next_page);
      } catch (err) {
        console.error("Search failed:", err);
        setDisplayedAnime([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [fetchAnime]
  );

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await fetchAnime(1, null);
        setDisplayedAnime(data.data);
        setHasMore(data.pagination.has_next_page);
      } catch (err) {
        console.error("Failed to load initial data:", err);
        setDisplayedAnime([]);
        setHasMore(false);
      }
    };

    loadInitialData();
  }, [fetchAnime]);

  return {
    displayedAnime,
    loading,
    hasMore,
    loadMore,
    handleSearch,
    setSearchQuery,
  };
};
