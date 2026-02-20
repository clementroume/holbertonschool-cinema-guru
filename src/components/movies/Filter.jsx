import React from 'react';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';
import './movies.css';

const tagsList = [
  "action", "drama", "comedy", "biography", "romance",
  "thriller", "war", "history", "sport", "sci-fi",
  "documentary", "crime", "fantasy"
];

const Filter = ({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, genres, setGenres, title, setTitle }) => {
  const sortOptions = ["latest", "oldest", "highestrated", "lowestrated"];

  return (
      <div className="filter-container">
        <SearchBar title={title} setTitle={setTitle} />

        <div className="year-inputs">
          <Input
              label="Min Year:"
              type="number"
              value={minYear}
              setValue={setMinYear}
          />
          <Input
              label="Max Year:"
              type="number"
              value={maxYear}
              setValue={setMaxYear}
          />
        </div>

        <SelectInput
            label="Sort By:"
            options={sortOptions}
            value={sort}
            setValue={setSort}
        />

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
  );
};

export default Filter;