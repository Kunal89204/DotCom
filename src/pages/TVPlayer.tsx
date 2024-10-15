import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Spinner,
  Center,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react"; // Chakra UI for styling
import { TVShowDetails, Episode } from "../types/TVShowTypes";
import fetchData from "../api/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TVPlayer = () => {
  const { tvid, sno, epno } = useParams();
  const [showData, setShowData] = useState<TVShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [seasonNumber, setSeasonNumber] = useState<number>(1);
  const [seasonInfo, setSeasonInfo] = useState<TVShowDetails | null>(null);

  const videoUrl = `https://multiembed.mov/?video_id=${tvid}&tmdb=1&s=${sno}&e=${epno}`;


  const fetchTVShowDetails = async () => {
    try {
      const response = await fetchData.fetchTVShowDetails(Number(tvid));
      setShowData(response);
    
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const fetchTVSeasonDetails = async () => {
    try {
      const response = await fetchData.fetchTVSeasonDetails(
        Number(tvid),
        seasonNumber
      );
      setSeasonInfo(response);
      console.log(seasonNumber)
      
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchTVShowDetails();
  }, [tvid]);

  useEffect(() => {
    fetchTVSeasonDetails();
  }, [seasonNumber]);

  useEffect(() => {
    if (!tvid || !sno || !epno) {
      setError(true); // Handle invalid params
    }
  }, [tvid, sno, epno]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  if (error) {
    return (
      <Center height="100vh">Invalid TV Show or Episode Information.</Center>
    );
  }

  return (
    <>
      <div
        style={{ height: "100vh", width: "100vw", position: "relative" }}
        className="flex justify-center items-center bg-black "
      >
        {loading && (
          <Center
            height="100vh"
            width="100vw"
            bg="gray.900"
            position={"absolute"}
          >
            <Spinner size="lg" color="white" />
          </Center>
        )}
        {!error && (
          <iframe
            src={videoUrl}
            className="rounded-xl"
            style={{ width: "80%", height: "80%", boxShadow:"10px 10px 10px 10px white" }}
            frameBorder="0"
            referrerPolicy="origin"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
            
          ></iframe>
        )}
      </div>
      <Box className="bg-black text-white">
        <Tabs>
          <TabList borderBottom={0}>
            {showData?.seasons
              .filter((season: any) => season.season_number !== 0) // Filter out season 0
              .map((season: any, i: number) => (
                <Tab
                  key={i}
                  onClick={() => setSeasonNumber(season.season_number)}
                  border={"1px solid"}
                  m={2}
                  borderRadius={20}
                >
                  Season {season.season_number}
                </Tab>
              ))}
          </TabList>

          <TabPanels>
            {showData?.seasons.map((_: any, i: number) => (
              <TabPanel key={i} display={"flex"} gap={"10px"}>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={5} // Adjust this based on the screen size
                >
                  {seasonInfo?.episodes.map((ep: Episode, index: number) => (
  <SwiperSlide key={index}>
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="md"
      boxShadow="md"
      _hover={{
        transform: "scale(1.05)",
        transition: "0.3s",
      }}
    >
      {/* Conditionally render the image, use a placeholder if not available */}
      {ep.still_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w342${ep.still_path}`}
          alt={`Episode ${ep.episode_number}`}
          borderRadius={10}
          objectFit="cover"
          width="100%"
          height="auto"
        />
      ) : (
        <Box
          width="100%"
          height="165px"
          backgroundColor="gray.700"
          borderRadius={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="white" fontSize="sm">
            No Image Available
          </Text>
        </Box>
      )}

      <Box
        position="absolute"
        top={2}
        left={2}
        bg="purple.600"
        color="white"
        fontSize="xs"
        px={2}
        py={1}
        borderRadius="full"
        boxShadow="sm"
      >
        Ep {ep.episode_number}
      </Box>
    </Box>

    <Flex
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      color="gray.300"
      px={2}
    >
      <Box>
        {/* Use a default text if episode name is not available */}
        <Text fontSize="md" fontWeight="bold" color="white" noOfLines={1}>
          {ep.name ? ep.name : "Untitled Episode"}
        </Text>

        {/* Render a fallback text if episode overview is missing */}
        <Text fontSize="sm" color="gray.400" noOfLines={2}>
          {ep.overview
            ? ep.overview.substring(0, 50) + "..."
            : "No description available"}
        </Text>
      </Box>

      {/* Conditionally render runtime if it exists */}
      {ep.runtime ? (
        <Text fontSize="sm" color="gray.500">
          {ep.runtime} min
        </Text>
      ) : (
        <Text fontSize="sm" color="gray.500">
          N/A
        </Text>
      )}
    </Flex>
  </SwiperSlide>
))}

                </Swiper>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default TVPlayer;
