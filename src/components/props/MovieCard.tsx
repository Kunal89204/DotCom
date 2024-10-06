import { Card, CardBody, Image, CardFooter, Box, Flex, Text, VStack, Heading } from "@chakra-ui/react"
import { LuTv } from "react-icons/lu";
import { MovieTypes } from "../../types/TVShowTypes";

const MovieCard = ({ title, poster_path }: MovieTypes) => {
  return (
    <Card padding={0} margin={0} borderRadius={0} width={"12%"} _hover={{ cursor: 'pointer' }} overflow={'visible'}>

      {/* Adding group prop to CardBody for group hover effects */}
      <CardBody position={'relative'} padding={0} margin={0} _hover={{ cursor: 'pointer' }} role="group" overflow={'visible'}>
        {/* Box opacity changes when CardBody (group) is hovered */}
        <Box
          position={'absolute'}
          left={'50%'}
          bottom={'50%'}
          zIndex={100}
          backdropFilter='auto' backdropBlur='8px'
          width={'0'}
          height={'0'}
          transform={'scale(0)'}
          overflow={'hidden'}
         
          scale={'0px'} 
          _groupHover={{ width: '300px', height: '250px',   backgroundSize: 'cover',   backgroundPosition: 'center',transform: 'scale(1)'}} 
          
          transition={'0.35s'}
        >
          
          <VStack spacing={3} alignItems={'start'} h={'100%'} justify={'center'} padding={4} color="black">
 
            <Heading size="md" color="red.400">Avatar: The Way of Water</Heading>

            <Flex w="100%" justifyContent="space-between" alignItems="center" fontSize="sm">
              <Text fontWeight="bold" color="gray.300">HD</Text>
              <Text fontWeight="bold" color="yellow.300">IMDB 7.7</Text>
              <Text fontWeight="bold" color="gray.300">2022</Text>
              <Text fontWeight="bold" color="gray.300">192min</Text>
            </Flex>


            <Text fontSize="sm" noOfLines={3} color={'white'} >
              Set more than a decade after the events of the first film, “Avatar: The Way of Water” begins to tell the story of the Sully family...
            </Text>


            <Box mt={4}>
              <a href="/Avatar-The-Way-of-Water.html">
                <Box
                  as="button"
                  bg="red.400"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="md"
                  _hover={{ bg: 'red.600' }}
                >
                  Watch Now
                </Box>
              </a>
            </Box>
          </VStack>

        </Box>

        <Image
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          fallbackSrc={`https://image.tmdb.org/t/p/342/${poster_path}`} // Placeholder in case the image doesn't load
          alt={"Movie Image"} // Dynamically use movie name
          w="100%" // Ensure the image takes full width
          h="auto"
        />
      </CardBody>

      <CardFooter padding={0} margin={0} bg={'black'} color={'white'}>
        <Flex justifyContent={'space-between'} py={2} width={'100%'}>
          <Box>
            <LuTv />
            <Text color={'red'} noOfLines={1}>{title}</Text>
          </Box>
          <Text>2019</Text>
        </Flex>
      </CardFooter>
    </Card>
  )
}

export default MovieCard;
