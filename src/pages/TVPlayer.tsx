import { useParams } from "react-router-dom";
import { useState, useEffect, Key } from "react";
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
} from "@chakra-ui/react"; // Chakra UI for styling
import { TVShowDetails, Episode } from "../types/TVShowTypes";
import fetchData from "../api/fetchData";

const TVPlayer = () => {
  const { tvid, sno, epno } = useParams();
  const [showData, setShowData] = useState<TVShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [seasonNumber, setSeasonNumber] = useState<number>(2);
  const [seasonInfo, setSeasonInfo] = useState<TVShowDetails | null>(null);



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
        className="flex justify-center items-center bg-black"
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
            style={{ width: "80%", height: "80%" }}
            frameBorder="0"
            referrerPolicy="origin"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
          ></iframe>
        )}
      </div>
      <Box>
        <Tabs>
          <TabList>
            {showData?.seasons.map((season, i) => (
              <Tab
                key={i}
                onClick={() => setSeasonNumber(season.season_number)}
              >
                Season {season.season_number}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {showData?.seasons.map((_, i) => (
              <TabPanel key={i} display={"flex"} gap={"10px"}>
                {seasonInfo?.episodes.map((ep: Episode, index: number) => (
                  <Box key={index}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${ep.still_path}`}
                    />
                  </Box>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default TVPlayer;
