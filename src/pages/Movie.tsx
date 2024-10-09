import { Box, Spinner, Text, Heading, Image, Flex, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../api/fetchData";
import { MovieTypes } from "../types/TVShowTypes";

// Custom keyframe for spinner animation (optional enhancement)
const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Movie = () => {
  const { movieid } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        // Pre-loader with animation
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bg="gray.900" // Dark background during loading
          position="relative"
        >
          {/* Stylish rotating Spinner */}
          <Box
            animation={`${rotateAnimation} 1s linear infinite`}
            width="30px"
            height="30px"
            border="3px solid white"
            borderTop="2px solid transparent"
            borderRadius="50%"
          />
        </Box>
      ) : !movieDetails ? (
        <Box textAlign="center" p={4}>
          <Heading as="h2" size="lg">
            Movie not found
          </Heading>
          <Text>Please check the movie ID and try again.</Text>
        </Box>
      ) : (
        <>
          <Box
            height="100vh"
            width="100vw"
            position="relative"
            bgImage={`url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`}
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
          >
            {/* Dark overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(0, 0, 0, 0.85)" // Semi-transparent black overlay
              zIndex={0}
            />

            {/* Content inside the Box */}
            <Box position="relative" zIndex={1} color="white">
              <Flex width="100%">
                <Box width="40%" height="100vh" pt={100}>
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                    m="auto"
                    width="60%"
                    borderRadius={20}
                  />
                </Box>
                <Box width="60%" p={10}>
                  <Heading>{movieDetails.title}</Heading>
                  {/* Add more content about the movie here */}
                </Box>
              </Flex>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Movie;
