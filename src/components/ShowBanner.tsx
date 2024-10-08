import {
  Box,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image
} from "@chakra-ui/react";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import fetchData from "../api/fetchData";
import { TVShowDetails } from "../types/TVShowTypes"; 
import { useEffect, useState } from "react";

const ShowBanner = () => {
    const [tvDetails, setTvDetails] = useState<TVShowDetails | null>(null);

    const fetchTVShowDetails = async (id: number) => {
        try {
            const response = await fetchData.fetchTVShowDetails(id);
            setTvDetails(response);
        } catch (error) {
            console.log("Error fetching TV show details:", error);
        }
    };

    useEffect(() => {
        fetchTVShowDetails(60574); // Call the fetch function with the TV show ID
    }, []); // Empty dependency array to run only once on component mount

    if (!tvDetails) {
        return <div>Loading...</div>; // Render a loading state while fetching data
    }



  return (
    <Box
      width={"100%"}
      height={"100vh"}
      bgImage={`url( https://image.tmdb.org/t/p/original/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg)`}
      backgroundPosition="center"
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
        Peaky Blinders
      </Heading>
      <Text textAlign={"center"} fontSize={"larger"} color={"white"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dicta
        quia earum{" "}
      </Text>

      <Tabs border={"none"} pt={200}>
        <TabList color={"white"} border={"none"} justifyContent={"center"}>
          <Tab fontSize={"larger"}>Season 1</Tab>
          <Tab fontSize={"larger"}>Season 2</Tab>
          <Tab fontSize={"larger"}>Season 3</Tab>
          <Tab fontSize={"larger"}>Season 4</Tab>
          <Tab fontSize={"larger"}>Season 5</Tab>
          <Tab fontSize={"larger"}>Season 6</Tab>
        </TabList>

        <TabPanels  justifyContent={'center'} display={'flex'}>
          <TabPanel width={'80%'} >
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              
              
            >
              <SwiperSlide>
                <Box>
                    <Image src="https://image.tmdb.org/t/p/original/jh4Pc02TycNPcYyISkgthpxUmlM.jpg" />
                </Box>
              </SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
             
            </Swiper>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ShowBanner;
