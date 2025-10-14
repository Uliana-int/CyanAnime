export interface Anime {
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

export interface AnimeApiResponse {
  pagination: unknown;
  data: Anime[];
}