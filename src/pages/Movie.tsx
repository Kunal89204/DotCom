import { Box, Spinner, Text, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../api/fetchData";
import { MovieTypes } from "../types/TVShowTypes";

const Movie = () => {
  const { movieid } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const fetchMovieDetails = async () => {
    try {
      const response = await fetchData.fetchMovie(Number(movieid));
      setMovieDetails(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once fetching is done
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieid]);

  return (
    <Box p={0}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" color="teal.500" /> {/* Loading spinner */}
        </Box>
      ) : !movieDetails ? (
        <Box textAlign="center" p={4}>
          <Heading as="h2" size="lg">Movie not found</Heading>
          <Text>Please check the movie ID and try again.</Text>
        </Box>
      ) : (
        <>
          <Box height={'100vh'} width={'100vw'} >
            <Image src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`} opacity={1}  />
            <Heading as="h2" size="lg" fontWeight="semibold" mb={4}>
              {movieDetails.title}
            </Heading>
            <Text fontWeight="semibold" mb={4}>
              Release Date: {movieDetails.release_date}
            </Text>
            <Text mb={4}>
              Genres:{" "}
              {movieDetails.genres.map((genre) => genre.name).join(", ")}
            </Text>
            <Text mb={4}>
              Popularity: {movieDetails.popularity}
            </Text>
            <Text mb={4}>
              Vote Average: {movieDetails.vote_average}
            </Text>
            <Text mb={4}>Overview: {movieDetails.overview}</Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Movie;
