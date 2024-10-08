export interface TVShow {
    id?: number;
    name: string;
    poster_path: string;
    overview?: string;
    number_of_seasons:number;
    first_air_date:number
  }


  export interface MovieTypes {
    id?:number;
    title?:string;
    poster_path?:string;
    release_date:number;
    vote_average:number;
    overview:string;
    genres:Array<GenreTypes>;
    runtime:number;
    section: 'popular' | 'top'
    }

    export interface TVShowDetails {
      id?: number;
      title:string;
    }



// TVShowTypes.ts
export interface GenreTypes {
  id: number;
  name: string;
}
