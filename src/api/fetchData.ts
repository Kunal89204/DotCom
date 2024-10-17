import axios from "axios";

type DiscoverMoviesParams = {
    [key: string]: any; // Allows any property with any value
  };
  

interface fetchData {
  fetchMovie: (movieId: number) => Promise<void>;
  fetchMovieRecommendation: (
    movieId: number,
    showType: "movie" | "tv"
  ) => Promise<void>;
  fetchPopularMovies: (page: number) => Promise<any>;
  fetchPopularTVShows: (page: number) => Promise<any>;
  fetchTVShowDetails: (tvShowId: number) => Promise<any>;
  fetchTopRatedMovies: () => Promise<any>;
  fetchTopRatedShows: () => Promise<any>;
  fetchTVSeasonDetails: (tvShowId: number, tvSeasonNo: number) => Promise<any>;
  fetchTVEpisodeDetails: (
    tvShowId: number,
    tvSeasonNo: number,
    tvEpisodeNo: number
  ) => Promise<any>;
  fetchMovieMedia: (
    movieId: number,
    mediaType: "images" | "videos"
  ) => Promise<void>;
  fetchMovieCredits: (
    movieId: number,
    showType: "movie" | "tv"
  ) => Promise<void>;
  fetchTrendingMovie: (
    timeWindow: string,
    showType: "movie" | "tv"
  ) => Promise<any>;
  fetchMediaImages: () => Promise<any>;
  fetchDiscoverMovies: (params: DiscoverMoviesParams) => Promise<any>;
}

const baseUrl: string = "https://api.themoviedb.org/3";
export const apiKey: string = "0d44b6cdd7b6567c07cb6c7cc6635ec0";

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: apiKey,
    language: "en-US",
  },
});

const fetchData: fetchData = {
  fetchMovie: async (movieId: number) => {
    try {
      const response = await axiosInstance.get(`/movie/${movieId}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  },

  fetchMovieRecommendation: async (
    movieId: number,
    showType: "movie" | "tv"
  ) => {
    try {
      const response = await axiosInstance.get(
        `/${showType}/${movieId}/recommendations`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchPopularMovies: async (page = 1) => {
    try {
      const response = await axiosInstance.get(`/movie/popular`, {
        params: {
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchPopularTVShows: async (page = 1) => {
    try {
      const response = await axiosInstance.get("tv/popular", {
        params: {
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchTopRatedMovies: async () => {
    try {
      const response = await axiosInstance.get("/movie/top_rated");
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  fetchTopRatedShows: async () => {
    try {
      const response = await axiosInstance.get("/tv/top_rated");
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchTVShowDetails: async (tvShowId: number) => {
    try {
      const response = await axiosInstance.get(`/tv/${tvShowId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchTVSeasonDetails: async (tvShowId: number, tvSeasonNo: number) => {
    try {
      const response = await axiosInstance.get(
        `/tv/${tvShowId}/season/${tvSeasonNo}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchTVEpisodeDetails: async (
    tvShowId: number,
    tvSeasonNo: number,
    tvEpisodeNo: number
  ) => {
    try {
      const response = await axiosInstance.get(
        `/tv/${tvShowId}/season/${tvSeasonNo}/episode/${tvEpisodeNo}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchMovieMedia: async (movieId: number, mediaType: "images" | "videos") => {
    try {
      const response = await axiosInstance.get(
        `/movie/${movieId}/${mediaType}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchMovieCredits: async (movieId: number, showType: "movie" | "tv") => {
    try {
      const response = await axiosInstance.get(
        `/${showType}/${movieId}/credits`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchTrendingMovie: async (timeWindow: string, showType: "movie" | "tv") => {
    try {
      const response = await axiosInstance.get(
        `/trending/${showType}/${timeWindow}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchMediaImages: async () => {
    try {
      const response = await axiosInstance.get(`/movie/19995/images`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchDiscoverMovies: async (params = {}) => {
    try {
        const response = await axiosInstance.get('/discover/movie', {
            params: {
                ...params, // Spread operator to include all parameters
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

};

export default fetchData;
