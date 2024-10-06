import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'
import MoviePlayer from './pages/MoviePlayer'
import TVPlayer from './pages/TVPlayer'
import TV from './pages/TV'
MoviePlayer


const App:React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movie' element={<Movie/>} />
        <Route path='/movieplayer/:movieid' element={<MoviePlayer/>} />
        <Route path='/tv/:tvid' element={<TV/>} />
        <Route path='/tvplayer/:tvid/season/:sno/episode/:epno' element={<TVPlayer/>} />
      </Routes>
    </Router>
  )
}

export default App
