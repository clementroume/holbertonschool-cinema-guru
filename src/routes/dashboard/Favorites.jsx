import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard';
import './dashboard.css';

const Favorites = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios.get('/api/titles/favorite/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => {
      setMovies(response.data);
    })
    .catch((error) => console.error("Error fetching favorites:", error));
  }, []);

  return (
      <div className="favorites-page">
        <h1>Movies you like</h1>
        <ul className="movies-list">
          {movies.map((movie) => (
              <MovieCard key={movie.imdbId || movie.id} movie={movie} />
          ))}
        </ul>
      </div>
  );
};

export default Favorites;