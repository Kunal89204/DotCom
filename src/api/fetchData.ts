import axios from 'axios';

interface fetchData {
    fetchMovie: (movieId: number) => Promise<void>;
    fetchMovieRecommendation: (movieId: number) => Promise<void>
}

const baseUrl: string = "https://api.themoviedb.org/3";
const apiKey: string = import.meta.env.VITE_API_KEY;

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
    }
};

export default fetchData;
