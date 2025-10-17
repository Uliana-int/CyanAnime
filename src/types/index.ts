interface Image {
  image_url?: string;
  small_image_url?: string;
  large_image_url?: string;
}

interface Images {
  jpg?: Image;
  webp?: Image;
}

interface Aired {
  from?: string; 
  to?: string;  
  
}

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: Images; 
  approved: boolean;
  titles: Array<{ type: string; title: string }>; 
  title: string;
  title_english?: string | null;
  title_japanese?: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes?: number | null; 
  status: string;
  airing: boolean;
  aired: Aired; 
  duration?: string;
  rating?: string;
  score?: number | null;
  scored_by?: number | null;
  rank?: number | null; 
  popularity?: number | null;
  members: number;
  favorites: number;
  synopsis?: string | null; 
  background?: string | null; 
  season?: string | null;
  year?: number | null; 
  broadcast?: any; 
  producers: Producer[]; 
  licensors: any[]; 
  studios: Studio[]; 
  genres: Genre[]; 
  explicit_genres?: any[]; 
  themes?: any[]; 
  demographics?: any[]; 
}