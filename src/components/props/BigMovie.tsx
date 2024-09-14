import { Box, Image, Heading, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FaPlay } from "react-icons/fa";

const BigMovie: React.FC = () => {
    return (
        <Box position="relative" className="custom-shadow-inset-black">
            {/* Movie Image */}
            <Image
                src="https://image.tmdb.org/t/p/original//xEt2GSz9z5rSVpIHMiGdtf0czyf.jpg"
                fallbackSrc="https://image.tmdb.org/t/p/w342//xEt2GSz9z5rSVpIHMiGdtf0czyf.jpg"
                alt="Movie"
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
                paddingBottom={10}
                paddingTop={10}
            >

                <Heading as="h2" fontWeight={'thin'} fontSize={'x-large'}>Movie name</Heading>
                <Flex alignItems={'center'} gap={2}>
                    <FaPlay />
                    <Flex  >
                        <Text fontWeight={'thin'} fontSize={'small'}>4 Seasons</Text>-
                        <Text fontWeight={'thin'} fontSize={'small'}>2015</Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default BigMovie;
