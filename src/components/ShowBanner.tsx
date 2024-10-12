import {
  Box,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
} from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import fetchData from "../api/fetchData";
import { TVShowDetails, TVSeasonDetails } from "../types/TVShowTypes"; // Ensure you have a proper type for season details
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowBanner = () => {
  const [tvDetails, setTvDetails] = useState<TVShowDetails | null>(null);
  const [tvSeasonDetails, setTVSeasonDetails] = useState<TVSeasonDetails[]>([]);

  // Fetch TV Show Details
  const fetchTVShowDetails = async (id: number) => {
    try {
      const response = await fetchData.fetchTVShowDetails(id);
      setTvDetails(response);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    }
  };

  // Fetch all season details
  const fetchAllSeasonDetails = async () => {
    if (!tvDetails?.number_of_seasons || !tvDetails.id) return;

    const allSeasonDetails = await Promise.all(
      Array.from({ length: tvDetails.number_of_seasons }, async (_, index) => {
        try {
          const seasonNumber = index + 1;
          const response = await fetchData.fetchTVSeasonDetails(
            tvDetails!.id!,
            seasonNumber
          );
          return response;
        } catch (error) {
          console.error(
            `Error fetching details for season ${index + 1}:`,
            error
          );
          return null; // Return null for error cases
        }
      })
    );

    setTVSeasonDetails(allSeasonDetails);
  };

  useEffect(() => {
    fetchTVShowDetails(60574); // Call the fetch function with the TV show ID
  }, []);

  useEffect(() => {
    if (tvDetails) {
      fetchAllSeasonDetails(); // Fetch all seasons after tvDetails are fetched
    }
  }, [tvDetails]);

  if (!tvDetails) {
    return <div>Loading...</div>; // Render a loading state while fetching data
  }

  return (
    <Box
      width={"100%"}
      height={"85vh"}
      bgImage={`url( https://image.tmdb.org/t/p/original${tvDetails?.backdrop_path})`}
      // backgroundPosition="center"
      backgroundSize={"cover"}
      backgroundRepeat="no-repeat"
    >
      <Heading
        textAlign={"center"}
        fontSize={"xxx-large"}
        py={20}
        color={"white"}
        as={"h2"}
      >
        {tvDetails.name}
      </Heading>
      <Text textAlign={"center"} fontSize={"larger"} color={"white"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dicta
        quia earum{" "}
      </Text>

      {tvDetails && (
        <Tabs border={"none"} pt={100} variant="enclosed">
          <TabList color={"white"} border={"none"} justifyContent={"center"}>
            {Array.from({ length: tvDetails.number_of_seasons }, (_, index) => (
              <Tab key={index} fontSize={"larger"}>
                Season {index + 1}
              </Tab>
            ))}
          </TabList>

          <TabPanels justifyContent={"center"} display={"flex"}>
            {tvSeasonDetails.map((season, index) => (
              <TabPanel
                key={index}
                width={"80%"}
                transition="all 0.5s ease-in-out"
                opacity={season ? 1 : 0}
              >
                {season && season.episodes ? (
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={5}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      640: { slidesPerView: 2 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 5 },
                    }}
                  >
                    {season.episodes.map(
                      (episode: any, episodeIndex: number) => (
                        <SwiperSlide key={episodeIndex}>
                          <Link to={``}>
                            <Box
                              borderRadius="md"
                              overflow="visible" // Change overflow to visible
                              transition="transform 0.3s" // Add transition for smooth effect
                              _hover={{ transform: "scale(1.1)" }} // Scale the Box on hover
                            >
                              <Image
                                src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
                                alt={episode.name}
                                width="100%"
                                height="auto"
                                maxHeight={"150px"}
                                objectFit="cover" // Ensure images cover the area without distortion
                              />
                              <Text color="white" fontSize="large" py={2}>
                                {episode.name}
                              </Text>
                            </Box>
                          </Link>
                        </SwiperSlide>
                      )
                    )}
                  </Swiper>
                ) : (
                  <Text color="white">
                    No episodes available for this season
                  </Text>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};

export default ShowBanner;
