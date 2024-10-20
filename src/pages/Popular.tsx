import { Box, Spinner, Text, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import fetchData from "../api/fetchData";
import MovieCard from "../components/props/MovieCard";
import ShowCard from "../components/props/ShowCard";

interface MediaType {
  media: "tv" | "movie";
}

const Popular: React.FC<MediaType> = ({ media }) => {
  const [popular, setPopular] = useState<any[]>([]); // Store all movies
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(true); // To check if more pages are available

  // Fetch Popular Movies with Detailed Info
  const fetchPopular = async () => {
    if (loading) return; // Prevent multiple calls at once
    setLoading(true);

    try {
      // First, fetch popular movies for the current page
      let response;
      if (media === "movie") {
        response = await fetchData.fetchPopularMovies(page);
      } else {
        response = await fetchData.fetchPopularTVShows(page);
      }

      // Now, fetch detailed information for each movie using their IDs
      const movieDetailsPromises = response.results.map(async (movie: any) => {
        let details;
        if (media === "movie") {
          details = await fetchData.fetchMovie(movie.id);
          console.log(movie.id);
        } else {
          details = await fetchData.fetchTVShowDetails(movie.id);
        } // Fetch movie details for each movie
        return details;
      });

      // Wait for all movie details to be fetched
      const allMovieDetails = await Promise.all(movieDetailsPromises);

      // Append the detailed movie data to the previous state
      setPopular((prevMovies) => [...prevMovies, ...allMovieDetails]);

      // Update whether there are more pages to fetch
      setHasMore(response.page < response.total_pages);

      // Increment the page for the next fetch
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // Infinite Scroll Handler
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 500 &&
      hasMore &&
      !loading
    ) {
      fetchPopular(); // Fetch the next page when user is near bottom
    }
  };

  useEffect(() => {
    fetchPopular(); // Initial data fetch
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup scroll event listener
  }, [hasMore, loading]);

  return (
    <Box bg={"black"}>
      <Heading as={"h1"} className="bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-orange-700 " fontSize={"xxx-large"} p={10}>
        WatchPopular {media === 'movie'?'Movies':'TV Shows'}
      </Heading>

      <Flex wrap="wrap" gap={8} justify="center" px={10} width={"100vw"} minH={'100vh'}>
        {popular.length > 0 ? (
          popular.map((mov, i) =>
            media === "movie" ? (
              <MovieCard
                key={i}
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
            ) : (
              <ShowCard
                key={i}
                first_air_date={mov.first_air_date}
                name={mov.name}
                number_of_seasons={mov.number_of_seasons}
                overview={mov.overview}
                poster_path={mov.poster_path}
                id={mov.id}
              />
            )
          )
        ) : (
          <Text>No popular movies found.</Text>
        )}

        {loading && (
          <Box textAlign="center" mt={4}>
            <Spinner size="xl" color="white" />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Popular;
