import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from '../../components/movies/Filter';
import MovieCard from '../../components/movies/MovieCard';
import Button from '../../components/general/Button';
import './dashboard.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const loadMovies = (pageToLoad) => {
    const accessToken = localStorage.getItem('accessToken');

    // On prépare les paramètres pour l'URL
    const params = {
      minYear,
      maxYear,
      genres: genres.join(','), // On transforme le tableau en chaîne pour l'URL
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
        setMovies(newMovies); // Nouvelle recherche, on remplace tout
      } else {
        setMovies([...movies, ...newMovies]); // Load more, on ajoute à la suite
      }
    })
    .catch((error) => console.error("Error loading movies:", error));
  };

  // Se déclenche à chaque fois qu'un filtre change
  useEffect(() => {
    setPage(1); // On réinitialise à la page 1 si on change de filtre
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

        <ul className="movies-list">
          {movies.map((movie) => (
              <MovieCard key={movie.imdbId || movie.id} movie={movie} />
          ))}
        </ul>

        <Button label="Load More.." onClick={handleLoadMore} className="load-more-btn" />
      </div>
  );
};

export default HomePage;