import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import MovieCard from "./props/MovieCard";

import { useEffect, useState } from "react";
import { MovieTypes } from "../types/TVShowTypes";
import fetchData from "../api/fetchData";



const PopularMovies = () => {

  // Defining the states
  const [popularMovies, setPopulatMovies] = useState<MovieTypes[]>([])


  // Function to fetch movies data
  const fetchPopularMovies = async () => {
    try {
      const response = await fetchData.fetchPopularMovies()
      setPopulatMovies(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPopularMovies()
  }, [])
  return (
    <Box bg={"black"} color={"white"}>
      <Box textAlign={"center"} paddingY={"80px"}>
        <Text color={"gray.400"}>ONLINE STREAMING</Text>
        <Heading as={"h2"} fontWeight={'semibold'} fontSize={'45px'}>Popular Movies</Heading>
      </Box>



      <Flex wrap="wrap" gap={12} justify="center" px={20}>
        {popularMovies && popularMovies.slice(0, 12).map((mov) => (
          <MovieCard
            key={mov.id}
            title={mov.title}
            poster_path={mov.poster_path}
          // Use `basis` or `width` to control the width of each card
          // Approximately 6 cards per row (100% / 6)
          />
        ))}
      </Flex>

      <Box py={20} textAlign={'center'} width={'100%'}><Button bg={'red'} border={'1px'} borderColor={'transparent'} color={'white'} borderRadius={0} px={14} py={8} fontSize={'large'} _hover={{ bg: 'black', color: 'white', fontWeight: 'semibold', borderColor: 'red' }}>Explore All</Button></Box>


    </Box>
  );
};

export default PopularMovies;
