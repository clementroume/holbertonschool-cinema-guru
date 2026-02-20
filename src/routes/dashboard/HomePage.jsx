import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from '../../components/movies/Filter';
import MovieCard from '../../components/movies/MovieCard';
import Button from '../../components/general/Button';
import './dashboard.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2023);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const loadMovies = (pageToLoad) => {
    const accessToken = localStorage.getItem('accessToken');

    const params = {
      minYear,
      maxYear,
      genres: genres.join(','),
      title,
      sort,
      page: pageToLoad
    };

    axios.get('/api/titles/advancedsearch', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: params
    })
    .then((response) => {
      const newMovies = response.data.titles || [];
      if (pageToLoad === 1) {
        setMovies(newMovies);
      } else {
        setMovies([...movies, ...newMovies]);
      }
    })
    .catch((error) => console.error("Error loading movies:", error));
  };

  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [minYear, maxYear, genres, sort, title]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
      <div className="home-page">
        <Filter
            minYear={minYear} setMinYear={setMinYear}
            maxYear={maxYear} setMaxYear={setMaxYear}
            sort={sort} setSort={setSort}
            genres={genres} setGenres={setGenres}
            title={title} setTitle={setTitle}
        />

        <div className="movies-container">
          <ul className="movies-list">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbId || movie.id} movie={movie} />
            ))}
          </ul>

          <Button label="Load More.." onClick={handleLoadMore} className="load-more-btn" />
        </div>
      </div>
  );
};

export default HomePage;