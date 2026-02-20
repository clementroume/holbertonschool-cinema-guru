import React from 'react';
import './general.css';

const SearchBar = ({ title, setTitle }) => {
  const handleInput = (event) => {
    setTitle(event.target.value);
  };

  return (
    <input
      type="text"
      className="search-bar"
      value={title}
      onChange={handleInput}
    />
  );
};

export default SearchBar;