import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard';
import './dashboard.css';

const WatchLater = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios.get('/api/titles/watchlater/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => {
      setMovies(response.data);
    })
    .catch((error) => console.error("Error fetching watch later:", error));
  }, []);

  return (
      <div className="watch-later-page">
        <h1>Movies to watch later</h1>
        <ul className="movies-list">
          {movies.map((movie) => (
              <MovieCard key={movie.imdbId || movie.id} movie={movie} />
          ))}
        </ul>
      </div>
  );
};

export default WatchLater;