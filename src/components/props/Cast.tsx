import React, { useEffect, useState } from "react";
import fetchData from "../../api/fetchData";
import { CastTypes } from "../../types/TVShowTypes";
import {
  Box,
  Image,
  Text,
  Skeleton,
  Tooltip,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

interface IdType {
  movieId: number;
}

const Cast: React.FC<IdType> = ({ movieId }) => {
  const [movieCast, setMovieCast] = useState<CastTypes[] | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchMovieCast = async () => {
    try {
      const response: any = await fetchData.fetchMovieCredits(movieId);
      setMovieCast(response.cast);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieCast();
  }, [movieId]);

  const fallbackImage = "/fallback-profile.jpg"; // A fallback image URL for when `profile_path` is null.

  return (
    <Box py={5} bg={'black'}>
      {loading ? (
        // Skeleton loading effect while data is being fetched
        <Swiper spaceBetween={30} slidesPerView={5}>
          {Array(6)
            .fill("")
            .map((_, i) => (
              <SwiperSlide key={i}>
                <Skeleton width="150px" height="250px" />
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <Swiper
          spaceBetween={40}
          slidesPerView={10} // Adjust this based on the screen size
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {movieCast && movieCast.length > 0 ? (
            movieCast.map((cast) => (
              <SwiperSlide key={cast.id}>
                  <Box
                key={cast.id}
                width="150px"
                textAlign="center"
                borderRadius="md"
                overflow="hidden"
                boxShadow="md"
                _hover={{ transform: "scale(1.05)", transition: "0.3s ease" }}
              >
                {/* Tooltip on image hover for better UX */}
                <Tooltip label={cast.name} aria-label="Cast Name">
                  <Image
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w342/${cast.profile_path}`
                        : fallbackImage
                    }
                    alt={cast.name}
                    objectFit="cover"
                    borderRadius={'50%'}
                    height={'100px'}
                    width={'100px'}
                    fallbackSrc={fallbackImage}
                  />
                </Tooltip>
                <Box p={2} bg="black">
                  <Text fontWeight="bold" fontSize="small" color={'gray.200'} noOfLines={1}>
                    {cast.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600" noOfLines={2}>
                    as {cast.character}
                  </Text>
                </Box>
              </Box>
              </SwiperSlide>
            ))
          ) : (
            <Text>No cast available</Text>
          )}
        </Swiper>
      )}
    </Box>
  );
};

export default Cast;
