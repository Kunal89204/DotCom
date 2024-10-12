
import React from 'react'
import Hero from '../components/Hero'
import PopularShows from '../components/PopularShows'
import PopularMovies from '../components/PopularMovies'
import TopRated from '../components/TopRated'
import ShowBanner from '../components/ShowBanner'
import Trending from '../components/Trending'
import MovieBanner from '../components/MovieBanner'
import TopRatedShows from '../components/TopRatedShows'








const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <PopularShows />
      <PopularMovies />
      <TopRated />
      <ShowBanner />
      <Trending showType='movie'  />
      <MovieBanner />
      <Trending showType='tv'  />
      <TopRatedShows />
      
    </div> 
  )
}

export default Home
