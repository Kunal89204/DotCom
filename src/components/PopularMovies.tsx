import { Box, Heading, Text } from "@chakra-ui/react";
import MovieCard from "./props/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'


const PopularMovies = () => {
  return (
    <Box bg={"black"} color={"white"}>
      <Box textAlign={"center"} paddingY={"40px"}>
        <Text color={"gray.400"}>ONLINE STREAMING</Text>
        <Heading as={"h2"} fontWeight={'semibold'} fontSize={'45px'}>Popular Movies</Heading>
      </Box>

      <Box padding={'20px'}>
     <Swiper
      spaceBetween={50}
      slidesPerView={6}
     >
        <SwiperSlide> <MovieCard /></SwiperSlide>
        <SwiperSlide> <MovieCard /></SwiperSlide>
        <SwiperSlide> <MovieCard /></SwiperSlide>
     </Swiper>
      </Box>
    </Box>
  );
};

export default PopularMovies;
