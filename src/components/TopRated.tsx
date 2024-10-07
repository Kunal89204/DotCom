import { useEffect, useState } from "react";
import fetchData from "../api/fetchData";
import { MovieTypes } from "../types/TVShowTypes";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import MovieCard from "./props/MovieCard";

const TopRated = () => {
  const [topMovies, setTopMovies] = useState<MovieTypes[]>([]);

  const fetchTopMovies = async () => {
    try {
      const response = await fetchData.fetchTopRatedMovies();
      const topMoviesPromises = response.results.map(
        async (el: MovieTypes | any) => {
          const details = await fetchData.fetchMovie(el.id);
          return details;
        }
      );

      const allTopMovieDetails = await Promise.all(topMoviesPromises);
      setTopMovies(allTopMovieDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopMovies();
  }, []);
  return (
    <Box>
      <Flex flexWrap={"wrap"} gap={10} p={10}>
        <Box>
          <Heading as={"h2"}>Top Rated Movies to Watch Now</Heading>
        </Box>
        {topMovies &&
          topMovies
            .slice(0, 10)
            .map((mov) => (
              <MovieCard
                key={mov.id}
                title={mov.title}
                poster_path={mov.poster_path}
                release_date={mov.release_date}
                vote_average={mov.vote_average}
                overview={mov.overview}
                genres={mov.genres}
                runtime={mov.runtime}
                section="top"
              />
            ))}
      </Flex>
    </Box>
  );
};

export default TopRated;
