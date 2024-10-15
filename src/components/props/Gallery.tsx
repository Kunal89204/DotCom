import { Box, Heading, Text, AspectRatio, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Import the API key from your configuration
import { apiKey } from '../../api/fetchData';

interface GalleryProps {
  movieId: number;
  showType: 'movie' | 'tv'; 
}

const Gallery: React.FC<GalleryProps> = ({ movieId, showType }) => {
  const [images, setImages] = useState<string[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      // Fetching images and trailer
      const imageResponse = await axios.get(
        `https://api.themoviedb.org/3/${showType}/${movieId}/images?api_key=${apiKey}`
      );
      const videoResponse = await axios.get(
        `https://api.themoviedb.org/3/${showType}/${movieId}/videos?api_key=${apiKey}`
      );

      setImages(imageResponse.data.backdrops.map((img: any) => img.file_path));

      const trailerData = videoResponse.data.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      setTrailer(trailerData ? `https://www.youtube.com/embed/${trailerData.key}` : null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [movieId]);

  return (
    <Box bg={'black'} color={'white'} py={8} px={4}>
      <Heading as="h2" size="xl" mb={6} color="red.500" >
        Gallery
      </Heading>

      <Swiper spaceBetween={10} slidesPerView={5}>
        {/* First Slide: Trailer (if available) */}
        {trailer && (
          <SwiperSlide>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={trailer}
                title="Movie Trailer"
                allowFullScreen
                style={{ borderRadius: '10px' }}
              />
            </AspectRatio>
            <Text mt={2} color="gray.300" textAlign="center">
              Official Trailer
            </Text>
          </SwiperSlide>
        )}

        {/* Other Slides: Images */}
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`https://image.tmdb.org/t/p/original${image}`}
              alt={`Movie Image ${index + 1}`}
              borderRadius="10px"
              objectFit="cover"
              width="100%"
              height="auto"
            />
          </SwiperSlide>
        ))}

        {/* If no images or trailer */}
        {(!trailer && images.length === 0) && (
          <Text color="gray.500" textAlign="center" mt={4}>
            No media available.
          </Text>
        )}
      </Swiper>
    </Box>
  );
};

export default Gallery;
