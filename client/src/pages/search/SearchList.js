import React from 'react';
import SearchListItem from './SearchListItem';
import './SearchList.css';

const SearchList = ({ result }) => {
  return (
    <div className='searchList'>
      <SearchListItem result={result} />
    </div>
  );
};

export default SearchList;
