import {
  Heading,
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
  Text,
  Badge
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import fetchData from "../api/fetchData";
import { MovieTypes } from "../types/TVShowTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

interface showType {
  showType: 'movie'|'tv'
}

const Trending: React.FC<showType> = ({showType}) => {
  const [timeWindow, setTimeWindow] = useState<string>("day");
  const [trendingMovies, setTrendingMovies] = useState<MovieTypes[]>([]);

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetchData.fetchTrendingMovie(timeWindow, showType);
      setTrendingMovies(response.results);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, [timeWindow]);
  return (
    <Box p={10}>
     <Breadcrumb pb={10}>
  <BreadcrumbItem>
    <BreadcrumbLink onClick={() => setTimeWindow("day")}>
      <Flex alignItems="center">
        <Badge ml={2} colorScheme="red" p={2}> Today</Badge>
      </Flex>
    </BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink onClick={() => setTimeWindow("week")} >
      <Flex alignItems="center">
        <Badge ml={2} colorScheme="orange" p={2}>This Week </Badge>
      </Flex>
    </BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
      <Flex alignItems={'center'} flexDir={showType === 'movie'?'row':'row-reverse'}>
  <Box width="80%">
    <Swiper spaceBetween={20} slidesPerView={6}>
      {trendingMovies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
          <Box overflow="hidden" boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" borderRadius={'10px'} _hover={{borderRadius:'0px'}} transitionDuration={'0.35s'}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width="100%"
              height="auto"
              borderRadius={'10px'}
              _hover={{borderRadius:'0px'}}
              transitionDuration={'0.35s'}
            />
            <Box px={1} bg="white" color="black" textAlign="left" fontSize="sm">
              <Text color={'gray'} fontSize={'small'}>{movie.release_date}</Text>
              <Box fontWeight="bold" noOfLines={2}>{showType === 'movie'? movie.title:movie.name}</Box>
            </Box>
          </Box>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>

  <Box width="20%" mx={10} textAlign="center" py={5} borderRadius="md" boxShadow="lg">
    <Heading as="h2" size="lg" className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500">
      Trending {showType} Right Now
    </Heading>
  </Box>
</Flex>

    </Box>
  );
};

export default Trending;
