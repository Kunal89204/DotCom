import React, { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import fetchData from '../api/fetchData'


import 'swiper/css'
import BigMovie from './props/BigMovie'


interface TVShow{
    id:number;
    name:string;
    poster_path: string;
    overview: string;
}

const PopularMovies: React.FC = () => {
    const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([])

    const fetchPopularTVShows:TVShow[] = async () => {
        const response = await fetchData.fetchPopularTVShows()
        console.log(response)
        setPopularTVShows(response)
    }

    useEffect(() => {
        fetchPopularTVShows()
        console.log(popularTVShows)
    }, [])
    return (
        <Box p={4}>
            <Box>
                <Text fontWeight={'semibold'} color={'gray.500'} fontSize={'small'}>ONLINE STREAMING</Text>
                <Text fontSize={'xxx-large'} fontWeight={'semibold'}>Watch Show Online</Text>
            </Box>

            <Box>
                <Swiper
                slidesPerView={4}
                spaceBetween={20}
                className="mySwiper"
                >
                    <SwiperSlide className='bg-red-500'>
                    <BigMovie />
                    </SwiperSlide>
                    
                   
                    
                </Swiper>
            </Box>
        </Box>
    )
}

export default PopularMovies
