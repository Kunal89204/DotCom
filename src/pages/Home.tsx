
import React from 'react'
import Hero from '../components/Hero'
import PopularShows from '../components/PopularShows'
import PopularMovies from '../components/PopularMovies'




const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <PopularShows />
      <PopularMovies />
      
    </div>
  )
}

export default Home
