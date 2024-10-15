import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import MoviePlayer from './pages/MoviePlayer';
import TVPlayer from './pages/TVPlayer';
import TV from './pages/TV';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // No rendering required
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop /> {/* Integrated ScrollToTop component directly */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieid' element={<Movie />} />
        <Route path='/movie/play/:movieid' element={<MoviePlayer />} />
        <Route path='/tv/:tvid' element={<TV />} />
        <Route path='/tvplayer/:tvid/season/:sno/episode/:epno' element={<TVPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
