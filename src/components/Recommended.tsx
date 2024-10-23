import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import fetchData from "../api/fetchData";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  name:string;
  first_air_date: string;
}

const Recommended: React.FC<{ movieId: number|any; showType: "movie" | "tv" }> = ({
  movieId,
  showType,
}) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchMovieRecommendations = async () => {
    try {
      const response: any = await fetchData.fetchMovieRecommendation(
        movieId,
        showType
      );
      if (response && response.results) {
        setRecommendedMovies(response.results); 
      
      } else {
        console.log("No results found in response:", response);
      }
    } catch (error) {
      console.log("Error fetching recommendations:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  useEffect(() => {
    fetchMovieRecommendations();
  }, [movieId]);

  return (
    <Box py={8} px={4} bg={"black"}>
      <Heading as="h2" size="xl" mb={6} color="red.500">
        Recommended Movies
      </Heading>

      {loading ? (
        // Show spinner while loading
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
        </Box>
      ) : recommendedMovies.length > 0 ? (
        <SimpleGrid columns={[2, 3, 8]} spacing={6}>
          { recommendedMovies && recommendedMovies.map((movie) => (
            <Link key={movie.id} to={`/${showType}/${movie.id}`}>
              <Box
                borderRadius="md"
                overflow="hidden"
                boxShadow="md"
                position="relative"
                _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  objectFit="cover"
                  width="100%"
                  height="auto"
                  borderRadius="md"
                />
                <Box
                  position="absolute"
                  bottom={2}
                  left={2}
                  bg="rgba(0, 0, 0, 0.6)"
                  color="white"
                  fontSize="xs"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {showType === 'movie'?movie.title:movie.name} ({new Date( showType === 'movie'?movie.release_date:movie.first_air_date).getFullYear()})
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      ) : (
        <Text color="gray.500" textAlign="center" mt={4}>
          No recommended movies available.
        </Text>
      )}
    </Box>
  );
};

export default Recommended;
