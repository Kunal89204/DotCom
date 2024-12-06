export interface TVShow {
  id?: number;
  name: string;
  poster_path: string;
  overview: string;
  number_of_seasons: number;
  first_air_date: string; 
}

export interface MovieTypes {
  popularity?: number;
  showType?: 'movie'|'tv';
  tagline?: string;
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: Array<GenreTypes>;
  runtime: number;
  section: "popular" | "top";
  backdrop_path?: string;
  name?:'string'
}

export interface TVShowDetails {
  seasons: any;
  id?: number;
  name: string;
  number_of_seasons: number;  
  number_of_episodes: number; 
  backdrop_path: string;      
  poster_path: string;        
  tagline?: string;           
  genres: Array<GenreTypes>;  
  overview: string;           
  runtime?: number;           
  first_air_date: string;     
  last_air_date?: string;     
  in_production?: boolean;    
  popularity?: number;       
  vote_average?: number;     
  vote_count?: number;      
  homepage?: string;         
  status?: string; 
  episode_run_time: number[];
  episodes: any         
}


export interface Episode {
  still_path: string;
  episode_number: number;
  overview: string;
  runtime: number;
  id: number;
  name: string;
 
}


export interface TVEpisode {
  air_date: string; 
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface TVSeasonDetails {
  air_date: string; 
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
  adult: boolean;
  gender: number; 
  id: number;
  known_for_department: string; 
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number; 
}
