import React, { useEffect } from 'react'
import fetchData from './api/fetchData'

interface fetchMovieTypes{
  fetchMovie:() => Promise<void>;
  fetchMovieRecommendation:() => Promise<void>
}


const App:React.FC<fetchMovieTypes> = () => {
  const fetchMovie = async () => {
    const response = await fetchData.fetchMovie(19995)
    console.log(response)
  }
 
  const fetchMovieRecommendation = async () => {
    try {
      const response = await fetchData.fetchMovieRecommendation(19995)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovie()
    fetchMovieRecommendation()
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default App
