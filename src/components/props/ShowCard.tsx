import { Box, Image, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { FaPlay } from "react-icons/fa";
import { TVShow } from '../../types/TVShowTypes';
import { useState } from 'react';

const ShowCard = ({ name, poster_path, number_of_seasons, first_air_date, overview }: TVShow) => {
    const [imageSrc, setImageSrc] = useState(`https://image.tmdb.org/t/p/w342${poster_path}`); // Start with low-res

    const handleImageLoad = () => {
        setImageSrc(`https://image.tmdb.org/t/p/w780${poster_path}`); // Switch to high-res after low-res loads
    };

    return (
        <Box position="relative" className="custom-shadow-inset-black" role='group' overflow={'hidden'}  >
            {/* Movie Image */}
            <Image
                src={imageSrc}
                onLoad={handleImageLoad} // Load high-res after low-res
                fallbackSrc={`https://image.tmdb.org/t/p/w342${poster_path}`} // Placeholder in case the image doesn't load
                alt={name || "Movie Image"} // Dynamically use movie name
                objectFit="cover"
                w="100%" // Ensure the image takes full width
                h="auto"
            />

            {/* Hover box */}
            <Box
                color={'white'}
                position={'absolute'}
                height={'100%'}
                width={"100%"}
                transform={'translateX(100%)'}
                transition={'0.45s'}
                zIndex={100}
                top={0}
                right={0}
                backdropFilter={'auto'}
                backdropBlur={'20px'}
                _groupHover={{ transform:'translateX(0)' }} // On hover, expand to full size
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bgGradient="linear(to-t, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.6), transparent)"
                textAlign="center"
                overflow={'hidden'}
            >
                {/* Title */}
                <Heading as="h2" fontWeight="bold" fontSize="xl" mb={4} noOfLines={1}>
                    {name}
                </Heading>

                {/* Seasons and Release Year */}
                <Flex alignItems="center" gap={2} mb={4}>
                    <FaPlay />
                    <Text fontWeight="light" fontSize="sm">{number_of_seasons} Seasons</Text>
                    <Text fontWeight="light" fontSize="sm"> - {first_air_date.toString().split("-")[0]}</Text>
                </Flex>

                {/* Description */}
                <Text fontSize="sm" mb={6} px={4} noOfLines={4}>
                    {overview || "No description available."}
                </Text>

                {/* Watch Now Button */}
                <Button
                    bg="red.500"
                    color="white"
                    _hover={{ bg: 'red.700' }}
                    leftIcon={<FaPlay />}
                    fontSize="sm"
                    borderRadius={0}
                >
                    Watch Now
                </Button>
            </Box>

            {/* Text Overlay with Shadow */}
            <Box
                position="absolute"
                bottom={-5}
                left={0}
                width={'100%'}
                right={0}
                p={4}
                color="white"
                bgGradient="linear(to-t, black,rgba(43, 43, 42, 0.65), transparent)"
                zIndex={1}
                pb={10}
                pt={10}
            >
                <Heading as="h2" fontWeight="thin" fontSize={{ base: 'lg', md: 'x-large' }} noOfLines={1}>
                    {name}
                </Heading>
                <Flex alignItems="center" gap={2}>
                    <FaPlay />
                    <Flex>
                        <Text fontWeight="thin" fontSize="small">{number_of_seasons} Seasons</Text>-
                        <Text fontWeight="thin" fontSize="small">{first_air_date.toString().split("-")[0]}</Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default ShowCard;
