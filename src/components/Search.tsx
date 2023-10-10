import React from "react";
import { FaLocationDot } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

function Search() {
  return (
    <div className="search">
      <div>
        <input type="text" placeholder="Search..." />
        <FaSearch className="icon" />
        <FaLocationDot className="icon" />
      </div>
    </div>
  );
}

export default Search;
