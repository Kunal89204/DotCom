export interface TVShow {
  id?: number;
  name: string;
  poster_path: string;
  overview: string;
  number_of_seasons: number;
  first_air_date: number;
}

export interface MovieTypes {
  id: number;
  title: string;
  poster_path: string;
  release_date: number;
  vote_average: number;
  overview: string;
  genres: Array<GenreTypes>;
  runtime: number;
  section: "popular" | "top";
}

export interface TVShowDetails {
  id?: number;
  name: string;
  number_of_seasons: number;
  backdrop_path: string;
}

export interface TVEpisode {
  air_date: string; // The date the episode aired
  episode_number: number; // The episode number within the season
  id: number; // Unique identifier for the episode
  name: string; // Title of the episode
  overview: string; // Brief description of the episode
  still_path: string | null; // Path to the episode's still image (null if not available)
  vote_average: number; // Average rating of the episode
  vote_count: number; // Number of votes the episode has received
}
export interface TVSeasonDetails {
  air_date: string; // The date the season aired
  episodes: TVEpisode[]; // List of episodes in the season
  id: number; // Unique identifier for the season
  name: string; // Name of the season
  overview: string; // Overview of the season
  poster_path: string | null; // Path to the season's poster image (null if not available)
  season_number: number; // The season number
  total_episodes: number; // Total number of episodes in the season
}

// TVShowTypes.ts
export interface GenreTypes {
  id: number;
  name: string;
}
