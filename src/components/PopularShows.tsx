import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import fetchData from "../api/fetchData";
import { TVShow } from "../types/TVShowTypes";
import "swiper/css";
import ShowCard from "./props/ShowCard";
import { Link } from "react-router-dom";

const PopularShows: React.FC = () => {
  // Defining States
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);

  // Fetch the popular TV shows from API
  const fetchPopularTVShows = async () => {
    try {
      const response = await fetchData.fetchPopularTVShows();

      // Fetch details for each show
      const showDetailsPromises = response.map(async (el: TVShow | any) => {
        const details = await fetchData.fetchTVShowDetails(el.id);
        return details;
      });

      // Wait for all details to be fetched
      const allShowDetails = await Promise.all(showDetailsPromises);

      // Update the state with fetched show details
      setPopularTVShows(allShowDetails);

      
    } catch (error) {
      console.log("Error fetching popular TV shows", error);
    }
  };

  useEffect(() => {
    fetchPopularTVShows();
  }, []);

  return (
    <Box p={4}>
      <Box py={10}>
        <Text fontWeight={"semibold"} color={"gray.500"} >
          ONLINE STREAMING
        </Text>
        <Text fontSize={"xxx-large"} fontWeight={"semibold"}> 
          Watch Popular Shows
        </Text>
      </Box>

      <Box pb={10}>
        <Swiper slidesPerView={5} spaceBetween={30} className="mySwiper">
          {popularTVShows.map((show) => (
            <SwiperSlide key={show.id}>
              <Link to={`/tv/${show.id}`}>
                <ShowCard name={show.name} poster_path={show.poster_path} number_of_seasons={show.number_of_seasons} first_air_date={show.first_air_date} overview={show.overview} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default PopularShows;
