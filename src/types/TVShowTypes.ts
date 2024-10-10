export interface TVShow {
  id?: number;
  name: string;
  poster_path: string;
  overview: string;
  number_of_seasons: number;
  first_air_date: string; // Dates should typically be strings
}

export interface MovieTypes {
  popularity: number;
  tagline: string;
  id: number;
  title: string;
  poster_path: string;
  release_date: string; // Dates should typically be strings
  vote_average: number;
  overview: string;
  genres: Array<GenreTypes>;
  runtime: number;
  section: "popular" | "top";
  backdrop_path: string;
}

export interface TVShowDetails {
  id?: number;
  name: string;
  number_of_seasons: number;
  backdrop_path: string;
}

export interface TVEpisode {
  air_date: string; // The date the episode aired (as string)
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface TVSeasonDetails {
  air_date: string; // String for consistency with dates
  episodes: TVEpisode[];
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  total_episodes: number;
}

// TVShowTypes.ts
export interface GenreTypes {
  id: number;
  name: string;
}

export interface CastTypes {
  adult: boolean; // true or false (adult content or not)
  gender: number; // typically 1 (female), 2 (male), or 0 (unknown)
  id: number;
  known_for_department: string; // e.g., "Acting"
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; // path to the cast member's profile image or null
  cast_id: number;
  character: string;
  credit_id: string;
  order: number; // order of appearance in the credits
}
