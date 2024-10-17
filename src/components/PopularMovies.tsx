import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import MovieCard from "./props/MovieCard"; // Importing the genre list
import { useEffect, useState } from "react";
import { MovieTypes } from "../types/TVShowTypes";
import fetchData from "../api/fetchData";
import { Link } from "react-router-dom";

const PopularMovies = () => {
  // Defining the states
  const [popularMovies, setPopularMovies] = useState<MovieTypes[]>([]);

  // Function to fetch movies data
  const fetchPopularMovies = async () => {
    try {
      const response = await fetchData.fetchPopularMovies(20);
      const movieDetailsPromises = response.results.map(async (el:MovieTypes|any) => {
        const details = await fetchData.fetchMovie(el.id)
        return details
      })

      const allMovieDetails = await Promise.all(movieDetailsPromises)
      setPopularMovies(allMovieDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <Box bg={"black"} color={"white"}>
      <Box textAlign={"center"} paddingY={"80px"}>
        <Text color={"gray.400"}>ONLINE STREAMING</Text>
        <Heading as={"h2"} fontWeight={"semibold"} fontSize={"45px"}>
          Popular Movies
        </Heading>
      </Box>

      <Flex wrap="wrap" gap={12} justify="center" px={20}>
        {popularMovies &&
          popularMovies.slice(0, 12).map((mov) => (
            <MovieCard
              key={mov.id}
              id={mov.id}
              title={mov.title}
              poster_path={mov.poster_path}
              release_date={mov.release_date}
              vote_average={mov.vote_average}
              overview={mov.overview}
              genres={mov.genres}
              runtime={mov.runtime}
              section="popular"
                          />
          ))}
      </Flex>

      <Box py={20} textAlign={"center"} width={"100%"}>
        <Link to={'/movies/popular'}>
        <Button
          bg={"red"}
          border={"1px"}
          borderColor={"transparent"}
          color={"white"}
          borderRadius={0}
          px={14}
          py={8}
          fontSize={"large"}
          _hover={{
            bg: "black",
            color: "white",
            fontWeight: "semibold",
            borderColor: "red",
          }}
        >
          Browse All Movies
        </Button></Link>
      </Box>
    </Box>
  );
};

export default PopularMovies;
