import {
  Card,
  CardBody,
  Image,
  CardFooter,
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { LuTv } from "react-icons/lu";
import { MovieTypes } from "../../types/TVShowTypes";
import { Link } from "react-router-dom";

const MovieCard = ({
  title,
  poster_path,
  release_date,
  vote_average,
  overview,
  genres,
  runtime,
  section,
  id,
}: MovieTypes) => {
  return (
    <Popover trigger="hover" placement="auto" gutter={10}>
      <PopoverTrigger>
        <Card
          padding={0}
          marginTop={{base:5, lg:0}}
          borderRadius={0}
          width={{base:'45%', sm:"30%", lg:"12%"}}
          _hover={{ cursor: "pointer" }}
          overflow={"visible"}
        >
          {/* Card Body */}
          <CardBody padding={0} margin={0} overflow={"visible"}>
            <Link to={`/movie/${id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
                fallbackSrc={`https://image.tmdb.org/t/p/w342/${poster_path}`} // Placeholder in case the image doesn't load
                alt={"Movie Image"}
                w="100%"
                h="auto"
              />
            </Link>
          </CardBody>

          <CardFooter
            padding={0}
            margin={0}
            bg={section == "top" ? "white" : "black"}
            color={section == "top" ? "black" : "white"}
          >
            <Flex justifyContent={"space-between"} py={2} width={"100%"}>
              <Box>
                <LuTv />
                <Text color={"red"} noOfLines={1}>
                  {genres[0]?.name}
                </Text>
                <Link to={`/movie/${id}`}>
                  {" "}
                  <Text
                    color={section == "top" ? "black" : "white"}
                    noOfLines={1}
                  >
                    {title}
                  </Text>
                </Link>
              </Box>
              <Text>{release_date.toString().split("-")[0]}</Text>
            </Flex>
          </CardFooter>
        </Card>
      </PopoverTrigger>

      <PopoverContent
        _focus={{ boxShadow: "none" }}
        width="300px"
        background={"transparent"}
        backdropFilter={"auto"}
        border={0}
        backdropBlur={"80px"}
      >
        <PopoverArrow />

        <PopoverBody>
          <VStack
            spacing={3}
            alignItems={"start"}
            h={"100%"}
            justify={"center"}
            padding={4}
            color="black"
          >
            {/* Movie Title */}
            <Heading size="md" color="red.400">
              {title}
            </Heading>

            {/* Movie Details */}
            <Flex
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              fontSize="sm"
            >
              <Text fontWeight="bold" color="gray.300">
                HD
              </Text>
              <Text fontWeight="bold" color="yellow.300">
                IMDB{" "}
                {vote_average.toString().split(".")[0] +
                  "." +
                  vote_average.toString().split(".")[1]}
              </Text>
              <Text fontWeight="bold" color="gray.300">
                {release_date.toString().split("-")[0]}
              </Text>
              <Text fontWeight="bold" color="gray.300">
                {runtime}min
              </Text>
            </Flex>

            {/* Movie Description */}
            <Text fontSize="sm" noOfLines={3} color="white">
              {overview}
            </Text>

            {/* Watch Now Button */}
            <Box mt={4}>
              <Link to={`/movie/play/${id}`}>
                <Box
                  as="button"
                  bg="red.400"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="md"
                  _hover={{ bg: "red.600" }}
                >
                  Watch Now
                </Box>
              </Link>
            </Box>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MovieCard;
