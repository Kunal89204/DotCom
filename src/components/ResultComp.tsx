
import { Box, Image, Text, VStack, Badge} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ResultComp = (results: {results: {poster_path: string, title: string, overview: string, id: number, genre_ids: number[], media_type?: string, name?: string, release_date?: string, first_air_date?: string, vote_average?: number}}) => {
  const { poster_path, title, name, overview, id, media_type, release_date, first_air_date, vote_average } = results.results;
  
  // Use title for movies or name for TV shows
  const displayTitle = title || name;
  const displayDate = release_date || first_air_date;
  const linkPath = media_type === 'tv' ? `/tv/${id}` : `/movie/${id}`;

  return (
    <Link to={linkPath}>
      <Box
        bg="white"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-5px)",
          boxShadow: "xl"
        }}
        cursor="pointer"
        maxW="300px"
        m={2}
      >
        <Box position="relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={displayTitle}
            width="100%"
            height="400px"
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/300x400?text=No+Image"
          />
          {vote_average && (
            <Badge
              position="absolute"
              top={2}
              right={2}
              colorScheme={vote_average >= 7 ? "green" : vote_average >= 5 ? "yellow" : "red"}
              borderRadius="full"
              px={2}
              py={1}
            >
              {vote_average.toFixed(1)} ⭐
            </Badge>
          )}
          {media_type && (
            <Badge
              position="absolute"
              top={2}
              left={2}
              colorScheme="blue"
              borderRadius="md"
              px={2}
              py={1}
              textTransform="uppercase"
              fontSize="xs"
            >
              {media_type}
            </Badge>
          )}
        </Box>
        
        <VStack align="start" p={4} spacing={2}>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.800"
            noOfLines={2}
            lineHeight="1.2"
          >
            {displayTitle}
          </Text>
          
          {displayDate && (
            <Text fontSize="sm" color="gray.600">
              {new Date(displayDate).getFullYear()}
            </Text>
          )}
          
          <Text
            fontSize="sm"
            color="gray.700"
            noOfLines={3}
            lineHeight="1.4"
          >
            {overview}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default ResultComp;
