import { Card, CardBody, Image, CardFooter, Box, Flex, Text } from "@chakra-ui/react"
import { LuTv } from "react-icons/lu";

const MovieCard = () => {
  return (
    <Card padding={0} margin={0} borderRadius={0} overflow="hidden">
        <CardBody padding={0} margin={0}>
            <Image 
                src={`https://image.tmdb.org/t/p/original/wy4tkwuoWMGEa5Wi8dCvLVuxBzt.jpg`} 
                fallbackSrc="https://via.placeholder.com/342" // Placeholder in case the image doesn't load
                alt={"Movie Image"} // Dynamically use movie name
                w="100%" // Ensure the image takes full width
                h="auto"
            />
        </CardBody>
        <CardFooter padding={0} margin={0} bg={'black'} color={'white'}>
            <Flex justifyContent={'space-between'} py={2} width={'100%'}><Box><LuTv />
            <Text color={'red'}>Hi</Text>
            </Box>
            <Text>2019</Text>
            </Flex>
        </CardFooter >
    </Card>
  )
}

export default MovieCard

