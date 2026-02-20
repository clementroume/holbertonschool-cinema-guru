import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './general.css';

const SearchBar = ({ title, setTitle, className }) => {
  const handleInput = (event) => {
    setTitle(event.target.value);
  };

  return (
      <div className={`search-bar-wrapper ${className || ''}`}>
        <FontAwesomeIcon icon={faSearch} />
        <input
            type="text"
            className="search-bar"
            value={title}
            onChange={handleInput}
            placeholder="Search Movies"
        />
      </div>
  );
};

export default SearchBar;