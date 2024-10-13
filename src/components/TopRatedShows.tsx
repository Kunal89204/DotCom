import { Box, Flex, Text, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TVShowDetails } from "../types/TVShowTypes";
import fetchData from "../api/fetchData";
import { Link } from "react-router-dom";

const TopRatedShows: React.FC = () => {
  const [topRatedShows, setTopRatedShows] = useState<TVShowDetails[]>([]);
  const [bgUrl, setBgUrl] = useState("");
  const fetchTopRatedShows = async () => {
    try {
      const response = await fetchData.fetchPopularTVShows();
      setTopRatedShows(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchTopRatedShows();
  }, []);
  return (
    <Box bg={"black"} color={"white"} p={10}>
      <Flex wrap={"wrap"} gap={3}>
        <Box
          width="30%"
          border="1px solid"
          p={6}
          borderRadius="md"
          position="relative"
          backgroundImage={`https://image.tmdb.org/t/p/w500${bgUrl}`}
          backgroundSize="cover"
          backgroundPosition="center"
          color="white"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.6)"
            zIndex={1}
            borderRadius="md"
          />
          <Box position="relative" zIndex={2} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">
              Watch Popular Shows
            </Text>
            <Text mt={2} fontSize="lg">
              Explore the best shows trending right now!
            </Text>
          </Box>
        </Box>

        {topRatedShows &&
          topRatedShows.slice(0, 10).map((show, i) => (
            <Box p={0} width={"15%"}>
              <Link to={`/tv/${show.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show?.backdrop_path}`}
                  alt={show.name}
                />
                <Text color={"red"} fontSize={'sm'}>{show.name}</Text>
              </Link>
            </Box>
          ))}
      </Flex>
    </Box>
  );
};

export default TopRatedShows;
