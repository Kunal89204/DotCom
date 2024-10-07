
import React from 'react'
import Hero from '../components/Hero'
import PopularShows from '../components/PopularShows'
import PopularMovies from '../components/PopularMovies'
import TopRated from '../components/TopRated'




const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <PopularShows />
      <PopularMovies />
      <TopRated />
    </div>
  )
}

export default Home
