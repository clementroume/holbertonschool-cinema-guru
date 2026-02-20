import React from 'react';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';
import './movies.css';

const tagsList = [
  "action", "adventure", "animation", "comedy", "crime",
  "documentary", "drama", "family", "fantasy", "horror",
  "mystery", "romance", "sci-fi", "sport", "thriller", "war"
];

const Filter = ({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, genres, setGenres, title, setTitle }) => {
  const sortOptions = ["latest", "oldest", "highestrated", "lowestrated"];

  return (
      <div className="filter-container">

        <div className="filter-left">
          <SearchBar
              className="dark"
              title={title}
              setTitle={setTitle}
          />

          <div className="filter-inputs">
            <Input
                className="dark"
                label="Min Date:"
                type="number"
                value={minYear}
                setValue={setMinYear}
            />
            <Input
                className="dark"
                label="Max Date:"
                type="number"
                value={maxYear}
                setValue={setMaxYear}
            />
            <SelectInput
                className="dark" /* Pour qu'il ait aussi le style sombre */
                label="Sort:"
                options={sortOptions}
                value={sort}
                setValue={setSort}
            />
          </div>
        </div>

        <div className="filter-right">
          <ul className="tags-list">
            {tagsList.map((tag) => (
                <Tag
                    key={tag}
                    genre={tag}
                    filter={true}
                    genres={genres}
                    setGenres={setGenres}
                />
            ))}
          </ul>
        </div>
      </div>
  );
};

export default Filter;