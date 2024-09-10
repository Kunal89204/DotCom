import axios from 'axios';

interface fetchData {
    fetchMovie: (movieId: number) => Promise<void>;
    fetchMovieRecommendation: (movieId: number) => Promise<void>;
    fetchPopularMovies: () => void
}

const baseUrl: string = "https://api.themoviedb.org/3";
const apiKey: string = '0d44b6cdd7b6567c07cb6c7cc6635ec0';

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
            console.error('Error fetching movie:', error);
        }
    },

    fetchMovieRecommendation: async (movieId: number) => {
        try {
            const response = await axiosInstance.get(`/movie/${movieId}/recommendations`)
            return response.data
        } catch (error) {
            console.log(error)
            return error 
        }
    },

    fetchPopularMovies: async () => {
        try {
            const response = await axiosInstance.get(`/movie/popular`)
            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    }
};

export default fetchData;
