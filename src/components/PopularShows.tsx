import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import fetchData from "../api/fetchData";
import { TVShow } from "../types/TVShowTypes";
import "swiper/css";
import BigMovie from "./props/BigMovie";
import { Link } from "react-router-dom";



const PopularShows: React.FC = () => {
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);

  // Fetch the popular TV shows from API
  const fetchPopularTVShows = async () => {
    try {
      const response = await fetchData.fetchPopularTVShows();
      setPopularTVShows(response); // Set the fetched TV shows to state
    } catch (error) {
      console.log("Error fetching popular TV shows", error);
    }
  };

  useEffect(() => {
    fetchPopularTVShows();
    console.log(popularTVShows) 
  }, []);

  return (
    <Box p={4}>
      <Box>
        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"small"}>
          ONLINE STREAMING 
        </Text>
        <Text fontSize={"xxx-large"} fontWeight={"semibold"}>
          Watch Popular Shows
        </Text>
      </Box>

      <Box>
        <Swiper slidesPerView={5} spaceBetween={30} className="mySwiper">
          {popularTVShows.map((show) => (
            <SwiperSlide key={show.id}>
              <Link to={`/tv/${show.id}`}><BigMovie name={show.name} poster_path={show.poster_path} /></Link>{" "}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default PopularShows;
