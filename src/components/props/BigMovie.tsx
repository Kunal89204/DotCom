import { Box, Image, Heading, Flex, Text } from '@chakra-ui/react';
import { FaPlay } from "react-icons/fa";
import { TVShow } from '../../types/TVShowTypes';
import { useState } from 'react';

const BigMovie = ({ name, poster_path }: TVShow) => {
    const [imageSrc, setImageSrc] = useState(`https://image.tmdb.org/t/p/w342${poster_path}`); // Start with low-res

    const handleImageLoad = () => {
        setImageSrc(`https://image.tmdb.org/t/p/original${poster_path}`); // Switch to high-res after low-res loads
    };

    return (
        <Box position="relative" className="custom-shadow-inset-black">
            {/* Movie Image */}
            <Image
                src={imageSrc}
                onLoad={handleImageLoad} // Load high-res after low-res
                fallbackSrc="https://via.placeholder.com/342" // Placeholder in case the image doesn't load
                alt={name || "Movie Image"} // Dynamically use movie name
                objectFit="cover"
                w="100%" // Ensure the image takes full width
                h="auto"
            />

            {/* Text Overlay with Shadow */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                width={'100%'}
                right={0}
                p={4}
                color="white"
                bgGradient="linear(to-t, black,rgba(43, 43, 42, 0.6), transparent)"
                zIndex={1}
                pb={10}
                pt={10}
            >
                <Heading as="h2" fontWeight="thin" fontSize={{ base: 'lg', md: 'x-large' }}>
                    {name}
                </Heading>
                <Flex alignItems="center" gap={2}>
                    <FaPlay />
                    <Flex>
                        <Text fontWeight="thin" fontSize="small">4 Seasons</Text>-
                        <Text fontWeight="thin" fontSize="small">2015</Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default BigMovie;
