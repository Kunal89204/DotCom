import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Image,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import fetchData from "../../api/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface GalleryProps {
  movieId: number;
}

const Gallery: React.FC<GalleryProps> = ({ movieId }) => {
  const [gallery, setGallery] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [cast, setCast] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  //   Fallback url
  const fallbackImage: string =
    "https://thumbs.dreamstime.com/b/generic-person-gray-photo-placeholder-man-silhouette-white-background-144511705.jpg";

  // Fetch all the data with Promise.all
  const fetchDataAll = async () => {
    try {
      const [imagesResponse, videosResponse, creditsResponse]: [any, any, any] =
        await Promise.all([
          fetchData.fetchMovieMedia(movieId, "images"),
          fetchData.fetchMovieMedia(movieId, "videos"),
          fetchData.fetchMovieCredits(movieId),
        ]);
      setGallery(imagesResponse);
      setVideos(videosResponse.results);
      setCast(creditsResponse.cast);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch movie data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchDataAll();
  }, [movieId]);

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box
      bg="black"
      color="white"
      p={5}
      border="1px solid"
      borderColor="gray.900"
    >
      <Tabs variant="solid-rounded" colorScheme="red">
        <TabList>
          <Tab>Images</Tab>
          <Tab>Videos</Tab>
          <Tab>Cast</Tab>
        </TabList>

        <TabPanels>
          {/* Images Tab */}
          <TabPanel>
            {gallery && gallery.backdrops && gallery.backdrops.length > 0 ? (
              <VStack spacing={4}>
                {gallery.backdrops.map((image: any, index: number) => (
                  <Image
                    key={index}
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    alt={`Movie Image ${index}`}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.900"
                  />
                ))}
              </VStack>
            ) : (
              <Text color="gray.500">No images available.</Text>
            )}
          </TabPanel>

          {/* Videos Tab */}
          <TabPanel>
            {videos && videos.length > 0 ? (
              <Box>
                <Swiper spaceBetween={5} slidesPerView={4}>
                  {videos.map((video: any, index: number) => (
                    <SwiperSlide key={index}>
                      <Box>
                        <iframe
                          width={"100%"}
                          className="aspect-video rounded-xl"
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                        <Text color="red.500">{video.name}</Text>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            ) : (
              <Text color="gray.500">No videos available.</Text>
            )}
          </TabPanel>

          {/* Cast Tab */}
          <TabPanel>
            {cast && cast.length > 0 ? (
              <Swiper spaceBetween={20} slidesPerView={8}>
                {cast.map((member: any, index: number) => (
                  <SwiperSlide key={index}>
                    <Box
                      p={3}
                      border="1px solid"
                      borderColor="gray.900"
                      borderRadius="md"
                      textAlign="center"
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      maxWidth="150px" // Limit max width for better alignment
                    >
                      <Tooltip
                        label={member.name}
                        aria-label="Cast Name"
                        placement="top"
                      >
                        <Image
                          src={
                            member.profile_path
                              ? `https://image.tmdb.org/t/p/w342/${member.profile_path}`
                              : fallbackImage
                          }
                          alt={member.name} // Correct alt attribute to use member's name
                          objectFit="cover"
                          borderRadius="full"
                          height="100px"
                          width="100px"
                          fallbackSrc={fallbackImage}
                        />
                      </Tooltip>
                      <Text
                        fontWeight="bold"
                        color="red.500"
                        noOfLines={1} // Truncate long names
                        fontSize="sm" // Adjust font size for better fit
                      >
                        {member.name}
                      </Text>
                      <Text
                        color="gray.500"
                        noOfLines={1} // Truncate long character names
                        fontSize="sm" // Adjust font size for better fit
                      >
                        as {member.character}
                      </Text>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Text color="gray.500">No cast information available.</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Gallery;
