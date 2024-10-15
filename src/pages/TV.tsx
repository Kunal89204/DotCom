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
import { TVShowDetails } from "../types/TVShowTypes";
import Cast from "../components/props/Cast";
import Gallery from "../components/props/Gallery";
import Recommended from "../components/Recommended";




// Keyframe for optional animation
const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const TV = () => {
  const { tvid } = useParams();
  const [tvDetails, setTvDetails] = useState<TVShowDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTvDetails = async () => {
    try {
      const response = await fetchData.fetchTVShowDetails(Number(tvid));
      setTvDetails(response);
      console.log(response)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    fetchTvDetails();
  }, [tvid]);

  return (
    <>
    <Box p={0}>
      {loading ? (
        // Pre-loader spinner animation
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bg="gray.900"
          position="relative"
        >
          <Box
            animation={`${rotateAnimation} 1s linear infinite`}
            width="30px"
            height="30px"
            border="3px solid white"
            borderTop="2px solid transparent"
            borderRadius="50%"
          />
        </Box>
      ) : !tvDetails ? (
        <Box textAlign="center" p={4}>
          <Heading as="h2" size="lg">
            TV Show not found
          </Heading>
          <Text>Please check the show ID and try again.</Text>
        </Box>
      ) : (
        <>
          <Box
            minHeight="100vh"
            width="100vw"
            position="relative"
            bgImage={`url(https://image.tmdb.org/t/p/w780/${tvDetails.backdrop_path})`}
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
          >
            {/* Dark overlay for better readability */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(0, 0, 0, 0.88)" // Semi-transparent black overlay
              zIndex={0}
            />

            <Box position="relative" zIndex={1} color="white">
              <Flex
                direction={{ base: "column", lg: "row" }}
                width="100%"
                p={{ base: 5, lg: 10 }}
                gap={10} // Gap for better spacing
              >
                {/* TV Poster */}
                <Box width={{ base: "100%", lg: "40%" }} textAlign="center">
                  <Image
                    src={`https://image.tmdb.org/t/p/w780/${tvDetails.poster_path}`}
                    m="auto"
                    width={{ base: "80%", lg: "60%" }}
                    borderRadius={20}
                    boxShadow="lg"
                  />
                </Box>

                {/* TV Details */}
                <Box width={{ base: "100%", lg: "60%" }} p={5}>
                  <Heading
                    size="3xl"
                    py={4}
                    bgGradient="linear(to-r, red.500, blue.700, purple.500)"
                    bgClip="text"
                    fontWeight="extrabold"
                  >
                    {tvDetails.name}
                  </Heading>

                  <Text fontSize="lg" fontStyle="italic"
                    color="gray.300" mb={4}>
                    {tvDetails.tagline}
                  </Text>

                  {/* Genres */}
                  <Flex wrap="wrap" gap={2} mb={4}>
                    {tvDetails.genres.map((genre) => (
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
                    {tvDetails.overview}
                  </Text>

                  {/* Runtime, First Air Date, Networks, Status */}
                  <Flex wrap="wrap" gap={4} mb={4}>
                    <Box>
                      <Text fontWeight="bold">Episode Runtime:</Text>
                      <Text>{tvDetails.episode_run_time[0]} minutes</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">First Air Date:</Text>
                      <Text>{tvDetails.first_air_date}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Status:</Text>
                      <Text>{tvDetails.status}</Text>
                    </Box>
                  </Flex>

                  {/* Popularity and Vote */}
                  <Flex gap={4} mb={4}>
                    <Box>
                      <Text fontWeight="bold">Popularity:</Text>
                      <Text>{tvDetails.popularity}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Rating:</Text>
                      <Text>{tvDetails.vote_average} / 10</Text>
                    </Box>
                  </Flex>

                  {/* Watch Now Button */}
                  <Flex mt={6}>
                    <Link to={`/tvplayer/${tvDetails.id}/season/1/episode/1`}>
                      <Box
                        as="button"
                        bg="rgba(0,0,0, 0.2)"
                        border="1px solid red"
                        color="red"
                        px={8}
                        py={4}
                        fontWeight="semibold"
                        fontSize="larger"
                        transition="all"
                        transitionDuration="0.35s"
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
        </>
      )}
    </Box>
    <Cast movieId={Number(tvDetails?.id)} showType="tv" />
    <Gallery movieId={Number(tvDetails?.id)} showType="tv" />
    <Recommended movieId={Number(tvDetails?.id)} showType="tv" />
    </>
  );
};

export default TV;
