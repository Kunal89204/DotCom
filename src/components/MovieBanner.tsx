import React, { useEffect, useState } from "react";
import { Box, Text, Button, VStack, Flex } from "@chakra-ui/react";
import { MovieTypes } from "../types/TVShowTypes";
import fetchData from "../api/fetchData";

const MovieBanner: React.FC = () => {
  const [movieDetails, setMovieDetails] = useState<MovieTypes | null>(null);

  const fetchMovieDetails = async () => {
    try {
      const response: any = await fetchData.fetchMovie(957452);
      setMovieDetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (!movieDetails) return <Text>Loading...</Text>;

  return (
    <Flex
      height="60vh"
      backgroundImage={`url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`}
      backgroundSize="cover"
      backgroundPosition="center"
      alignItems="center"
      padding={10}
      position="relative"
    >
      <VStack
        align="start"
        spacing={4}
        color="white"
        maxW="500px"
      >
        <Text fontSize="6xl" fontWeight="bold">{movieDetails.title}</Text>
        <Text fontSize="md">{movieDetails.overview}</Text>
        <Text fontWeight="bold">Release Date: {movieDetails.release_date}</Text>
        <Text fontWeight="bold">Rating: {movieDetails.vote_average} ⭐</Text>
        <Button
          colorScheme="red"
          size="lg"
          borderRadius="full"
          boxShadow="lg"
          _hover={{ bg: "red.400", transform: "scale(1.05)" }}
        >
          Watch Now
        </Button>
      </VStack>
    </Flex>
  );
};

export default MovieBanner;
