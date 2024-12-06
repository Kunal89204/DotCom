import { useEffect, useState } from "react";
import fetchData from "../api/fetchData";
import { MovieTypes } from "../types/TVShowTypes";
import { Box, Flex, Heading } from "@chakra-ui/react";
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
    <Box className="pb-10">
      <Flex direction={{base:'column', lg:"row"}} flexWrap={"wrap"} gap={{base:2,sm:6, lg:12}}  px={{base:2,md:"20px", lg:20}}>
        <Box width={{base:'full', lg:'26%'}} pt={{base:10}}>
          <Heading as={"h2"} textAlign={{base:"center", lg:'start'}}>Top Rated Movies to Watch Now</Heading>
        </Box>
        <Flex flexWrap={"wrap"} justifyContent={"space-around"} gap={{base:2,sm:6, lg:16}}  >
        {topMovies &&
          topMovies
            .slice(0, 12)
            .map((mov) => (
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
                section="top"
              />
            ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopRated;
