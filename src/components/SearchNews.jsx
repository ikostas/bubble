import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, searchNews } from './newsSlice';
import Headlines from './Headlines.jsx';

export default function SearchNews() {
  const {searchQuery, searchResults, isLoading, isError} = useSelector(state => state.news);
  const dispatch = useDispatch();
  const handleSearchClick = async e => {
    e.preventDefault();
    if(searchQuery.length > 3) {
      dispatch(searchNews(searchQuery));
    } else {
      alert("The search query should be at least 4 symbols!");
    }
  }
  return(
    <>
      <h1>Search the News</h1>
      <form>
        <fieldset>
          <label htmlFor="search">Search:</label>
          <input type="text" name="search" id="search" placeholder="Search text" aria-label="Search text"
            value={searchQuery}
            onChange={e => dispatch(setSearchQuery(e.target.value))} />
          <input type="submit" value="Search" onClick={handleSearchClick}/>
        </fieldset>
      </form> 
      {isLoading ? (
        <p>Loading news...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <Headlines data={searchResults} />
      )}
    </>
  )
}
