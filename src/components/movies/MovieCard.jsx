import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import './movies.css';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };

    axios.get('/api/titles/favorite/', config)
    .then((response) => {
      if (Array.isArray(response.data)) {
        const exists = response.data.some((favMovie) => favMovie.imdbId === movie.imdbId);
        setIsFavorite(exists);
      }
    })
    .catch((error) => console.error("Error fetching favorites:", error));

    axios.get('/api/titles/watchLater/', config)
    .then((response) => {
      if (Array.isArray(response.data)) {
        const exists = response.data.some((wlMovie) => wlMovie.imdbId === movie.imdbId);
        setIsWatchLater(exists);
      }
    })
    .catch((error) => console.error("Error fetching watch later:", error));
  }, [movie.imdbId]);

  const handleClick = (type) => {
    const accessToken = localStorage.getItem('accessToken');
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };

    const isAdded = type === 'favorite' ? isFavorite : isWatchLater;
    const endpoint = type === 'favorite' ? 'favorite' : 'watchlater';
    const url = `/api/titles/${endpoint}/${movie.imdbId}`;

    if (isAdded) {
      axios.delete(url, config)
      .then(() => {
        if (type === 'favorite') setIsFavorite(false);
        if (type === 'watchlater') setIsWatchLater(false);

        window.dispatchEvent(new Event('activityUpdated'));
      })
      .catch((error) => console.error(`Error removing from ${type}:`, error));
    } else {
      axios.post(url, {}, config)
      .then(() => {
        if (type === 'favorite') setIsFavorite(true);
        if (type === 'watchlater') setIsWatchLater(true);

        window.dispatchEvent(new Event('activityUpdated'));
      })
      .catch((error) => console.error(`Error adding to ${type}:`, error));
    }
  };

  const posterUrl = movie.imageurls && movie.imageurls.length > 0
      ? movie.imageurls[0]
      : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
      <li className="movie-card">
        <div className="movie-poster-container">
          <img src={posterUrl} alt={movie.title} className="movie-poster" />

          <div className="movie-icons">
            <span onClick={() => handleClick('watchlater')} style={{cursor: 'pointer'}}>
              <FontAwesomeIcon icon={faClock} className={isWatchLater ? 'active' : ''} />
            </span>
            <span onClick={() => handleClick('favorite')} style={{cursor: 'pointer'}}>
              <FontAwesomeIcon icon={faStar} className={isFavorite ? 'active' : ''} />
            </span>
          </div>

          <div className="movie-title-overlay">
            <h3>{movie.title}</h3>
          </div>
        </div>

        <div className="movie-info">
          <p className="movie-synopsis">{movie.synopsis}</p>
          <ul className="movie-card-tags">
            {movie.genres?.map((genre, index) => (
                <li key={index} className="card-tag">{genre}</li>
            ))}
          </ul>
        </div>
      </li>
  );
};

export default MovieCard;