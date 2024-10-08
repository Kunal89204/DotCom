
import React from 'react'
import Hero from '../components/Hero'
import PopularShows from '../components/PopularShows'
import PopularMovies from '../components/PopularMovies'
import TopRated from '../components/TopRated'
import ShowBanner from '../components/ShowBanner'





const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <PopularShows />
      <PopularMovies />
      <TopRated />
      <ShowBanner />
    </div>
  )
}

export default Home
