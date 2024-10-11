import {
  Box,
  Text,
  Heading,
  Image,
  Flex,
  keyframes,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchData from "../api/fetchData";
import { MovieTypes } from "../types/TVShowTypes";
import Cast from "../components/props/Cast";
import Gallery from "../components/props/Gallery";


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
      const response: any = await fetchData.fetchMovie(Number(movieid));
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
            minHeight="100vh"
            height={"max-content"}
            width="100vw"
            position="relative"
            bgImage={`url(https://image.tmdb.org/t/p/w780/${movieDetails.backdrop_path})`}
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
              <Flex
                direction={{ base: "column", lg: "row" }} // Responsive: column on mobile, row on large screens
                width="100%"
                p={{ base: 5, lg: 10 }}
                gap={10} // Add gap for spacing
              >
                {/* Movie Poster */}
                <Box width={{ base: "100%", lg: "40%" }} textAlign="center">
                  <Image
                    src={`https://image.tmdb.org/t/p/w780/${movieDetails.poster_path}`}
                    m="auto"
                    width={{ base: "80%", lg: "60%" }}
                    borderRadius={20}
                    boxShadow="lg" // Add shadow to make the poster pop
                  />
                </Box>

                {/* Movie Details */}
                <Box width={{ base: "100%", lg: "60%" }} p={5}>
                  <Heading
                    size="3xl"
                    mb={4}
                    bgGradient="linear(to-r, red.500, blue.700, purple.500)" // Gradient from red to yellow
                    bgClip="text" // Makes the gradient apply to the text
                    fontWeight="extrabold" // Makes the text bold
                  >
                    {movieDetails.title}
                  </Heading>

                  <Text
                    fontSize="lg"
                    fontStyle="italic"
                    color="gray.300"
                    mb={4}
                  >
                    {movieDetails?.tagline}
                  </Text>

                  {/* Genres */}
                  <Flex wrap="wrap" gap={2} mb={4}>
                    {movieDetails?.genres.map((genre) => (
                      <Badge
                        key={genre.id}
                        colorScheme="red"
                        px={3}
                        py={1}
                        borderRadius="md"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </Flex>

                  {/* Overview */}
                  <Text fontSize="md" lineHeight="tall" mb={4}>
                    {movieDetails?.overview}
                  </Text>

                  {/* Runtime and Release Date */}
                  <Flex gap={4} mb={4}>
                    <Box>
                      <Text fontWeight="bold">Runtime:</Text>
                      <Text>{movieDetails?.runtime} minutes</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Release Date:</Text>
                      <Text>{new Date(movieDetails?.release_date).toLocaleDateString()}</Text>
                    </Box>
                  </Flex>

                  {/* Popularity and Vote */}
                  <Flex gap={4} mb={4}>
                    <Box>
                      <Text fontWeight="bold">Popularity:</Text>
                      <Text>{movieDetails?.popularity}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Rating:</Text>
                      <Text>{movieDetails?.vote_average} / 10</Text>
                    </Box>
                  </Flex>

                  {/* Watch Now Button */}
                  <Flex mt={6}>
                    <Link to={`/movie/play/${movieDetails?.id}`}>
                      <Box
                        as="button"
                        bg="rgba(0,0,0, 0.2)"
                        border={"1px solid red"}
                        color="red"
                        px={8}
                        py={4}
                        fontWeight="semibold"
                        fontSize={"larger"}
                        transition={"all"}
                        transitionDuration={"0.35s"}
                        _hover={{ color: "white", bg: "red" }}
                        boxShadow="md"
                      >
                        Watch Now
                      </Box>
                    </Link>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>

          {/* Cast Component */}
          {/* <Cast movieId={movieDetails?.id} /> */}

          {/* Media gallery */}
          <Gallery movieId={movieDetails?.id}  />
        </>
      )}
    </Box>
  );
};

export default Movie;
